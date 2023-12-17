import React from "react";
import Box from "@mui/material/Box";
import TeacherNav from "../components/TeacherNav";
import TeacherMainNav from "../components/TeacherMainNav";
import RankingTable from "../charts/RankingTable"



function Studentrank() {
  return (
    <div>
      <TeacherMainNav />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <TeacherNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Ranking</h1>
          <RankingTable/>
        </Box>
      </Box>
    </div>
  );
}

export default Studentrank;
