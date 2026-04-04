import { scrape, ScrapedResult, ScrapeSchema } from "./scraper";

export function parseHtml<S extends ScrapeSchema>(html: string, schema: S): ScrapedResult<S> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return scrape(doc, schema);
}
