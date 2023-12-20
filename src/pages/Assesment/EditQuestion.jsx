import {
  Grid,
  IconButton,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
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
  // state
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  // set initial state values
  useEffect(() => {
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
      // updated data
      const updatedData = {
        title: question,
        catogery: category,
        date: moment().format("DD-MM-YYYY dddd"),
      };

      // update the question
      const response = await axios.put(
        `http://localhost:5000/questions/${row._id}`,
        updatedData
      );

      const updatedQuestion = response.data.question;

      // log to console
      console.log("Updated Question:", updatedQuestion);

      // Close the component and popup Updated.
      CloseEvent();
      Swal.fire("Updated!", "Your question has been updated.", "success").then(
        () => window.location.reload()
      );
    } catch (error) {
      // handle error
      console.error("Error updating question:", error);
    }
  };

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
        <CloseIcon />
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
          <FormControl fullWidth>
            <InputLabel id="standard-select-currency-label">
              Category
            </InputLabel>
            <Select
              labelId="standard-select-currency-label"
              id="standard-select-currency"
              value={category}
              onChange={handleCategory}
              label="Category"
            >
              {modules.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
