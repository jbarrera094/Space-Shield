import { apiHandler, PacksRepo } from "helpers/api";

export default apiHandler({
  post: register,
});

async function register(req, res) {
  const idPack = await PacksRepo.create(req.body);
  return res.status(200).json({ idPack });
}
