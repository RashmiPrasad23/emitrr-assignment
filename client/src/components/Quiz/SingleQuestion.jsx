import React from "react";

// component for single quiz question design
const SingleQuestion = ({ key, question, index, onChange }) => {
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div key={index} className="row my-3">
      <div className="row mb-5">
        <h6 className="m-2">
          {`Q${index + 1}.  ${question.question}`} &nbsp;&nbsp;&nbsp;&nbsp;(
          marks / difficulty - {question.difficulty})
        </h6>
      </div>
      <div className="row">
        <div className="col-12">
          {/* mapping all the question option */}
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="shadow-sm p-3">
              <input
                type="radio"
                name={`option-${index}`}
                id={`option${optionIndex}`}
                className="form-check-input mx-2"
                value={option}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label"
                htmlFor={`option${optionIndex}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
