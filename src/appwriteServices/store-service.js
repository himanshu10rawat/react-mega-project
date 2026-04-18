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
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      return null;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFileView({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const storeService = new StoreService();

export default storeService;
