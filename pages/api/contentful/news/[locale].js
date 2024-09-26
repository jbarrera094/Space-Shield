import { apiHandler, ContentfulRepo } from "helpers/api";

export default apiHandler({
    get: news,
});

async function news(req, res) {
    const news = await ContentfulRepo.news(req.query.locale);
    return res.status(200).json(news);
}
