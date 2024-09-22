import { apiHandler, stripeRepo } from "helpers/api";

export default apiHandler({
  post: update,
});

async function update(req, res) {
  const status = await stripeRepo.update(req);
  return res.status(200).json(status);
}
