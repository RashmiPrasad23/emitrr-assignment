import React, { useState } from "react";

const LeaderBoardComponent = ({ score }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // Separate students based on language
  const studentsByLanguage = score.reduce((acc, student) => {
    acc[student.language] = acc[student.language] || [];
    acc[student.language].push(student);
    return acc;
  }, {});

  // Filter students based on selected language
  const filteredStudents =
    selectedLanguage === "All"
      ? score
      : studentsByLanguage[selectedLanguage] || [];

  // Sort and select top 10
  const top10 = filteredStudents
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 10);

  const languageOptions = ["All", ...Object.keys(studentsByLanguage)];

  return (
    <div className="container">
      <div className="p-4 ">
        <div className="d-flex justify-content-between align-items-center shadow-sm">
          <h2 className="pb-2">Leaderboard</h2>
          <div className="mb-4">
            <label htmlFor="languageSelect" className="mr-2">
              Select Language:
            </label>
            <select
              id="languageSelect"
              onChange={(e) => setSelectedLanguage(e.target.value)}
              value={selectedLanguage}
            >
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="table mt-4" id="resultTable">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Points</th>
              <th scope="col">Language</th>
            </tr>
          </thead>
          <tbody>
            {top10.map((student, index) => (
              <tr key={index}>
                <td scope="row">
                  <h6 className="p-2">{index + 1}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2">{student.userName}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2">{student.totalPoints}</h6>
                </td>
                <td scope="row">
                  <h6 className="p-2 text-capitalize">{student.language}</h6>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoardComponent;
