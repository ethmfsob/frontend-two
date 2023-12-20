import {
  Grid,
  IconButton,
  Typography,
  Box,
  Button,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import React from "react";
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

function AddQuestion({ CloseEvent }) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  // create question
  const createData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/questions", {
        title: question,
        catogery: category,
        date: moment().format("DD-MM-YYYY dddd"),
      });

      // log to console
      console.log(response.data.question);

      // close the component and popup submitted!
      CloseEvent();
      Swal.fire(
        "Submitted!",
        "Your question has been submitted.",
        "success"
      ).then(() => {
        window.location.reload();
      });
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
        <CloseIcon />
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
