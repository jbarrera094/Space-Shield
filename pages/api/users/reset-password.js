import { apiHandler, usersRepo } from "helpers/api";

export default apiHandler({
  post: reset,
});

async function reset(req, res) {
  const response = await usersRepo.reset(req.body);
  return res.status(200).json(response);
}
