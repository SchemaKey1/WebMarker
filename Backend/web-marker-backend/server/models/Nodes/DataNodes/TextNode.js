import {
  NODE_TYPES,
  TEXT_NODE_PROPERTY,
  RELATIONSHIP_TYPE,
} from "../../constants.js";
import { executeQuery } from "../../utils.js";

class TextNode {
  constructor() {}

  // add this method in DBDriver. constraint
  static constraintsQueries() {
    return [];
  }

  static convertToCypherObjectString({ textContent }) {
    const values = {
      textContent,
      createdOn: Date.now(),
    };

    let ans = "{";

    for (const key in values) {
      if (values[key]) {
        ans += ",";
        switch (key) {
          case "textContent":
            ans += `${TEXT_NODE_PROPERTY.TEXT_CONTENT}: "${textContent}"`;
            break;
          case "createdOn":
            ans += `${TEXT_NODE_PROPERTY.CREATED_ON}: "${values[key]}"`;
        }
      }
    }

    ans += "}";

    return ans;
  }

  //For Creation of TextNode inside a FileNode
  //get the Last node and add the new TextNode inside it.
  //required - fileId
  static async create({ textContent = "" }, fileId) {
    const textNodeCreateQuery = `MATCH (fileNode: ${
      NODE_TYPES.FILE_NODE
    }) -[rel: ${RELATIONSHIP_TYPE.REFERENCE_NODE}]-> (refNode) -[relLastNode:${
      RELATIONSHIP_TYPE.LAST_NODE
    }]-> (lastFileNode)
    WHERE ID(fileNode) = ${fileId}
    DELETE relLastNode
    CREATE (lastFileNode) -[:${RELATIONSHIP_TYPE.NEXT_NODE}]-> (newTextNode: ${
      NODE_TYPES.TEXT_NODE
    } ${this.convertToCypherObjectString({ textContent })})
    CREATE (refNode) -[:${RELATIONSHIP_TYPE.LAST_NODE}]-> (newTextNode)`;

    console.log(`running this query - ${textNodeCreateQuery}`);

    try {
      const result = await executeQuery([textNodeCreateQuery]);
      console.log("Text Node is created");
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }
}

export default TextNode;
