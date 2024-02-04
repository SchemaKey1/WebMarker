import {
  FOLDER_NODE_PROPERTIES,
  NODE_TYPES,
  RELATIONSHIP_TYPE,
} from "../constants.js";
import { executeQuery } from "../utils.js";

class FolderNode {
  constructor() {}

  static convertToCypherObjectString({ title = "" }) {
    const values = {
      title,
      createdOn: Date.now(),
    };

    let ans = "{";

    for (const key in values) {
      if (values[key]) {
        ans += ",";
        switch (key) {
          case "title":
            ans += `${FOLDER_NODE_PROPERTIES.TITLE}: "${title}"`;
            break;
          case "createdOn":
            ans += `${FOLDER_NODE_PROPERTIES.CREATED_ON}: "${values[key]}"`;
            break;
        }
      }
    }

    ans += "}";

    return ans;
  }

  //create a FolderNode in RootFolder/or in some other Folder.
  //requried - parentFolderId
  static async create({ title = "" }, parentFolderId) {
    const folderCreateQuery = `MATCH (folderNode:${NODE_TYPES.FOLDER_NODE})
        WHERE ID(folderNode) = ${parentFolderId}
        CREATE (folderNode) -[rel:${
          RELATIONSHIP_TYPE.HAS_CHILD
        }]-> (newFolderNode:${
      NODE_TYPES.FOLDER_NODE
    } ${this.convertToCypherObjectString({ title })})`;

    console.log(`running this query - ${folderCreateQuery}`);

    try {
      const result = await executeQuery([folderCreateQuery]);
      console.log("folder is created");
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllFoldersByParentFolderId(parentFolderId) {
    const getAllFolderQuery = `MATCH (node: ${NODE_TYPES.FOLDER_NODE}) -[:${RELATIONSHIP_TYPE.HAS_CHILD}]-> (childNode)
    WHERE ID(node) = ${parentFolderId}
    return childNode`;

    console.log(`running this query - ${getAllFolderQuery}`);

    try {
      const result = await executeQuery([getAllFolderQuery]);
      console.log("folder is created");
      console.log(result[0]);
      return result[0];
    } catch {
      console.log(err);
    }
  }
}

export default FolderNode;
