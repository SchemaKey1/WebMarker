import DbDriver from "./index.js";
import { NODE_TYPES_CLASS } from "./constants.js";

const executeQuery = async (queries, driver) => {
  const mDriver = driver || new DbDriver();
  const result = await Promise.allSettled(
    queries.map((queryStr) => mDriver.executeQuery(queryStr))
  );
  return result;
};

const formatResponseStatus = (result) => {
  if (result.status == "fulfilled") {
    result.status = 200;
  } else {
    result.status = 500;
  }
  return result;
};

const convertToCypherUpdateQuery = (matchObj, data) => {
  let query = `SET `;
  let isFirst = true;
  for (const key in data) {
    if (data[key]) {
      if (!isFirst) {
        query += ",";
      }
      if (isFirst) isFirst = false;
      query += `${matchObj}.${key} =  ${JSON.stringify(data[key])}`;
    }
  }
  return query;
};

export { executeQuery, formatResponseStatus, convertToCypherUpdateQuery };
