import React from 'react'
import './userInfo.css'
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
const UserInfo = ({userName,imageProf,playlists,followers,following}) => {
  
    const [sliderRef] = useKeenSlider({
        loop: false,
        mode: "free",
       
        slides: {
          perView: 3,
          spacing: 20,
        },
      })
  
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
                    <div className="bg-playlist keen-slider__slide">
                        <img className="img-playlists"
                             src={playlist.images[0].url} alt="" />
                        
                        <div className="playlist-title">{playlist.name}</div>
                        <div className="playlist-owner">{playlist.owner.display_name}</div>
                    </div>
                )
            })}
            </div>
            
            
        </div>
    </div>
  )
}

export default UserInfo