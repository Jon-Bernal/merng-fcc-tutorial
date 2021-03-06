import React, { useState } from "react";
import { Menu, Segment, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setactiveItem] = useState(path);

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
          // color="teal"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
            // style={{ color: "teal" }}
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
            // style={{ color: "teal" }}
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
