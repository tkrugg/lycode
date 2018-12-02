const randomstring = require("randomstring");
const git = require("nodegit");
const glob = require("glob");
import * as fs from "fs";

export function getLines(repositoryName: string, repositoryUrl: string, callback: Function) {
  const folder = `./tmp/${randomstring.generate()}`;
  git.Clone(repositoryUrl, folder).then((repo: any) => {
    glob(`${folder}/**/*.ts`, {}, (err: any, files: any[]) => {
      files.map((file, fileIndex) => {
        const filepath = file.slice(folder.length);
        fs.readFile(file, { encoding: "utf-8" }, (err, content) => {
          if (err) throw err;
          const lines = content.split("\n");
          lines.map((line, index) => {
            const objectID = `${filepath}:${index}`;
            const lineData = {
              objectID,
              line,
                repositoryName,
            };
           callback(null, lineData, (fileIndex + 1) / files.length);
          });
        });
      });
    });
  });
}

