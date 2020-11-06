import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewsList = (props) => {
  const reviews = props.reviews?.map((review) => {
    return <ReviewTile key={review.id} review={review} />;
  });

  return <>{reviews}</>;
};

export default ReviewsList;
