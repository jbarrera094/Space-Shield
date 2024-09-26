import { apiHandler, ContentfulRepo } from "helpers/api";

export default apiHandler({
    get: status,
});

async function status(req, res) {
    const status = await ContentfulRepo.status();
    return res.status(200).json(status);
}
