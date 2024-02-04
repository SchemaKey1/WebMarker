import {
  FILE_NODE_PROPERTIES,
  NODE_TYPES,
  RELATIONSHIP_TYPE,
} from "../constants.js";
import { executeQuery } from "../utils.js";

class FileNode {
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
            ans += `${FILE_NODE_PROPERTIES.TITLE}: "${title}"`;
            break;
          case "createdOn":
            ans += `${FILE_NODE_PROPERTIES.CREATED_ON}: "${values[key]}"`;
            break;
        }
      }
    }

    ans += "}";

    return ans;
  }

  //create a FileNode in RootFolder/ or in some other Folder,
  //and create a ReferenceNode for it.
  //required - parentFolderId
  static async create({ title = "" }, parentFolderId) {
    const folderCreateQuery = `MATCH (folderNode:${NODE_TYPES.FOLDER_NODE})
        WHERE ID(folderNode) = ${parentFolderId}
        CREATE (folderNode) -[rel:${
          RELATIONSHIP_TYPE.HAS_CHILD
        }]-> (newFileNode:${
      NODE_TYPES.FILE_NODE
    } ${this.convertToCypherObjectString({ title })}) -[:${
      RELATIONSHIP_TYPE.REFERENCE_NODE
    }]-> 
    (refNode:${NODE_TYPES.REFERENCE_NODE}) -[:${
      RELATIONSHIP_TYPE.LAST_NODE
    }]-> (newFileNode)`;

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
}

export default FileNode;
