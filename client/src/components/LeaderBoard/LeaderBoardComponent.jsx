import React from 'react'


const LeaderBoardComponent = ({ students }) => {

  const sortedStudents = [...students].sort((a, b) => b.marks - a.marks);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.marks}</td>
              <td>{student.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardComponent;
