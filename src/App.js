import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MNavbar from "./components/navbar/navbar";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getDatabase, set } from "firebase/database";
import UserBox from "./components/userBox/userBox";
import ProfileNan from './assests/profileNaN.svg'

const App = () => {
  //spotify api
  const Client_ID = "7ff122a72d714976b8ad54fbd5022e46";
  const REDIRECT_URI = "https://playlist-spotify-4e18f.firebaseapp.com/";// "http://localhost:3000"; // "https://playlist-spotify-4e18f.firebaseapp.com/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  //Variables
  const [token, setToken] = useState("");
  const [data, setUser] = useState({});
  const [jsonData, setJsonData] = useState(null);
  const [uidArr, setUidArr] = useState([]);

  const [userNameArr, updateUserNameArr] = useState([]);
  const [btnclicked, updatebtnclicked] = useState(false);
  //Firebase

  const firebaseConfig = {
    apiKey: "AIzaSyCtEMb0r2NbVgvRh-BtAfbCRJ_VlbI7V7I",
    authDomain: "playlist-spotify-4e18f.firebaseapp.com",
    projectId: "playlist-spotify-4e18f",
    storageBucket: "playlist-spotify-4e18f.appspot.com",
    messagingSenderId: "1026780401574",
    appId: "1:1026780401574:web:51c91875f0fe48c54ac967",
    measurementId: "G-ZVV9JFYXQ3",
  };
  const app = initializeApp(firebaseConfig);

  const writeToFirebase = (fileJson) => {
    const storage = getStorage();
    const fileRef = ref(storage, "/users.json");
    uploadBytes(fileRef, fileJson).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  // Usage example
  // const newData = { key1: "value1", key2: "value2" };
  // writeToFirebase(newData);

  // update the list if the user is new add it to storage

  useEffect(() => {
    setTimeout(() => {
      if (data && uidArr && jsonData) {
        if (!uidArr.includes(data.id)) {
          console.log("uid not present you can add it\n", data.id);
          const obj = { uid: `${data.id}` };

          jsonData.users.push(obj);
          console.log(jsonData, "\n this is what i need", obj);

          const fileBlobJson = new Blob([JSON.stringify(jsonData, null, 2)], {
            type: "application/json",
          });

          writeToFirebase(fileBlobJson);
        } else {
          console.log("already present", data, "\n", uidArr, "\n", jsonData);
        }
      }
    }, 5000);
  }, [uidArr]);

  useEffect(() => {
    //get the users json from firebase storage
    const storage = getStorage(app);
    const fileRef = ref(storage, "/users.json");
    getDownloadURL(fileRef)
      .then((url) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setJsonData(data);
            makeUidArray(data);
          })
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

  const makeUidArray = (userDataJsonData) => {
    let arr = [];
    console.log(userDataJsonData);
    for (let i = 0; i < userDataJsonData.users.length; i++) {
      arr.push(userDataJsonData.users[i].uid);
    }
    setUidArr(arr);
  };

  //logout -> delete all the data
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUser({});
    window.localStorage.removeItem("user");
  };

  //===================================
  const getUsersInfo = async (uid, e) => {
    let token = window.localStorage.getItem("token");
    console.log("token in Info", token);
    if (token) {
      e = !e ? (e = new Event("dummy")) : e;
      e.preventDefault();

      axios
        .get(`https://api.spotify.com/v1/users/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          // updateUserNameArr([...userNameArr, response.data.display_name]);
          updateUserNameArr((prevArr) => [...prevArr, response.data]);
        });
    }
  };

  const showUsers = async () => {
    updatebtnclicked(true);
    await Promise.all(
      jsonData.users.map(async (user) => {
        await getUsersInfo(user.uid);
      })
    );
  };

  //============================================
  //get user profile data with spotify api
  const getUser = async (e) => {
    let token = window.localStorage.getItem("token");
    console.log("token in getUser", token);
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
      ) : (
        //Main page
        <div>
          <MNavbar
            logout={logout}
            userImg={data.images && data.images[0] ? data.images[0].url : null}
            userName={data.display_name}
          />
          {token ? (
            <div>
              <h1>
                Welcome {data.display_name}
              </h1>
            </div>
          ) : (
            <h2>Please login</h2>
          )}
          {!jsonData ? (
            <h1>Loading</h1>
          ) : (
            <div>
              <button
                className="btn btn-success"
                disabled={btnclicked}
                onClick={showUsers}
              >
                Show Early Users
              </button>
              <div className="d-flex UserCards container" >
              {userNameArr ? (
                userNameArr.map((user, index) => {
                  console.log(userNameArr);
                  return (
                    //users
                    <div className="p-4 m-3 ">
                    
                      <UserBox userSpotifyLink={user.external_urls.spotify} displayName={user.display_name} Profimage={user.images[0] ? user.images[0].url : ProfileNan} followers={user.followers.total} />
                      {/* {" "} */}
                      {/* <img
                        src={user.images[0] ? user.images[0].url : null}
                      ></img>
                      <a href={user.external_urls.spotify} key={index}>
                        
                      </a> */}
                      </div>
                    
                  );
                })
              ) : (
                <h1>No users</h1>
              )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
