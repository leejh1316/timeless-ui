import { scrape, ScrapeSchema } from "./scraper";

export function parseHtml<R extends any>(html: string, schema: ScrapeSchema): R {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return scrape(doc, schema) as R;
}
