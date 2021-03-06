import React from "react";
import art from "../../../../assets/images/icons/art.png";
import food from "../../../../assets/images/icons/food.png";
import history from "../../../../assets/images/icons/history.png";
import misc from "../../../../assets/images/icons/misc.png";

const CategoryIcon = (props) => {
  let icon = null;
  let size = 35;

  if (props.size === "small") {
    size = 35;
  } else if (props.size === "medium") {
    size = 70;
  } else if (props.size === "large") {
    size = 150;
  }

  if (props.category === "art") {
    icon = <img style={{ height: size }} src={art} alt="art icon" />;
  } else if (props.category === "food") {
    icon = <img style={{ height: size }} src={food} alt="food icon" />;
  } else if (props.category === "history") {
    icon = <img style={{ height: size }} src={history} alt="history icon" />;
  } else {
    icon = <img style={{ height: size }} src={misc} alt="misc icon" />;
  }

  return icon;
};

export default CategoryIcon;
