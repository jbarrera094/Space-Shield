import { timingSafeEqual } from "crypto";

const PRICE_IDS = {
  basic: "pri_01m1a2d28bp2fbdfagae2fzwba",
  professional: "pri_01m1a2marwbhapxkp6bv6hptzd",
  corporate: "pri_01m1a2q6zq5vg0cr4e8znb3c49",
};

function isValidAdminToken(req) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return false;
  }

  const receivedToken = authorization.substring(7);
  const expectedToken = process.env.PADDLE_ADMIN_TOKEN;

  if (!expectedToken) {
    return false;
  }

  const receivedBuffer = Buffer.from(receivedToken);
  const expectedBuffer = Buffer.from(expectedToken);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  if (!process.env.PADDLE_API_KEY || !process.env.PADDLE_ADMIN_TOKEN) {
    console.error("Paddle server configuration is incomplete");

    return res.status(500).json({
      error: "Server configuration error",
    });
  }

  if (!isValidAdminToken(req)) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const { empresa, prefijo, plan } = req.body || {};

    const normalizedEmpresa =
      typeof empresa === "string" ? empresa.trim() : "";

    const normalizedPrefijo =
      typeof prefijo === "string"
        ? prefijo.trim().toUpperCase()
        : "";

    const normalizedPlan =
      typeof plan === "string"
        ? plan.trim().toLowerCase()
        : "";

    if (!normalizedEmpresa) {
      return res.status(400).json({
        error: "Empresa is required",
      });
    }

    if (normalizedEmpresa.length > 150) {
      return res.status(400).json({
        error: "Empresa is too long",
      });
    }

    if (!/^[A-Z]{3}$/.test(normalizedPrefijo)) {
      return res.status(400).json({
        error: "Prefijo must contain exactly 3 letters",
      });
    }

    const priceId = PRICE_IDS[normalizedPlan];

    if (!priceId) {
      return res.status(400).json({
        error: "Invalid plan",
      });
    }

    const paddleResponse = await fetch(
      "https://sandbox-api.paddle.com/transactions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
          "Content-Type": "application/json",
          "Paddle-Version": "1",
        },
        body: JSON.stringify({
          items: [
            {
              price_id: priceId,
              quantity: 1,
            },
          ],
          collection_mode: "automatic",
          custom_data: {
            empresa: normalizedEmpresa,
            prefijo: normalizedPrefijo,
            plan: normalizedPlan,
          },
        }),
      }
    );

    const paddleData = await paddleResponse.json();

    if (!paddleResponse.ok) {
      console.error("Paddle create transaction error:", paddleData);

      return res.status(paddleResponse.status).json({
        error: "Unable to create Paddle transaction",
      });
    }

    return res.status(201).json({
      transactionId: paddleData.data.id,
      checkoutUrl: paddleData.data.checkout?.url || null,
      empresa: normalizedEmpresa,
      prefijo: normalizedPrefijo,
      plan: normalizedPlan,
    });
  } catch (error) {
    console.error("Create Paddle transaction error:", error);

    return res.status(500).json({
      error: "Unable to create transaction",
    });
  }
}