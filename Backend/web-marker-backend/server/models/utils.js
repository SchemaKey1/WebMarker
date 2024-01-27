import DbDriver from "./index.js";

const executeQuery = async (queries, driver) => {
  const mDriver = driver || new DbDriver();
  const result = await Promise.allSettled(
    queries.map((queryStr) => mDriver.executeQuery(queryStr))
  );
  return result;
};

export { executeQuery };
