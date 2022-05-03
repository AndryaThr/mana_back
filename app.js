const express = require("express");
const app = express();
const db = require("./db_connection");
const bb = require("./mana.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const KEYS = ["vakiteny", "lohateny", "content", "f"];

for (let month in bb) {
  for (let day in bb[month]) {
    let id = `${day}-${month}`;

    let cols = ["id", "month", "day"];
    let vals = [`"${id}"`, `"${month}"`, `"${day}"`];
    let more_keys = false;
    let others = "";

    let others_len = Object.keys(bb[month][day]).length - KEYS.length;

    for (let key in bb[month][day]) {
      switch (key) {
        case "vakiteny":
        case "lohateny":
          cols.push(key);
          vals.push(`"${bb[month][day][key]}"`);
          break;
        case "F":
        case "content":
          cols.push(key);
          vals.push(
            `"${bb[month][day][key]
              .join(" | ")
              .replace("”", " »")
              .replace("“", "« ")}"`
          );
          break;
        default:
          if (!more_keys) more_keys = true;
          others += `${key} | ${bb[month][day][key]
            .replace("”", " »")
            .replace("“", "« ")}`;
          if (others_len > 1) {
            others += " || ";
          }
          others_len -= 1;
          break;
      }
    }
    if (more_keys) {
      cols.push("others");
      vals.push(`"${others}"`);
    }
    let request = `INSERT INTO mana_isan_andro (${cols.join(
      ", "
    )}) values (${vals.join(", ")})`;
    db.run(request);
  }
}

app.get("/", (req, res) => {
  res.json({ res: "ok" });
});

module.exports = app;
