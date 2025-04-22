import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "profile-images"); // Ensure this matches your preset in Cloudinary

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/davf9ozxn/image/upload",
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Error uploading to Cloudinary:",
      error.response?.data || error.message
    );
    throw error;
  }
};
