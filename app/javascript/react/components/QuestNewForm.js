import React from "react";

const QuestNewForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Quest Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={props.handleChange}
            value={props.questFields?.name}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            onChange={props.handleChange}
            value={props.questFields?.category}
          >
            <option value=""></option>
            <option value="art">Art</option>
            <option value="history">History</option>
            <option value="food">Food</option>
            <option value="misc">Misc</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Quest Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={props.handleChange}
            value={props.questFields?.description}
          />
        </div>
      </form>
    </div>
  );
};

export default QuestNewForm;
