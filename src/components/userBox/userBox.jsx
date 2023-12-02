import React from "react";
import "./userBox.css";
import PlayButton from "../../assests/playButton.svg";
const UserBox = ({ displayName, followers, Profimage,userSpotifyLink }) => {
  return (
    <div>
      {/* <div className="profile-image">
            <img src="" alt="" />
        </div>
        <div className="go-to-site">

        </div>
        <div className="diaplay-name"></div>
        <div className="followers">
        
        <div className="text-wrapper">{displayName}</div>
        <div className="description-de-la">{followers} Followers</div>
        src={Profimage}
        <img className="play-btn" alt="Play btn" src={PlayButton} />
        </div> */}
      <div className="frame">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="playlist">
              <div className="overlap-group">
                <div className="normal-state" />
                <div className="playlist-wrapper">
                  <div className="text-wrapper">{displayName}</div>
                </div>
                <div className="description-de-la">{followers} Followers</div>
              </div>
            </div>
            <img className="profile-pic" alt="Profile pic" src={Profimage} />
            <a href={userSpotifyLink}><img className="play-btn" id="play-btn"  alt="Play btn" src={PlayButton} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
