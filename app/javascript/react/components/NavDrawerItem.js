import React from "react";
import { Divider, ListItem, ListItemText } from "@material-ui/core/";
import { Link as RouterLink } from "react-router-dom";

const NavDrawerItem = (props) => {
  return (
    <>
      <ListItem
        button
        component={RouterLink}
        to={props.link}
        onClick={props.handleDrawerToggle}
      >
        <ListItemText primary={props.text} />
      </ListItem>
      <Divider />
    </>
  );
};

export default NavDrawerItem;
