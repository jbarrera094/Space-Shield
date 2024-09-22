import { apiHandler, MailsRepo } from 'helpers/api';

export default apiHandler({
    post: firstContact,
});

async function firstContact(req, res) {
    const statusEmail = await MailsRepo.firstContact(req.body);
    return res.status(200).json(statusEmail);
}