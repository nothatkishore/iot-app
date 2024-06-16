import { useState } from 'react';
import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

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
const storage = new Storage(client)         //Storage for the client

export const createUser = async (email, username, password) => {
    try {
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

export const signin = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);  //Validate the email-password comb
        return session;
    }

    catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async () => {
    try {
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

    catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllposts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseID,
            videoCollectionID
        )

        return posts.documents
    }

    catch (error) {
        throw new Error(error)
    }
}

export const getLatestposts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseID,
            videoCollectionID,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents
    }

    catch (error) {
        throw new Error(error)
    }
}

export async function searchPosts(query) {
    try {
        const posts = await databases.listDocuments(
            config.databaseID,
            config.videoCollectionID,
            [Query.search("title", query)]
        );

        if (!posts) throw new Error("Something went wrong");

        return posts.documents;
    }

    catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userID) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseID,
            config.videoCollectionID,
            [Query.equal('creator', userID)]
        )
        return posts.documents
    }

    catch (error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = account.deleteSession('current')
        return session
    }

    catch (error) {
        throw new Error(error)
    }
}

export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        storageID,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(storageID, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          storageID,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        databaseID,
        videoCollectionID,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }
  