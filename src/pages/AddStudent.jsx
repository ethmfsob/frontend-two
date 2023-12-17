import React from "react";
import Box from "@mui/material/Box";
import TeacherNav from "../components/TeacherNav";
import TeacherMainNav from "../components/TeacherMainNav";
import AddStudentPage from "../charts/AddStudentPage"

function Addstudent() {
  return (
    <div>
      <TeacherMainNav />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <TeacherNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Add Student</h1>
          <AddStudentPage/>
        </Box>
      </Box>
    </div>
  );
}

export default Addstudent;
