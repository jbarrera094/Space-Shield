import { apiHandler, LicensesRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await LicensesRepo.create(req.body);
    return res.status(200).json({});
}
