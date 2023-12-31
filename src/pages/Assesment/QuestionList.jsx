// import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import axios from "axios";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { id: "question", label: "question", minWidth: 170 },
  { id: "category", label: "category", minWidth: 100 },
  {
    id: "date",
    label: "date",
    minWidth: 170,

    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(_id, question, category, date, action) {
  return { _id, question, category, date, action };
}

export default function QuestionList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const [editRowData, setEditRowData] = useState(null);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch questions from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/questions");
        const questions = response.data.questions;
        // console.log(questions);

        // Create rows using the createData function
        const newRows = questions.map((question) =>
          createData(
            question._id,
            question.title,
            question.catogery,
            question.date
          )
        );

        // Update the rows state
        setRows(newRows);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  // delete question
  const deleteUser = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        // delete the question
        const res = await axios.delete(
          `http://localhost:5000/questions/${_id}`
        );
        console.log(res);
        // update state
        const newQuestions = [...rows].filter((question) => {
          return question._id !== _id;
        });

        // set notes
        setRows(newQuestions);
      }
    });
  };

  ///////////////////////////////////////////////////////
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  ////////////////////////////////////////////////////////

  const editData = async (row) => {
    setEditRowData(row);
    handleEditOpen();
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddQuestion CloseEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditQuestion CloseEvent={handleEditClose} row={editRowData} />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Add Questions
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" margin={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            // onChange={(e, v) => filterData(v)}
            getOptionLabel={(rows) => rows.n || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Products" />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={handleOpen}
          >
            Add
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ minWidth: "20px", maxWidth: "40px" }}
                >
                  Sl no.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Question
                </TableCell>
                <TableCell
                  align="left"
                  style={{ minWidth: "50px", maxWidth: "60px" }}
                >
                  Category
                </TableCell>
                <TableCell align="left" style={{ minWidth: "10px" }}>
                  Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "60px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const serialNumber = index + 1;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell align="left">{serialNumber}</TableCell>
                      <TableCell align={"left"}>{row.question}</TableCell>
                      <TableCell align={"left"}>{row.category}</TableCell>
                      <TableCell align={"left"}>{row.date}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => editData(row)}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteUser(row._id);
                            }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </>
  );
}
