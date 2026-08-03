import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

/**
 * Upload PDF Report to Firebase Storage
 * @param {string} filename Name of file in storage
 * @param {Blob|File|string} fileData PDF Blob or Data URL string
 * @returns {Promise<string>} Download URL of uploaded PDF
 */
export const uploadPDFReport = async (filename, fileData) => {
  try {
    const storageRef = ref(storage, `reports/${filename}`);
    if (typeof fileData === 'string') {
      await uploadString(storageRef, fileData, 'data_url');
    } else {
      await uploadBytes(storageRef, fileData);
    }
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("PDF Report uploaded to Firebase Storage:", downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("Firebase Storage PDF upload failed:", error);
    throw error;
  }
};

/**
 * Upload Medical Image to Firebase Storage
 * @param {string} filename Name of file in storage
 * @param {File|Blob} imageFile Medical image file object
 * @returns {Promise<string>} Download URL
 */
export const uploadMedicalImage = async (filename, imageFile) => {
  try {
    const storageRef = ref(storage, `medical_images/${filename}`);
    await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Medical Image uploaded to Firebase Storage:", downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("Firebase Storage Medical Image upload failed:", error);
    throw error;
  }
};

/**
 * Upload Dataset Backup to Firebase Storage
 * @param {string} filename Name of dataset backup file
 * @param {string|Blob} datasetContent JSON or CSV dataset content
 * @returns {Promise<string>} Download URL
 */
export const uploadDatasetBackup = async (filename, datasetContent) => {
  try {
    const storageRef = ref(storage, `backups/${filename}`);
    if (typeof datasetContent === 'string') {
      await uploadString(storageRef, datasetContent, 'raw');
    } else {
      await uploadBytes(storageRef, datasetContent);
    }
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Dataset Backup uploaded to Firebase Storage:", downloadUrl);
    return downloadUrl;
  } catch (error) {
    console.error("Firebase Storage Backup upload failed:", error);
    throw error;
  }
};
