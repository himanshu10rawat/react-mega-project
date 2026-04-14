import config from "./config/config";

function App() {
  console.log("ENV:", config.appwriteUrl);

  return <h1>Blog App with Appwrite</h1>;
}

export default App;
