import React from "react";

function SubTopic({ data }) {
  return (
    <div className="p-4">
      <table className="table mt-4" id="resultTable">
        <thead>
          <tr>
            <th scope="col">Topic Name</th>
            <th scope="col">Language Name</th>
            <th scope="col">Full Marks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((question, index) => {
            return (
              <tr key={index} onClick="clickHandler()">
                <td scope="row">
                  <h6 className="p-2">{question.category}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2">{question.language}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2">20</h6>
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
