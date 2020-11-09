import React from "react";
import BrushIcon from "@material-ui/icons/Brush";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";

const CategoryIcon = (props) => {
  let icon = null;

  if (props.category === "art") {
    icon = <BrushIcon />;
  } else if (props.category === "food") {
    icon = <FastfoodIcon />;
  } else if (props.category === "history") {
    icon = <MenuBookIcon />;
  } else {
    icon = <BlurCircularIcon />;
  }

  return icon;
};

export default CategoryIcon;
