import React from 'react';
import Box from '@mui/material/Box';
import TeacherNav from '../components/TeacherNav';
import TeacherMainNav from "../components/TeacherMainNav";
import QuestionList from './Assesment/QuestionList';

function AddTask() {
  return (
    <div>
        <TeacherMainNav />
      <Box height={70}/>
        <Box sx={{ display: 'flex' }}>
        <TeacherNav/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <QuestionList/>
        </Box>
        
        </Box>
    </div>
  )
}

export default AddTask