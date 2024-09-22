import { apiHandler, usersRepo } from "helpers/api";

export default apiHandler({
  post: recover,
});

async function recover(req, res) {
  const response = await usersRepo.recover(req.body);
  return res.status(200).json(response);
}
