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

// function EditQuestion({ fid, CloseEvent }) {
//   const [question, setQuestion] = useState("");
//   const [category, setCategory] = useState("");

//   const handleQuestion = (event) => {
//     setQuestion(event.target.value);
//   };

//   const handleCategory = (event) => {
//     setCategory(event.target.value);
//   };

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
// const handleUpdateQuestion = async () => {
//   try {
//     // Assuming fid is the question ID and you are sending the updated data to the server
//     const response = await axios.put(
//       `http://localhost:5000/questions/${_id}`,
//       {
//         title: question,
//         catogery: category,
//         date: moment().format("DD-MM-YYYY dddd"),
//       }
//     );

//     // Assuming the server responds with the updated question data
//     const updatedQuestion = response.data;

//     Swal.fire({
//       title: "Question Updated!",
//       text: `New Question: ${updatedQuestion.question}, New Category: ${updatedQuestion.category}`,
//       icon: "success",
//     });

//     // Close the modal or perform any other necessary actions
//     CloseEvent();
//   } catch (error) {
//     console.error("Error updating question on the client side:", error);
//     // Handle the error, show a message to the user, or perform other error-related tasks
//   }
// };
// const [updateForm, setUpdateForm] = useState({
//   _id: null,
//   title: "",
//   catogery: "",
//   date: "",
// });
// const handleUpdateFieldChange = (e) => {
//   const { value, name } = e.target;
//   setUpdateForm({
//     ...updateForm,
//     [name]: value,
//   });
// };
//////////////////////////////
// const updateQuestion = async () => {
//   try {
//     const response = await axios.put(
//       `http://localhost:5000/questions/${fid}`,
//       {
//         title: question,
//         catogery: category,
//         date: moment().format("DD-MM-YYYY dddd"),
//       }
//     );

//     const { message, updatedQuestion } = response.data;

//     // Display a simple alert message
//     alert(message);

//     // Close the modal or perform any other necessary actions
//     CloseEvent();
//   } catch (error) {
//     console.error("Error updating question on the client side:", error);
//     // Handle the error, show a message to the user, or perform other error-related tasks
//   }
// };
// const updateQuestion = async () => {
//   try {
//     const response = await axios.put("http://localhost:5000/questions", {
//       title: question,
//       catogery: category,
//       date: moment().format("DD-MM-YYYY dddd"),
//     });

//     // Handle the response or update state accordingly
//     console.log(response.data.question);
//     // close the component
//     CloseEvent();
//     window.location.reload();
//   } catch (error) {
//     console.error("Error creating data:", error);
//   }
// };

const EditQuestion = ({ CloseEvent, formData }) => {
  const [question, setQuestion] = useState(formData.title || "");
  const [category, setCategory] = useState(formData.category || "");
  console.log(questionId);

  useEffect(() => {
    // Fetch the question details based on the questionId
    const fetchQuestionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/questions/${questionId}`
        );
        const questionData = response.data.question;

        // Set the state with the fetched question details
        setQuestion(questionData.title);
        setCategory(questionData.catogery);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleQuestionUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/questions/${questionId}`,
        {
          title: question,
          catogery: category,
          date: moment().format("DD-MM-YYYY dddd"),
        }
      );

      const updatedQuestion = response.data.question;

      Swal.fire({
        title: "Question Updated!",
        text: `New Question: ${updatedQuestion.title}, New Category: ${updatedQuestion.catogery}`,
        icon: "success",
      });

      // Close the modal or perform any other necessary actions
      CloseEvent();
    } catch (error) {
      console.error("Error updating question:", error);
      // Handle the error, show a message to the user, or perform other error-related tasks
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
        <closeIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="Question"
            // onChange={handleQuestion}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
            // onChange={handleCategory}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            <Button variant="contained" onClick={handleQuestionUpdate}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ m: 4 }} />
    </>
  );
};

export default EditQuestion;
