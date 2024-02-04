import dbConfig from "../../config/db.config";
import neo4j from "neo4j-driver";
import { executeQuery } from "./utils";
import UserNode from "./Nodes/UserNode.js";
import TextNode from "./Nodes/DataNodes/TextNode.js";

class DbDriver {
  driverInstance = null;

  constructor() {
    if (!this.driverInstance) {
      this.CreateDriverInstance();
    }
    return this.driverInstance;
  }

  async CreateDataBaseContraints(driver) {
    try {
      return await executeQuery(
        [...UserNode.constraintsQueries(), ...TextNode.constraintsQueries()],
        driver
      );
    } catch (err) {
      console.log(err);
    }
  }

  CreateDriverInstance() {
    const driver = neo4j.driver(
      dbConfig.uri,
      neo4j.auth.basic(dbConfig.user, dbConfig.password)
    );

    (async () => {
      try {
        const serverInfo = await driver.getServerInfo();
        console.log("Connection established");
        console.log(serverInfo);
      } catch (err) {
        console.log(`Connection err - ${err}`);
      }
    })();

    (async () => {
      try {
        const result = await this.CreateDataBaseContraints(driver);
        console.log(`Constraints set is completed result - ${result}`);
      } catch (err) {
        console.log(`Constraints err - ${err}`);
      }
    })();

    this.driverInstance = driver;
  }
}

export default DbDriver;
