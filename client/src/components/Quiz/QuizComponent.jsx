import React from "react";

function QuizComponent({ questionData }) {
  return (
    <div className="container-fluid">
      <div className="container mt-4">
        <h3 className="p-4 d-flex justify-content-center w-100">
          Quiz - {`${questionData[0].category}`}
        </h3>
        {questionData.map((question, index) => (
          <div key={index} className="row mt-3">
            <div className="row mb-5">
              <h6 className="m-2">
                {`Q${index + 1}.  ${question.question}`}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;(marks -{question.difficulty})
              </h6>
            </div>
            <div className="row">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="col-12 col-sm-12 col-lg-6">
                  <div className="shadow-sm d-flex p-3">
                    <input
                      type="checkbox"
                      name={`option-${index}`}
                      id={`option${optionIndex + 1}`}
                      className="form-check-input mx-2"
                      value={`option${optionIndex + 1}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option${optionIndex + 1}`}
                    >
                      {option}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizComponent;
