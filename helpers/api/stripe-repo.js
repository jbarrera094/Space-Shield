import getConfig from "next/config";
import { packService } from "services";

const { serverRuntimeConfig } = getConfig();
const stripe_secret_key = require("stripe")(
  serverRuntimeConfig.stripe_secret_key
);

// This is your test secret API key.
const stripe = require("stripe")(stripe_secret_key);
// const endpointSecret = "whsec_...";

export const stripeRepo = {
  update,
};

async function update(request) {
  let event = request.body;

  switch (event.type) {
    case "checkout.session.completed":
      const packId = event.data.object.client_reference_id;
      if (packId) {
        await packService.updateSessionPayment(packId, {
          paid: true,
        });
      }
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  return "Hola BB";
}
