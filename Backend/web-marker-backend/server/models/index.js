import dbConfig from "../../config/db.config";
import neo4j from "neo4j-driver";
import { executeQuery } from "./utils";
import { NODE_TYPES } from "./constants.js";

class DbDriver {
  driverInstance = null;

  constructor() {
    if (!this.driverInstance) {
      this.CreateDriverInstance();
    }
    return this.driverInstance;
  }

  async CreateDataBaseContraints(driver) {
    const userEmailId = `CREATE CONSTRAINT user_emailId IF NOT EXISTS FOR (n: ${NODE_TYPES.USERNODE}) REQUIRE n.emailId IS UNIQUE`;
    const userPhoneNumber = `CREATE CONSTRAINT user_phoneNumber IF NOT EXISTS FOR (n: ${NODE_TYPES.USERNODE}) REQUIRE n.phoneNumber IS UNIQUE`;
    const userUserId = `CREATE CONSTRAINT user_userId IF NOT EXISTS FOR (n: ${NODE_TYPES.USERNODE}) REQUIRE n.userId IS UNIQUE`;
    const userNodeKey = `CREATE CONSTRAINT user_nodeKey IF NOT EXISTS FOR (n: ${NODE_TYPES.USERNODE}) REQUIRE n.userId IS NODE KEY`;
    return await executeQuery(
      [userEmailId, userPhoneNumber, userUserId, userNodeKey],
      driver
    );
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
