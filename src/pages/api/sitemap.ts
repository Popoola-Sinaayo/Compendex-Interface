import { customMarketsList } from "@/utils/customMarkets";

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url>
    <loc>https://sol.compendex.xyz/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://sol.compendex.xyz/analytics</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
    ${customMarketsList.map(
      (market) => ` <url>
    <loc>https://sol.compendex.xyz/market/${market.address}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    )}
  <url>
    <loc>https://sol.compendex.xyz/toolbox</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>https://sol.compendex.xyz/swap</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
    </urlset>`;

  res.end(xml);
}
