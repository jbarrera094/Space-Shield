import { timingSafeEqual } from "crypto";

const PRICE_IDS = {
  basic: "pri_01m1a2d28bp2fbdfagae2fzwba",
  professional: "pri_01m1a2marwbhapxkp6bv6hptzd",
  corporate: "pri_01m1a2q6zq5vg0cr4e8znb3c49",
};

function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

function isValidAdminToken(req) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return false;
  }

  const receivedToken = authorization.substring(7);
  const expectedToken = process.env.PADDLE_ADMIN_TOKEN;

  return safeCompare(receivedToken, expectedToken);
}

function isValidBasicAuth(req) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = Buffer.from(
      authorization.substring(6),
      "base64"
    ).toString("utf8");

    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const username = decoded.substring(0, separatorIndex);
    const password = decoded.substring(separatorIndex + 1);

    return (
      safeCompare(username, process.env.LPS_ADMIN_USER) &&
      safeCompare(password, process.env.LPS_ADMIN_PASSWORD)
    );
  } catch {
    return false;
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderPage({
  empresa = "",
  prefijo = "",
  plan = "basic",
  checkoutUrl = "",
  transactionId = "",
  error = "",
} = {}) {
  const safeEmpresa = escapeHtml(empresa);
  const safePrefijo = escapeHtml(prefijo);
  const safeCheckoutUrl = escapeHtml(checkoutUrl);
  const safeTransactionId = escapeHtml(transactionId);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>LPS CAD</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      color: #1f2937;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .card {
      width: 100%;
      max-width: 560px;
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }

    h1 {
      margin-top: 0;
      margin-bottom: 6px;
      font-size: 26px;
    }

    .subtitle {
      margin-top: 0;
      margin-bottom: 28px;
      color: #6b7280;
      font-size: 14px;
    }

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 7px;
    }

    input,
    select {
      width: 100%;
      padding: 11px 12px;
      border: 1px solid #d1d5db;
      border-radius: 7px;
      font-size: 15px;
      margin-bottom: 20px;
    }

    button {
      width: 100%;
      border: 0;
      border-radius: 7px;
      padding: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      background: #111827;
      color: white;
    }

    .result {
      margin-top: 28px;
      padding: 18px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
    }

    .error {
      margin-bottom: 20px;
      padding: 14px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #991b1b;
    }

    .checkout-link {
      display: block;
      margin-top: 10px;
      word-break: break-all;
    }

    .transaction {
      margin-top: 12px;
      color: #6b7280;
      font-size: 12px;
      word-break: break-all;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>LPS CAD</h1>

    <p class="subtitle">
      Generate a private Paddle checkout link
    </p>

    ${
      error
        ? `<div class="error">${escapeHtml(error)}</div>`
        : ""
    }

    <form method="POST">
      <label for="empresa">Empresa</label>

      <input
        id="empresa"
        name="empresa"
        type="text"
        maxlength="150"
        value="${safeEmpresa}"
        required
      />

      <label for="prefijo">Prefijo</label>

      <input
        id="prefijo"
        name="prefijo"
        type="text"
        maxlength="3"
        minlength="3"
        pattern="[A-Za-z]{3}"
        value="${safePrefijo}"
        placeholder="ABC"
        required
        oninput="this.value = this.value.toUpperCase()"
      />

      <label for="plan">Plan</label>

      <select id="plan" name="plan">
        <option
          value="basic"
          ${plan === "basic" ? "selected" : ""}
        >
          Basic
        </option>

        <option
          value="professional"
          ${plan === "professional" ? "selected" : ""}
        >
          Professional
        </option>

        <option
          value="corporate"
          ${plan === "corporate" ? "selected" : ""}
        >
          Corporate
        </option>
      </select>

      <button type="submit">
        Generar enlace
      </button>
    </form>

${
  checkoutUrl
    ? `
      <div class="result">
        <strong>Checkout creado correctamente</strong>

        <a
          class="checkout-link"
          href="${safeCheckoutUrl}"
          target="_blank"
          rel="noopener noreferrer"
          id="checkout-link"
        >
          ${safeCheckoutUrl}
        </a>

        <button
          type="button"
          id="copy-button"
          style="margin-top: 16px;"
        >
          Copiar enlace
        </button>

        <div
          id="copy-status"
          style="
            margin-top: 8px;
            font-size: 13px;
            color: #166534;
            display: none;
          "
        >
          Enlace copiado
        </div>

        <div class="transaction">
          Transaction: ${safeTransactionId}
        </div>
      </div>
    `
    : ""
}
  </div>
  <script>
  const copyButton = document.getElementById("copy-button");
  const checkoutLink = document.getElementById("checkout-link");
  const copyStatus = document.getElementById("copy-status");

  if (copyButton && checkoutLink) {
    copyButton.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(checkoutLink.href);

        copyButton.textContent = "Copiado ✓";

        if (copyStatus) {
          copyStatus.style.display = "block";
        }

        setTimeout(function () {
          copyButton.textContent = "Copiar enlace";

          if (copyStatus) {
            copyStatus.style.display = "none";
          }
        }, 2000);
      } catch (error) {
        window.prompt(
          "Copia el enlace:",
          checkoutLink.href
        );
      }
    });
  }
</script>
</body>
</html>
`;
}

function requireBrowserLogin(res) {
  res.setHeader(
    "WWW-Authenticate",
    'Basic realm="LPS CAD Administration"'
  );

  return res
    .status(401)
    .send("Authentication required");
}

export default async function handler(req, res) {
  const hasBasicAuth = isValidBasicAuth(req);
  const hasAdminToken = isValidAdminToken(req);

  /*
   * GET
   * Muestra la interfaz privada.
   */
  if (req.method === "GET") {
    if (!hasBasicAuth) {
      return requireBrowserLogin(res);
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    return res.status(200).send(renderPage());
  }

  /*
   * Solo POST aparte de GET.
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  /*
   * El POST puede autenticarse de dos maneras:
   *
   * 1. Basic Auth -> interfaz web privada.
   * 2. Bearer token -> comandos internos existentes.
   */
  if (!hasBasicAuth && !hasAdminToken) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  if (
    !process.env.PADDLE_API_KEY ||
    !process.env.PADDLE_ADMIN_TOKEN
  ) {
    console.error(
      "Paddle server configuration is incomplete"
    );

    return res.status(500).json({
      error: "Server configuration error",
    });
  }

  try {
    const { empresa, prefijo, plan } = req.body || {};

    const normalizedEmpresa =
      typeof empresa === "string"
        ? empresa.trim()
        : "";

    const normalizedPrefijo =
      typeof prefijo === "string"
        ? prefijo.trim().toUpperCase()
        : "";

    const normalizedPlan =
      typeof plan === "string"
        ? plan.trim().toLowerCase()
        : "";

    const isBrowserRequest = hasBasicAuth;

    if (!normalizedEmpresa) {
      if (isBrowserRequest) {
        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );

        return res.status(400).send(
          renderPage({
            empresa,
            prefijo,
            plan: normalizedPlan,
            error: "Empresa is required",
          })
        );
      }

      return res.status(400).json({
        error: "Empresa is required",
      });
    }

    if (normalizedEmpresa.length > 150) {
      if (isBrowserRequest) {
        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );

        return res.status(400).send(
          renderPage({
            empresa,
            prefijo,
            plan: normalizedPlan,
            error: "Empresa is too long",
          })
        );
      }

      return res.status(400).json({
        error: "Empresa is too long",
      });
    }

    if (!/^[A-Z]{3}$/.test(normalizedPrefijo)) {
      if (isBrowserRequest) {
        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );

        return res.status(400).send(
          renderPage({
            empresa,
            prefijo,
            plan: normalizedPlan,
            error:
              "Prefijo must contain exactly 3 letters",
          })
        );
      }

      return res.status(400).json({
        error:
          "Prefijo must contain exactly 3 letters",
      });
    }

    const priceId = PRICE_IDS[normalizedPlan];

    if (!priceId) {
      if (isBrowserRequest) {
        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );

        return res.status(400).send(
          renderPage({
            empresa,
            prefijo,
            plan: "basic",
            error: "Invalid plan",
          })
        );
      }

      return res.status(400).json({
        error: "Invalid plan",
      });
    }

    const paddleResponse = await fetch(
      "https://sandbox-api.paddle.com/transactions",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${process.env.PADDLE_API_KEY}`,
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
      console.error(
        "Paddle create transaction error:",
        paddleData
      );

      if (isBrowserRequest) {
        res.setHeader(
          "Content-Type",
          "text/html; charset=utf-8"
        );

        return res.status(500).send(
          renderPage({
            empresa: normalizedEmpresa,
            prefijo: normalizedPrefijo,
            plan: normalizedPlan,
            error:
              "Unable to create Paddle transaction",
          })
        );
      }

      return res.status(paddleResponse.status).json({
        error:
          "Unable to create Paddle transaction",
      });
    }

    const transactionId = paddleData.data.id;

    const checkoutUrl =
      paddleData.data.checkout?.url || "";

    /*
     * Respuesta para la interfaz web.
     */
    if (isBrowserRequest) {
      res.setHeader(
        "Content-Type",
        "text/html; charset=utf-8"
      );

      return res.status(201).send(
        renderPage({
          empresa: normalizedEmpresa,
          prefijo: normalizedPrefijo,
          plan: normalizedPlan,
          checkoutUrl,
          transactionId,
        })
      );
    }

    /*
     * Conservamos la respuesta JSON para el uso interno
     * mediante PADDLE_ADMIN_TOKEN.
     */
    return res.status(201).json({
      transactionId,
      checkoutUrl: checkoutUrl || null,
      empresa: normalizedEmpresa,
      prefijo: normalizedPrefijo,
      plan: normalizedPlan,
    });
  } catch (error) {
    console.error(
      "Create Paddle transaction error:",
      error
    );

    if (hasBasicAuth) {
      res.setHeader(
        "Content-Type",
        "text/html; charset=utf-8"
      );

      return res.status(500).send(
        renderPage({
          error: "Unable to create transaction",
        })
      );
    }

    return res.status(500).json({
      error: "Unable to create transaction",
    });
  }
}