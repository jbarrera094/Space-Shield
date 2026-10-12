import { createHmac, timingSafeEqual } from "crypto";
import { paddleLicensesRepo } from "../../../helpers/api/paddle-licenses-repo";

const PLAN_BY_PRICE_ID = {
  // Sandbox
  pri_01m1a2d28bp2fbdfagae2fzwba: "basic",
  pri_01m1a2marwbhapxkp6bv6hptzd: "professional",
  pri_01m1a2q6zq5vg0cr4e8znb3c49: "corporate",

  // Live
  pri_01m4r14yghc3c23rcnbdgq6ren: "basic",
  pri_01m4r1dgkgh1hm9nqt6avzjg5h: "professional",
  pri_01m4r1meq3y0ynf7b6yr501z52: "corporate",
};

export const config = {
  api: {
    bodyParser: false,
  },
};

function verifyPaddleSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) {
    return false;
  }

  const parts = signatureHeader.split(";");

  let timestamp = null;
  const signatures = [];

  for (const part of parts) {
    const [key, value] = part.trim().split("=");

    if (key === "ts") {
      timestamp = value;
    }

    if (key === "h1") {
      signatures.push(value);
    }
  }

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const timestampNumber = Number(timestamp);

  if (!Number.isFinite(timestampNumber)) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  if (Math.abs(currentTime - timestampNumber) > 5) {
    return false;
  }

  const signedPayload = `${timestamp}:${rawBody}`;

  const expectedSignature = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  return signatures.some((signature) => {
    if (!/^[0-9a-f]{64}$/i.test(signature)) {
      return false;
    }

    const receivedBuffer = Buffer.from(signature, "hex");

    if (receivedBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(receivedBuffer, expectedBuffer);
  });
}

function getPlanFromSubscription(subscription) {
  if (!Array.isArray(subscription?.items)) {
    return null;
  }

  // Actualmente LPS CAD espera exactamente un producto por suscripción.
  if (subscription.items.length !== 1) {
    return null;
  }

  const item = subscription.items[0];
  const priceId = item?.price?.id;

  if (!priceId) {
    return null;
  }

  // Paddle quantity debe permanecer en 1.
  if (Number(item.quantity) !== 1) {
    return null;
  }

  return PLAN_BY_PRICE_ID[priceId] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const rawBody = Buffer.concat(chunks).toString("utf8");

    const signatureHeader = Array.isArray(
      req.headers["paddle-signature"]
    )
      ? req.headers["paddle-signature"][0]
      : req.headers["paddle-signature"];

    const webhookSecrets = [
  process.env.PADDLE_WEBHOOK_SECRET,
  process.env.PADDLE_WEBHOOK_SECRET_LIVE,
].filter(Boolean);

if (webhookSecrets.length === 0) {
  console.error("No Paddle webhook secrets are configured");

  return res.status(500).json({
    received: false,
  });
}

const isValid = webhookSecrets.some((secret) =>
  verifyPaddleSignature(
    rawBody,
    signatureHeader,
    secret
  )
);

    if (!isValid) {
      console.error("Invalid Paddle webhook signature");

      return res.status(401).json({
        received: false,
      });
    }

    const event = JSON.parse(rawBody);

    console.log(
      "Verified Paddle webhook received:",
      event.event_type,
      event.data?.id
    );

    // Por ahora solo subscription.created crea licencias.
    if (event.event_type !== "subscription.created") {
      return res.status(200).json({
        received: true,
        processed: false,
      });
    }

    const subscription = event.data;
    const subscriptionId = subscription?.id;
    const customData = subscription?.custom_data || {};

    const empresa =
      typeof customData.empresa === "string"
        ? customData.empresa.trim()
        : "";

    const prefijo =
      typeof customData.prefijo === "string"
        ? customData.prefijo.trim().toUpperCase()
        : "";

    // El plan se determina por el Price ID real enviado por Paddle.
    // No confiamos en custom_data.plan para decidir cuántas licencias crear.
    const plan = getPlanFromSubscription(subscription);

    if (
      !subscriptionId?.startsWith("sub_") ||
      !empresa ||
      !/^[A-Z]{3}$/.test(prefijo) ||
      !plan
    ) {
      console.error(
        "Subscription ignored because required provisioning data is invalid:",
        subscriptionId
      );

      return res.status(200).json({
        received: true,
        processed: false,
        reason: "invalid_provisioning_data",
      });
    }

    // Si custom_data.plan existe pero no coincide con el Price ID,
    // lo registramos, pero manda siempre el Price ID de Paddle.
    if (
      typeof customData.plan === "string" &&
      customData.plan.trim().toLowerCase() !== plan
    ) {
      console.warn(
        "Paddle custom_data plan does not match price ID:",
        subscriptionId
      );
    }

    const result =
      await paddleLicensesRepo.createSubscriptionLicenses({
        subscriptionId,
        empresa,
        prefijo,
        plan,
      });

    if (result.created) {
      console.log(
        "LPS CAD licenses created:",
        subscriptionId,
        "plan:",
        plan,
        "licenses:",
        result.licenseCount,
        "id_pack:",
        result.idPack
      );
    } else {
      console.log(
        "Subscription already processed:",
        subscriptionId
      );
    }

    return res.status(200).json({
      received: true,
      processed: result.created,
      reason: result.reason || null,
    });
  } catch (error) {
    console.error("Paddle webhook error:", error);

    // Un error de servidor/base de datos debe devolver 500
    // para que Paddle pueda volver a intentar la entrega.
    return res.status(500).json({
      received: false,
    });
  }
}