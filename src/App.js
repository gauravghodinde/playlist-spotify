import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MNavbar from "./components/navbar/navbar";
import { type } from "@testing-library/user-event/dist/type";

const App = () => {
  const Client_ID = "7ff122a72d714976b8ad54fbd5022e46";
  // const Client_Secret = 'd67dcf34e8ec495893b200411eeb8684'
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  const [data, setUser] = useState({});

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

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
    
    let data = window.localStorage.getItem("user");
    if (!data || Object.keys(data).length === 0  && hash) {
      // console.log("this is data",{}, "fdfdfd", data)
      getUser()
      data = window.localStorage.getItem("user");
    }
    setUser(JSON.parse(data));
  }, []);
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUser({});
    window.localStorage.removeItem("user");
  };

  const getUser = async (e) => {
    let token = window.localStorage.getItem("token");
    if(token){
      console.log("this is ",!token)
    
    e = !e ? e = new Event('dummy') : e
    e.preventDefault();
    console.log(token);
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.localStorage.setItem("user", JSON.stringify(data));
    window.location.reload()
  }
  };
  return (
    <div className="App">
      {!token ? (
        <div>
          <h1>Spotify React</h1>
          <a
            href={`${AUTH_ENDPOINT}?client_id=${Client_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        </div>
      ) : (
        // ) : (
        //   <button onClick={logout}>Logout</button>
        // )
<MNavbar
  logout={logout}
  userImg={data.images && data.images[0] ? data.images[0].url : null}
  userName={data.display_name}
/>      )}

      {/* {token? : console.log("usernotfound")} */}
      {token ? (
        <div>
          <h1>Welcome {data.display_name} {data.id} </h1>
          <button onClick={getUser}> get user info</button>
        </div>
      ) : (
        // <form onSubmit={searchArtists}>
        //   <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        //   <button type={"submit"}>Search</button>
        // </form>
        <h2>Please login</h2>
      )}
    </div>
  );
};

export default App;
