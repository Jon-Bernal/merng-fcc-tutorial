import React, { useState } from "react";
import { Menu, Segment, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const [activeItem, setactiveItem] = useState("home");
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);

  function handleItemClick(e, { name }) {
    setactiveItem(name);
  }

  return (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
      {/* 
      <Segment>
        <img src="/images/wireframe/media-paragraph.png" />
      </Segment> */}
    </div>
  );
};

export default MenuBar;
