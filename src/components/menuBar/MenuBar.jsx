import "./MenuBar.css";
import Home from "../../assests/MenuBarAssests/home.svg";
import Search from "../../assests/MenuBarAssests/search.svg";
import AddPlaylist from "../../assests/MenuBarAssests/addPlaylist.svg";
import AboutMe from "../../assests/MenuBarAssests/aboutMe.svg";
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
            src={Home}
            alt=""
            className="btnOfMenuBar"
          />
        </div>
        <div className="search">
          <img
            onClick={() => updateMenuStateChildVariable(1)}
            src={Search}
            alt=""
            className="btnOfMenuBar"
          />
        </div>
        <div className="addPlaylist">
          <img
            onClick={() => updateMenuStateChildVariable(2)}
            src={AddPlaylist}
            alt=""
            className="btnOfMenuBar"
          />
        </div>
      </div>
      <div className="second bgOfMenuBar">
        <div className="aboutMe">
          <img
            onClick={() => updateMenuStateChildVariable(3)}
            src={AboutMe}
            alt=""
            className="btnOfMenuBar"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
