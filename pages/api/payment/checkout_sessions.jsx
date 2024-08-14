import getConfig from "next/config";
import { packService } from "services";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const stripe = require("stripe")(serverRuntimeConfig.stripe_secret_key);

export default async function handler(req, res) {
  const { idPack, typePack, token } = req.query;
  let price = "prod_ObRoZkMXdCRLmQ";
  if (typePack == 21) {
    price = publicRuntimeConfig.pack2_monthly;
  } else if (typePack == 2) {
    price = publicRuntimeConfig.pack2_annual;
  } else if (typePack == 31) {
    price = publicRuntimeConfig.pack3_monthly;
  } else if (typePack == 3) {
    price = publicRuntimeConfig.pack3_annual;
  } else if (typePack == 1) {
    price = publicRuntimeConfig.pack1;
  }

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${publicRuntimeConfig.baseUrl}/awaitSuccess`,
      cancel_url: `${publicRuntimeConfig.baseUrl}/?canceled=true`,
      client_reference_id: idPack,
    });

    const responseUpdate = await packService.updateSessionPayment(idPack, {
      sessionIdStripe: session.id,
      token: token,
    });

    res.redirect(303, session.url);
  } catch (err) {
    console.log("err", err);
    res.status(err.statusCode || 500).json(err.message);
  }
}
