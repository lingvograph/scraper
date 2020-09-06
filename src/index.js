import fetch from "isomorphic-unfetch";
import cheerio from "cheerio";

import macmillan from "./sources/macmillan";

function parse(source, html) {
  const $ = cheerio.load(html);
  const data = {};
  for (const item of source.plan) {
    if (item.term) {
      if (!data[item.term]) {
        data[item.term] = [];
      }
      const content = new Set(data[item.term]);
      $(item.selector).each((i, elem) => {
        const text = $(elem).text().trim();
        if (!text) {
          return;
        }
        if (item.exclude && item.exclude.includes(text)) {
          return;
        }
        content.add(text);
      });
      data[item.term] = content;
    } else if (item.audio) {
      // TODO implement
    }
  }
  return {
    source: source.name,
    data,
  };
}

function makeParser(source) {
  return (text) => {
    const url = source.url({ text });
    return fetch(url, {
      headers: {
        "User-Agent": "bot",
        Accept: "text/html,application/xhtml+xml",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        }
        throw new Error(resp.statusText);
      })
      .then((html) => {
        return parse(source, html);
      })
      .catch((error) => ({ error }));
  };
}

const parsers = [macmillan].map(makeParser);

export function fetchData(text) {
  return Promise.all(parsers.map((fn) => fn(text)));
}