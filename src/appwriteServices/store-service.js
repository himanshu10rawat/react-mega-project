import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

class StoreService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const storeService = new StoreService();

export default storeService;
