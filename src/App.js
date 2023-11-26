import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MNavbar from "./components/navbar/navbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import usersLoc from "./models/usersJson/users.json";
const App = () => {
  //spotify api
  const Client_ID = "7ff122a72d714976b8ad54fbd5022e46";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";


  //Variables
  const [token, setToken] = useState("");
  const [data, setUser] = useState({});
  const [jsonData, setJsonData] = useState(null);


  //Firebase

  const firebaseConfig = {
    apiKey: "AIzaSyCtEMb0r2NbVgvRh-BtAfbCRJ_VlbI7V7I",
    authDomain: "playlist-spotify-4e18f.firebaseapp.com",
    projectId: "playlist-spotify-4e18f",
    storageBucket: "playlist-spotify-4e18f.appspot.com",
    messagingSenderId: "1026780401574",
    appId: "1:1026780401574:web:51c91875f0fe48c54ac967",
    measurementId: "G-ZVV9JFYXQ3"
  };
  const app = initializeApp(firebaseConfig);

  
  useEffect(() => {
    //get the users json from firebase storage
    const storage = getStorage(app);
    const fileRef = ref(storage, "/users.json");
    getDownloadURL(fileRef)
      .then((url) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => setJsonData(data))
          .catch((error) => console.error("Error fetching JSON:", error));
      })
      .catch((error) => console.error("Error getting download URL:", error));


    //geting the Token from Spotify Api
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);


    //geting user profile Data from spotify api
    let data = window.localStorage.getItem("user");
    if (!data || (Object.keys(data).length === 0 && hash)) {
      getUser();
      data = window.localStorage.getItem("user");
    }
    setUser(JSON.parse(data));
  }, []);

  //logout -> delete all the data
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUser({});
    window.localStorage.removeItem("user");
  };

  //get user profile data with spotify api
  const getUser = async (e) => {
    let token = window.localStorage.getItem("token");
    if (token) {
      console.log("this is ", !token);

      e = !e ? (e = new Event("dummy")) : e;
      e.preventDefault();
      console.log(token);
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
    }
  };


  return (
    <div className="App">
      {!token ? (
        //if token not present // login page
        <div>
          <h1>Spotify React</h1>
          <a
            href={`${AUTH_ENDPOINT}?client_id=${Client_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        </div>
      ) :
      //Main page
       (
        <MNavbar
          logout={logout}
          
          userImg={data.images && data.images[0] ? data.images[0].url : null}
          userName={data.display_name}
        />
      )}




      {token ? (
        <div>
          <h1>
          {/* {console.log(data.images)}
          {console.log(data)} */}
            Welcome {data.display_name} {data.id}{" "}
          </h1>
          <button onClick={getUser}> get user info</button>
        </div>
      ) : (
        // <form onSubmit={searchArtists}>
        //   <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        //   <button type={"submit"}>Search</button>
        // </form>
        <h2>Please login</h2>
      )}

      {
        !jsonData ? (
          <h1>Loading</h1>
        ):
        (
          <div>
      <h1>JSON Data:</h1>
      
      <pre>{console.log(jsonData.users[0].uid)}</pre>
    </div>
        )
      }
    </div>
  );
};

export default App;
