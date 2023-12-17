// import moments for time (npm install moment --save)

import { Grid, IconButton, Typography, Box, Modal, Button } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";
import Swal from "sweetalert2";



const modules = [
    {
      value: 'html',
      label: 'HTML',
    },
    {
      value: 'css',
      label: 'CSS',
    },
    {
      value: 'js',
      label: 'JS',
    },
    {
      value: 'java',
      label: 'JAVA',
    },
  ];

function EditQuestion({ fid, CloseEvent }) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  const handleQuestion = (event)=> {
    setQuestion(event.target.value);
  };

  const handleCategory = (event)=> {
    setCategory(event.target.value);
  };

// //backend code for update the data base with time. make sure edit the whole code.

//   const createData = async()=>{
//     await addDoc(empCollectionRef,{
//         question : question,
//         category : category,
//         date : moment().format('MMMM Do YYYY, h:mm:ss a'),
//     });
//     getUser();
//     CloseEvent();
//                                                                                     After connected the database uncomment the below line.
//      Swal.fire("Submitted!", "Your question has been submitted.","Success");
//   };
    

// create a getUser(); to for update the list in db below this line.

  
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Question
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={CloseEvent}
      >
        <closeIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="Question"
            onChange={handleQuestion}
            variant="standard"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
      </Grid>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="standard-select-currency"
            select
            label="Category"
            onChange={handleCategory}
            helperText="Please select the question type"
            variant="standard"
            sx={{ minWidth: "100%" }}
          >
            {modules.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
            </TextField>
            
        </Grid>
      </Grid>
      <Box height={20} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained">Submit</Button>
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ m: 4 }} />
    </>
  );
}

export default EditQuestion;
