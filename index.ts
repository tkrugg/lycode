import { getLines } from "./lib/indexer";
import * as algoliasearch from "algoliasearch";
// options is optional

async function run() {
  const repositories = ["https://github.com/algolia/angular-instantsearch"];

  const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
  const index = client.initIndex(process.env.INDEX_NAME);

  getLines(
    "angular-instantsearch",
    "https://github.com/algolia/angular-instantsearch",
    (
      err: any,
      lineData: { objectID: string; line: string; repositoryName: string },
      progress: number
    ) => {
      console.log("+++", progress);
      index.addObject(lineData);
    }
  );
  // download the repo
}

run();
