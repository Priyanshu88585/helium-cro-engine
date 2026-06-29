import FirecrawlApp from "@mendable/firecrawl-js";
import * as cheerio from "cheerio";

export async function crawlStore(url: string): Promise<string> {
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;

  if (firecrawlApiKey) {
    try {
      const app = new FirecrawlApp({ apiKey: firecrawlApiKey });
      const scrapeResult = await app.scrapeUrl(url, {
        formats: ["markdown", "html"],
      }) as any;
      if (!scrapeResult.success) {
        throw new Error(`Failed to scrape: ${scrapeResult.error}`);
      }
      return scrapeResult.markdown || "No content extracted.";
    } catch (error) {
      console.warn("Firecrawl failed, falling back to Cheerio crawler.", error);
    }
  }

  // Fallback to basic fetch + cheerio
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HeliumCROEngine/1.0)",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove scripts, styles, etc.
    $("script, style, noscript, iframe, svg, img").remove();

    // Extract text
    const text = $("body").text().replace(/\s+/g, " ").trim();
    return text;
  } catch (error: any) {
    throw new Error(`Fallback crawler failed: ${error.message}`);
  }
}
