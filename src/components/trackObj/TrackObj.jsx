import './TrackObj.css'

const TrackObj = ({img,trackNum,trackName,ablumName,artistName}) => {
  return (
    <div>
        <div className="trackObj">
            <div className="firstGroup">

            <div className="trackNo">
                {trackNum}
            </div>
            <img src={img} className='imgTrack' alt="" />
            <div className="labelText">
                <div className="trackName">
                {trackName}
                </div>
                <div className="artistName">
                    {artistName}
                </div>
            </div>
            </div>
            <div className="secondGroup">

            <div className="albumName">
                {ablumName}
            </div>
            </div>
            
            <div className="thirdGroup">

            <div className="threeDots">
                ...
            </div>
            </div>
        </div>
    </div>
  )
}

export default TrackObj