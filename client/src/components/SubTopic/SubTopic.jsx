import React from "react";
import { useNavigate } from "react-router-dom";

function SubTopic({ data }) {
  const navigate = useNavigate();

  const handleRowClick = (language, category) => {
    navigate(`/quiz/${language}/${category}`);
  };

  return (
    <div className="p-4">
      <h4 className="mb-4 py-3">
        Test Series (Based on user language preference)
      </h4>
      <table className="table mt-4" id="resultTable">
        <thead>
          <tr>
            <th scope="col">SR.NO.</th>
            <th scope="col">Topic Name</th>
            <th scope="col">Language Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((question, index) => {
            console.log(question);
            return (
              <tr
                key={index}
                onClick={() =>
                  handleRowClick(question.language, question.category)
                }
                style={{ cursor: "pointer" }}
              >
                <td scope="row">
                  <h6 className="p-2">{index + 1}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2 text-capitalize">{question.category}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2 text-capitalize">{question.language}</h6>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SubTopic;
