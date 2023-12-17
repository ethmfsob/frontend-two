// full backend work is their, and searchbar , db connect and other activity.


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Divider from "@mui/material/Divider";
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const columns = [
  { id: 'question', label: 'question', minWidth: 170 },
  { id: 'category', label: 'category', minWidth: 100 },
  {
    id: 'date',
    label: 'date',
    minWidth: 170,

    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(question, category, date, action) {
  return { question, category, date, action};
}

const rows = [
  createData('India', 'IN', 1324171354),
  createData('China', 'CN', 1403500365),
  createData('Italy', 'IT', 60483973),
];

export default function QuestionList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
                                                     //install sweetalert2
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        // deleteApi(id);
      }
    });
  };

  // need to create filterdata for search bar.

  const editData = (id,question,category)=>{
    const data = {
        id: id,
        category: category
    };
    // for updating the data in the db
    // setQuestionid(data); 
    handleEditOpen();
  }

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
          <AddQuestion CloseEvent={handleClose}/>
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditQuestion CloseEvent={handleEditClose} />
        </Box>
      </Modal>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
          sx={{ width: 300}}
          
        //   onChange={(e, v) => filterData(v)}
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
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
          Add
        </Button>
      </Stack>
      <Box height={10} />
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
      <TableRow>
            <TableCell align="left" style={{ minWidth: "100px" }}>
                Question
            </TableCell>
            <TableCell align="left" style={{ minWidth: "100px" }}>
                Category
            </TableCell>
            <TableCell align="left" style={{ minWidth: "100px" }}>
                Date
            </TableCell>
            <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
            </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.category}>
                    <TableCell key={row.id} align={"left"}>
                      {row.question}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.category}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.date}
                    </TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => editData(row.id, row.question, row.category )}

                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            deleteUser(row.id);
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
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</Paper>
    </>
    
  );
}
