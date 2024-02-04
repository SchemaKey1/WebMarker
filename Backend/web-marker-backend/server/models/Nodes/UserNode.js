import {
  NODE_TYPES,
  RELATIONSHIP_TYPE,
  USER_ID_TYPE,
  USER_NODE_PROPERTY,
} from "../constants.js";
import { executeQuery, convertToCypherUpdateQuery } from "../utils.js";

class UserNode {
  constructor() {}

  static convertToCypherObjectString({
    firstName,
    lastName,
    emailId,
    phoneNumber,
    userID,
    userIDType,
  }) {
    const values = {
      firstName,
      lastName,
      emailId,
      phoneNumber,
      userID,
      userIDType,
    };

    let ans = "{";

    for (const key in values) {
      if (values[key]) {
        ans += ",";
        switch (key) {
          case "firstName":
            ans += `${USER_NODE_PROPERTY.FIRST_NAME}: "${firstName}"`;
            break;
          case "lastName":
            ans += `${USER_NODE_PROPERTY.LAST_NAME}: "${lastName}"`;
            break;
          case "emailId":
            ans += `${USER_NODE_PROPERTY.EMAIL_ID}: "${emailId}"`;
            break;
          case "phoneNumber":
            ans += `${USER_NODE_PROPERTY.PHONE_NUMBER}: "${phoneNumber}"`;
            break;
          case "userID":
            ans += `${USER_NODE_PROPERTY.USER_ID}: "${userID}"`;
            break;
          case "userIDType":
            ans += `${USER_NODE_PROPERTY.USER_ID_TYPE}: "${userIDType}"`;
        }
      }
    }

    ans += "}";

    return ans;
  }

  // add this method in DBDriver. constraint
  static constraintsQueries() {
    return [
      `CREATE CONSTRAINT user_emailId IF NOT EXISTS FOR (n: ${NODE_TYPES.USER_NODE}) REQUIRE n.emailId IS UNIQUE`,
      `CREATE CONSTRAINT user_phoneNumber IF NOT EXISTS FOR (n: ${NODE_TYPES.USER_NODE}) REQUIRE n.phoneNumber IS UNIQUE`,
      `CREATE CONSTRAINT user_userId IF NOT EXISTS FOR (n: ${NODE_TYPES.USER_NODE}) REQUIRE n.userId IS UNIQUE`,
      `CREATE CONSTRAINT user_nodeKey IF NOT EXISTS FOR (n: ${NODE_TYPES.USER_NODE}) REQUIRE n.userId IS NODE KEY`,
    ];
  }

  static async getAll() {
    const getAllUserQuery = `MATCH (user: ${NODE_TYPES.USER_NODE}) return user`;
    try {
      const result = await executeQuery([getAllUserQuery]);
      console.log("Got all the users");
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async create({
    firstName = "",
    lastName = "",
    emailId = "",
    phoneNumber = "",
    userID,
    userIDType,
  }) {
    const userCreateQuery = `CREATE (user: ${
      NODE_TYPES.USER_NODE
    } ${this.convertToCypherObjectString({
      firstName,
      lastName,
      emailId,
      phoneNumber,
      userID,
      userIDType,
    })}) -[:${RELATIONSHIP_TYPE.ROOT_FOLDER_NODE}]-> (:${
      NODE_TYPES.FOLDER_NODE
    })`;

    console.log(`running this query - ${userCreateQuery}`);

    try {
      const result = await executeQuery([userCreateQuery]);
      console.log("User is created");
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async detatchDelete({ userID }) {
    const userDetatchDeleteQuery = `MATCH (user: ${
      NODE_TYPES.USER_NODE
    } ${this.convertToCypherObjectString({
      userID,
    })}) DETACH DELETE user`;

    console.log(`running this query - ${userDetatchDeleteQuery}`);

    try {
      const result = await executeQuery([userDetatchDeleteQuery]);
      console.log("User is deleted");
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async update({ firstName, lastName, emailId, phoneNumber, userID }) {
    const userUpdateQuery = `MATCH (user: ${
      NODE_TYPES.USER_NODE
    } ${this.convertToCypherObjectString({
      userID,
    })}) ${convertToCypherUpdateQuery("user", {
      firstName,
      lastName,
      emailId,
      phoneNumber,
    })}`;
    console.log(`running this query - ${userUpdateQuery}`);

    try {
      const result = await executeQuery([userUpdateQuery]);
      console.log("User is updated");
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserNode;
