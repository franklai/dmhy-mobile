import { parse } from "rss-to-json";

const URL = "https://share.dmhy.org/topics/rss/rss.xml";

export default async function handler(req, res) {
  const { keyword } = req.query;

  let items = [];
  try {
    const rss = await parse(`${URL}?keyword=${encodeURIComponent(keyword)}`);

    items = rss.items;
  } catch (error) {
    console.error(error);
  }

  res.status(200).json({ keyword: keyword || "", items: items });
}
