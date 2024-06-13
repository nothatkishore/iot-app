import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',   //This is the API endpoint
    platform: 'react.app.aora',                 
    projectID: '66614f070030a003c3ef',
    databaseID: '666150f4002659bd6fc6',
    userCollectionID: '6661514600020f1cef6e',
    videoCollectionID: '6661518100071e77475d',
    storageID: '6661550d003ae5eea1be'
};

const { endpoint, platform, projectID, databaseID, userCollectionID, videoCollectionID, storageID } = config

const client = new Client();
client.setEndpoint(config.endpoint);
client.setProject(config.projectID);
client.setPlatform(config.platform);

const account = new Account(client);        //Authentication acess for the client
const avatars = new Avatars(client);        //Avatar for each client
const databases = new Databases(client);    //Database access for the client

export const createUser = async (email, username, password) => 
{
    try 
    {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw new Error("Failed to create account");

        const avatarURL = avatars.getInitials(username);

        await signin(email, password);

        const newUser = await databases.createDocument(
            config.databaseID,
            config.userCollectionID,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarURL
            }
        );

        return newUser;

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const signin = async (email, password) => 
{
    try 
    {
        const session = await account.createEmailSession(email, password);  //Validate the email-password comb
        return session;
    } 
    
    catch (error) 
    {
        console.log(error);
    }
};

export const getCurrentUser = async () => 
{
    try 
    {
        const currentAccount = await account.get();
        if (!currentAccount) 
            throw new Error("No current account found");

        const currentUser = await databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0) 
            throw new Error("No user found");
        
        return currentUser.documents[0];
    } 

    catch (error) 
    {
        console.log(error);
        throw error;
    }
};

export const getAllposts = async () =>
{
    try
    {
        const posts = await databases.listDocuments(
            databaseID,
            videoCollectionID
        )

        return posts.documents
    }

    catch(error)
    {
        throw new Error(error)
    }
}

export const getLatestposts = async () =>
{
    try
    {
        const posts = await databases.listDocuments(
            databaseID,
            videoCollectionID,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents
    }

    catch(error)
    {
        throw new Error(error)
    }
}