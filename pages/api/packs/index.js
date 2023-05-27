import { apiHandler, PacksRepo } from 'helpers/api';

export default apiHandler({
    post: getAll
});

async function getAll(req, res) {
    const packs = await PacksRepo.getAll(req.body);
    return res.status(200).json(packs);
}
