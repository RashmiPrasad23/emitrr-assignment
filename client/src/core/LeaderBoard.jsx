import React from 'react'
import LeaderBoardComponent from '../components/LeaderBoard/LeaderBoardComponent'


const studentsData=[
    {
        name:"rashmi",
        marks:"12",
        subject:"c++"
    },
    {
        name:"naman",
        marks:"10",
        subject:"c++"
    },
    {
        name:"sucheta",
        marks:"21",
        subject:"java"
    }

]
function LeaderBoard() {
  return (
   <LeaderBoardComponent students={studentsData} />
  )
}

export default LeaderBoard