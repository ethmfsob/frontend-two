// import moments for time (npm install moment --save)

import {
  Grid,
  IconButton,
  Typography,
  Box,
  Modal,
  Button,
} from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";

const modules = [
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "css",
    label: "CSS",
  },
  {
    value: "js",
    label: "JS",
  },
  {
    value: "java",
    label: "JAVA",
  },
];

function AddQuestion({ CloseEvent }) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  // create a getUser(); to for update the list in db below this line. and call getUser(); inside createData function before close event

  const createData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/questions", {
        title: question,
        catogery: category,
        date: moment().format("DD-MM-YYYY dddd"),
      });

      // Handle the response or update state accordingly
      console.log(response.data.question);
      // close the component
      CloseEvent();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Question
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
            <Button variant="contained" onClick={createData}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ m: 4 }} />
    </>
  );
}

export default AddQuestion;
