import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

const StudentRankingTable = ({ students }) => {
  const columns = [
    { id: 'rank', label: 'Rank', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'questionsSolved', label: 'Questions Solved', minWidth: 150, align: 'right' },
  ];

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('questionsSolved');

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Assign ranks based on the number of questions solved
  const rankedStudents = students
    .map((student) => ({ ...student }))
    .sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    })
    .map((student, index) => ({ ...student, rank: index + 1 }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.id === 'questionsSolved' ? (
                    <TableSortLabel
                      active={orderBy === 'questionsSolved'}
                      direction={orderBy === 'questionsSolved' ? order : 'asc'}
                      onClick={() => handleSortRequest('questionsSolved')}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rankedStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof student[column.id] === 'number'
                        ? column.format(student[column.id])
                        : student[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rankedStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const studentsData = [
  { name: 'John Doe', questionsSolved: 25 },
  { name: 'Jane Smith', questionsSolved: 30 },
  { name: 'Bob Johnson', questionsSolved: 20 },
  // Add more student data as needed
];

export default function App() {
  return (
    <div>
      <h2>Current Student Ranking</h2>
      <StudentRankingTable students={studentsData} />
    </div>
  );
}
