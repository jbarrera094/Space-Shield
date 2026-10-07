import { createHmac, timingSafeEqual } from "crypto";

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
    const [key, value] = part.split("=");

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

  // Evita aceptar eventos antiguos o reutilizados.
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

    const secret = process.env.PADDLE_WEBHOOK_SECRET;

    if (!secret) {
      console.error("PADDLE_WEBHOOK_SECRET is not configured");

      return res.status(500).json({
        received: false,
      });
    }

    const isValid = verifyPaddleSignature(
      rawBody,
      signatureHeader,
      secret
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

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("Paddle webhook error:", error);

    return res.status(400).json({
      received: false,
    });
  }
}