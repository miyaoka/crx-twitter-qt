// https://twitter.com/USER-ID/status/TWEET-ID/retweets/with_comments
const qtPathRegex = new RegExp("^/[^/]+/status/\\d+/retweets/with_comments");

const qtSelector = "[data-testid=tweet]";
const quoteInQtSelector = "[aria-labelledby]";

const removeQuoteInComments = () => {
  if (!qtPathRegex.test(location.pathname)) return;

  const qtList = Array.from(document.querySelectorAll(qtSelector));
  qtList.forEach((qt) => {
    const quote = qt.querySelector<HTMLElement>(quoteInQtSelector);
    if (!quote) return;
    if (quote.style.display === "none") return;
    quote.style.display = "none";
  });
};

new PerformanceObserver(() => {
  removeQuoteInComments();
}).observe({
  entryTypes: ["largest-contentful-paint", "longtask"],
});

document.addEventListener("scroll", () => {
  removeQuoteInComments();
});
