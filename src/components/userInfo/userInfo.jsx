import React, { useEffect, useState } from 'react'
import './userInfo.css'
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
import axios from 'axios'
import TrackObj from '../trackObj/TrackObj'
const UserInfo = ({userName,imageProf,playlists,followers,following,token,logout}) => {
    const [tracksData,setTracksData] = useState(null)

    const [tracks,updateTracts] = useState(null);
    const [sliderRef] = useKeenSlider({
        loop: false,
        mode: "free",
       
        slides: {
          perView: 3,
          spacing: 20,
        },
      })

    useEffect(()=>{
        if(tracks){
            getTracksFromplaylists(tracks.href)
        }
    },[tracks])
    const getTracksFromplaylists = async (url,e) => {
        let token = window.localStorage.getItem("token");
        console.log("token in Info", token);
        if (token) {
          e = !e ? (e = new Event("dummy")) : e;
          e.preventDefault();
          axios
            .get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("tracks " , response);
              // updateUserNameArr([...userNameArr, response.data.display_name]);
              // updateUserNameArr((prevArr) => [...prevArr, response.data]);
              setTracksData(response.data);
    
            }).catch((error)=>{
              console.log("this is error",error);
              logout();
              window.location.reload();
            });
        }
      };
    return (
    <div className="bg">
        <div className="profile-section">
            
            
            <img className='Profile-image' src={imageProf} alt="" />
            <div className="div-for-text">
                <div className="profileText">Profile</div>
                
                <div className="userNameText">{userName}</div>
                <div className="followingInfo">
                    <div className="noOfplatlists">{playlists.total} Public Playlists</div>
                    <div className="dot">.</div>
                    <div className="noOfFolloers">{followers} Followers</div>
                    <div className="dot">.</div>
                    <div className="noOfFollowing">{following} Following</div>
                </div>
            </div>
        </div>
        <div className="playlists-section">
            <div className="FollowbtnGroup">
                <div className="followBtn"><p className='followText'>Follow</p></div>
                <div className="threeDots">...</div>
            </div>
            <div className="publicPlaylists">Public Playlists</div>
            <div ref={sliderRef} className="playlist-Object">
            {playlists.items.map((playlist)=>{
                return(
                    <div onClick={function (){tracks ? updateTracts(null) : updateTracts(playlist.tracks)}} className="bg-playlist keen-slider__slide">
                        <img className="img-playlists"
                             src={playlist.images[0].url} alt="" />
                        
                        <div className="playlist-title">{playlist.name}</div>
                        <div className="playlist-owner">{playlist.owner.display_name}</div>
                    </div>
                )
            })}
            </div>
            {/* {tracks && <h1>{tracks.href} {tracks.total}</h1>} */}
            {tracks && tracksData && tracksData.items.map((track,index)=>{
              return <TrackObj trackNum={index+1}  trackName={track.track.name} img={track.track.album.images[0]? track.track.album.images[0].url : null} ablumName={track.track.album.name} artistName={track.track.artists[0].name} />
            })}
            
        </div>


    </div>
  )
}

export default UserInfo