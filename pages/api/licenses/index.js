import { apiHandler, LicensesRepo } from 'helpers/api';

export default apiHandler({
    post: getAll
});

async function getAll(req, res) {
    const licenses = await LicensesRepo.getAll(req.body);
    return res.status(200).json(licenses);
}
