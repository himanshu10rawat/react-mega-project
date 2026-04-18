const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteProjectName: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
  tinyApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

// Validate that all required environment variables are set
const requiredEnvVars = [
  "appwriteUrl",
  "appwriteProjectId",
  "appwriteDatabaseId",
  "appwriteCollectionId",
  "appwriteBucketId",
  "tinyApiKey",
];

const missingEnvVars = requiredEnvVars.filter(
  (key) => !config[key] || config[key] === "undefined",
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}. Please check your .env file.`,
  );
}

export default config;
