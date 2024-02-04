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
  let mResult = {};

  if (result.status == "fulfilled") {
    mResult.status = 200;
    mResult.status = result.status;
    mResult.records = result.value.records;
  } else {
    result.status = 500;
  }
  return mResult;
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
