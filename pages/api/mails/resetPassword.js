import { apiHandler, MailsRepo } from 'helpers/api';

export default apiHandler({
    post: resetPassword,
});

async function resetPassword(req, res) {
    const statusEmail = await MailsRepo.resetPassword(req.body);
    return res.status(200).json(statusEmail);
}