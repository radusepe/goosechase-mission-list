import * as express from "express";
import * as pgPromise from "pg-promise";
const cors = require("cors");

import { dbConnection } from "./constants";

const app = express();
app.use(cors());
const port = 3001;

const pgp = pgPromise();
const db = pgp(dbConnection);

// Testing endpoint to fetch all missions
app.get("/api/missions/all", async (req, res) => {
  const allMissions = await getAllMissions();
  res.send(allMissions);
});

app.get("/api/missions", async (req, res) => {
  // TODO: Need to sanitize the input
  const { offset = 0, limit = 5, sort = "id", filter } = req.query;

  try {
    const allMissions = await getMissions({
      limit: limit as number,
      offset: offset as number,
      sortBy: sort as string,
      filter: filter ? JSON.parse(filter as string) : undefined,
    });
    res.send(allMissions);
  } catch (err) {
    console.log("ERROR:", err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// helpers
type GetMissionArgs = {
  limit: number;
  offset: number;
  sortBy: string;
  filter?: string[];
};
const getMissions = ({ limit, offset, sortBy, filter }: GetMissionArgs) => {
  const query = `SELECT * FROM missions ${getFilterBy(filter)} ${getOrderBy(
    sortBy
  )} LIMIT ${limit} OFFSET ${offset};`;

  return db
    .many(query, [filter])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
      return [];
    });
};

const getOrderBy = (sortBy: string) => {
  if (sortBy === "id") {
    return "ORDER BY id";
  } else {
    return `ORDER BY lower(${sortBy})`;
  }
};

const getFilterBy = (filter?: string[]) => {
  if (filter) {
    return "WHERE type LIKE ANY($1)";
  }
  return "";
};

const getAllMissions = () =>
  db
    .many("SELECT * FROM missions;")
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
      return [];
    });
