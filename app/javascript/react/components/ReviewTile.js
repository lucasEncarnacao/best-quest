import React from "react";

const ReviewTile = (props) => {
  const rating = props.review.rating;
  const comment = props.review.comment;
  let commentSection = null;

  if (comment !== null && comment !== "") {
    commentSection = <h4>Comment: {comment}</h4>;
  }

  return (
    <div>
      <h4>Rating: {rating}</h4>
      {commentSection}
    </div>
  );
};

export default ReviewTile;
