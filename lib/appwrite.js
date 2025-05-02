import { Client, Storage, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite URL (Cloud kullanıyorsan bu doğru)
  .setProject("67d8059c000c44d665b7"); // Appwrite Project ID'ni buraya ekle

const storage = new Storage(client);
const database = new Databases(client);

export { client, storage, database };
