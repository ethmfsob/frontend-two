// import moments for time (npm install moment --save)

import {
  Grid,
  IconButton,
  Typography,
  Box,
  Modal,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
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

function EditQuestion({ CloseEvent, row }) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Set initial state values
    setQuestion(row.question || "");
    setCategory(row.category || "");
  }, [row]);

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      // Make sure you pass the question ID along with the updated data
      const updatedData = {
        title: question,
        catogery: category,
        date: moment().format("DD-MM-YYYY dddd"),
      };

      // Make an API call to update the question
      const response = await axios.put(
        `http://localhost:5000/questions/${row._id}`,
        updatedData
      );

      // Assuming your backend responds with the updated question
      const updatedQuestion = response.data.question;

      // Handle the updated data as needed
      console.log("Updated Question:", updatedQuestion);

      // Close the modal or perform other actions
      CloseEvent();
      Swal.fire(
        "Submitted!",
        "Your question has been submitted.",
        "Success"
      ).then(() => window.location.reload());
    } catch (error) {
      console.error("Error updating question:", error);
      // Handle error, show an alert, etc.
    }
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
            value={question}
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
            value={category}
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
            <Button variant="contained" onClick={handleUpdate}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}

export default EditQuestion;
