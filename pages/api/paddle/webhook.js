export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const rawBody = Buffer.concat(chunks).toString("utf8");

    const event = JSON.parse(rawBody);

    console.log(
      "Paddle webhook received:",
      event.event_type,
      event.data?.id
    );

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("Paddle webhook error:", error);

    return res.status(400).json({
      received: false,
    });
  }
}