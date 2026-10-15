import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const siteUrl = process.env.SITE_URL ?? "http://localhost:8765/";
const infiniteScrollScript = new URL("../infinite-scroll.js", import.meta.url);
const postsPerPage = 25;

let browser;
let page;

before(async () => {
  browser = await chromium.launch({ channel: "chrome" });
});

after(async () => {
  await browser.close();
});

async function openListingWithInfiniteScroll() {
  page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.route("**/infinite-scroll.js", async (route) =>
    route.fulfill({ contentType: "text/javascript", body: await readFile(infiniteScrollScript, "utf8") })
  );
  await page.route(siteUrl, async (route) => {
    const response = await route.fetch();
    const html = (await response.text()).replace(
      "</body>",
      '<script src="infinite-scroll.js"></script></body>'
    );
    await route.fulfill({ response, body: html });
  });
  await page.goto(siteUrl);
}

const visiblePostCount = () => page.locator("#listing-listing .quarto-post").count();
const totalPostCount = () => page.evaluate(() => window["quarto-listings"]["listing-listing"].matchingItems.length);

async function scrollToBottom() {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

test("shows the first page of posts initially", async () => {
  await openListingWithInfiniteScroll();
  assert.equal(await visiblePostCount(), postsPerPage);
});

test("appends the next page of posts when scrolled to the bottom", async () => {
  await openListingWithInfiniteScroll();
  await scrollToBottom();
  await page.waitForFunction((expected) => document.querySelectorAll("#listing-listing .quarto-post").length === expected, 2 * postsPerPage);
  assert.equal(await visiblePostCount(), 2 * postsPerPage);
});

test("keeps appending until all posts are shown", async () => {
  await openListingWithInfiniteScroll();
  const total = await totalPostCount();
  while ((await visiblePostCount()) < total) {
    const countBefore = await visiblePostCount();
    await scrollToBottom();
    await page.waitForFunction((count) => document.querySelectorAll("#listing-listing .quarto-post").length > count, countBefore);
  }
  assert.equal(await visiblePostCount(), total);
});

test("hides the page navigation", async () => {
  await openListingWithInfiniteScroll();
  assert.equal(await page.locator("#listing-pagination").isVisible(), false);
});

test("filtering by category still shows only matching posts", async () => {
  await openListingWithInfiniteScroll();
  await page.locator(".quarto-listing-category .category").nth(1).click();
  const shownCategoryMatches = await page.evaluate(() => {
    const list = window["quarto-listings"]["listing-listing"];
    return list.visibleItems.length === Math.min(list.matchingItems.length, list.page);
  });
  assert.equal(shownCategoryMatches, true);
  assert.ok((await visiblePostCount()) <= postsPerPage);
});
