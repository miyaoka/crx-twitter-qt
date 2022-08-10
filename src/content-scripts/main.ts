// https://twitter.com/USER-ID/status/TWEET-ID/retweets/with_comments
const qtPathRegex = new RegExp("^/[^/]+/status/\\d+/retweets/with_comments");

const style = document.createElement("style");
document.body.appendChild(style);

let pathname = "";

const onLongtask = () => {
  if (pathname === location.pathname) return;
  pathname = location.pathname;

  onChangePath(pathname);
};

const onChangePath = (pathname: string) => {
  const isQtPath = qtPathRegex.test(pathname);

  style.innerText = isQtPath
    ? `[data-testid=tweet] [aria-labelledby]{ display: none; }`
    : "";
};

new PerformanceObserver(() => {
  onLongtask();
}).observe({
  type: "longtask",
  buffered: true,
});
