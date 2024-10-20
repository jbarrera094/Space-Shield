import { expressjwt } from "express-jwt";
import util from "util";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/contentful/news/en-US",
      "/api/contentful/news/es-CO",
      "/api/contentful/status",
      "/api/users/register",
      "/api/mails/firstContact",
      "/api/mails/resetPassword",
      "/api/users/authenticate",
      "/api/payment/webhook",
      "/api/users/recover",
      "/",
    ],
  });

  return util.promisify(middleware)(req, res);
}
