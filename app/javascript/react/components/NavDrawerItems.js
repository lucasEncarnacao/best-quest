import React from "react";
import { List } from "@material-ui/core";
import NavDrawerItem from "./NavDrawerItem";

const NavDrawerItems = (props) => {
  return (
    <List>
      <NavDrawerItem
        text="Home"
        link="/"
        handleDrawerToggle={props.handleDrawerToggle}
      />
      <NavDrawerItem
        text="How to Play"
        link="/how-to-play"
        handleDrawerToggle={props.handleDrawerToggle}
      />
      <NavDrawerItem
        text="Find Quests"
        link="/quests"
        handleDrawerToggle={props.handleDrawerToggle}
      />
      <NavDrawerItem
        text="Create a Quest"
        link="/quests/new"
        handleDrawerToggle={props.handleDrawerToggle}
      />
    </List>
  );
};

export default NavDrawerItems;
