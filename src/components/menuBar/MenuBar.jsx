import "./MenuBar.css";
import Home from "../../assests/MenuBarAssests/home.svg";
import HomeFilled from "../../assests/MenuBarAssests/homeFilled.svg";
import Search from "../../assests/MenuBarAssests/search.svg";
import SearchFilled from "../../assests/MenuBarAssests/searchFilled.svg";
import AddPlaylist from "../../assests/MenuBarAssests/addPlaylist.svg";
import AddPlaylistFilled from "../../assests/MenuBarAssests/addPlaylistFilled.svg";
import AboutMe from "../../assests/MenuBarAssests/aboutMe.svg";
import AboutMeFilled from "../../assests/MenuBarAssests/aboutMeFilled.svg";
import { useEffect, useState } from "react";

const MenuBar = ({ updateMenuState }) => {
  const [menustateChildVariable, updateMenuStateChildVariable] = useState(0);

  const updateTheParentMenuState = () => {
    updateMenuState(menustateChildVariable);
  };

  useEffect(() => {
    updateTheParentMenuState();
  }, [menustateChildVariable]);

  return (
    <div>
      <div className="first bgOfMenuBar">
        <div className="home">
          <img
            onClick={() => updateMenuStateChildVariable(0)}
            src={menustateChildVariable==0? HomeFilled : Home}
            alt=""
            className="btnOfMenuBar"
          />
        </div>
        <div className="search">
          <img
            onClick={() => updateMenuStateChildVariable(1)}
            src={menustateChildVariable==1? SearchFilled : Search}
            
            alt=""
            className="btnOfMenuBar"
          />
        </div>
        <div className="addPlaylist">
          <img
            onClick={() => updateMenuStateChildVariable(2)}
            src={menustateChildVariable==2? AddPlaylistFilled : AddPlaylist}
            
            alt=""
            className="btnOfMenuBar"
          />
        </div>
      </div>
      <div className="second bgOfMenuBar">
        <div className="aboutMe">
          <img
            onClick={() => updateMenuStateChildVariable(3)}
            src={menustateChildVariable==3? AboutMeFilled : AboutMe}
           
            alt=""
            className="btnOfMenuBar"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
