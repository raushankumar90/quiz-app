import { Account, Client, Databases, ID, Storage, Query, OAuthProvider } from "appwrite";

export const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export class MyDatabase {
  constructor(databaseId, collectionId, storageId = null) {
    this.databaseId = databaseId;
    this.collectionId = collectionId;
    this.storageId = storageId; // Corrected the casing to match standard conventions
  }
  makeNewAccount = async (email, password, name) => {
    const newAccount = await account.create(ID.unique(),email, password, name);
    return newAccount;
  };

  createOAuthSession = async()=>{
    account.createOAuth2Session(
      OAuthProvider.Google,
      'http://localhost:5173/language',
      'http://localhost:5173/login'
    )
  }
  listDataByEmail = async (email) => {
    const result = await databases.listDocuments(
      this.databaseId,
      this.collectionId,
      [Query.equal("email", email)]
    );
    return result;
  };
  updateDatabase = async (documentId, data) => {
    const result = await databases.updateDocument(
      this.databaseId,
      this.collectionId,
      documentId,
      data
    );
    return result;
  };

  createDocument = async (data) => {
    const doc = await databases.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(), // Automatically generate a unique ID
      data
    );
    return doc;
  };

  checkEmailExists = async(email)=>{
    const items = await databases.listDocuments(this.databaseId,this.collectionId,[Query.equal("email",email)])
    if(items.total>0) {return true}else{return false}
  }

  getTestDataByTestID = async(test_id)=>{
    // console.log(test_id);
    
    const result = await databases.listDocuments(this.databaseId,this.collectionId,[Query.equal("test_id",test_id)])
    if(result.total>0){
      return result
    }
  }

  updateUserAnswer = async(test_id,answer) => {
    // console.log(test_id,answer);
    let result;
    const userdata = await databases.listDocuments(this.databaseId,this.collectionId,[Query.equal("test_id",test_id)])
    // console.log(userdata);
    if(userdata.total>0){
      result = await databases.updateDocument(this.databaseId,this.collectionId,userdata.documents[0].$id,{user_answer:answer})
    }
    // console.log(result);
    return result
  }

  getAllDataByEmail = async(email) =>{
    const data =await databases.listDocuments(this.databaseId,this.collectionId,[Query.equal("email",email)])
    return data.documents
  }
}

export const MyTestData = new MyDatabase( //all test data
  import.meta.env.VITE_APPWRITE_DB_ID,
  import.meta.env.VITE_APPWRITE_COLLECTION_ALL_TEST_DATA
);

export const UserTestData = new MyDatabase(
  import.meta.env.VITE_APPWRITE_DB_ID,
  import.meta.env.VITE_APPWRITE_COLLECTION_USER_TEST
)
export const MyUserData = new MyDatabase(import.meta.env.VITE_APPWRITE_DB_ID,import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID)