import React, { useState } from "react";
import RatingRadioGroup from "./RatingRadioGroup";

const QuestCompleteView = (props) => {
  const [formFields, setFormFields] = useState({
    rating: "3",
    comment: "",
  });

  const handleFieldChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayload = { review: formFields };
    props.addNewReview(formPayload);
  };

  return (
    <div>
      <h1>You did it!</h1>
      <h2>Final time {props.completionTime}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">
          <h5>Rating:</h5>
        </label>
        <div id="rating">
          <RatingRadioGroup
            handleFieldChange={handleFieldChange}
            state={formFields.rating}
          />
        </div>

        <label htmlFor="comment">
          <h5>Comment:</h5>
        </label>
        <input
          type="text"
          id="comment"
          name="comment"
          onChange={handleFieldChange}
          value={formFields.comment}
        />

        <input type="submit" value="Add Review" />
      </form>
    </div>
  );
};

export default QuestCompleteView;
