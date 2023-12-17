import React from 'react';
import { Card, CardContent, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';


// Sample data for the table
const tableData = [
  { Status: 'Total Student', Number: 25 },
  { Status: 'Submitted', Number: 30 },
  { Status: 'Pending', Number: 28},
];

// Create the dynamic table component
const DynamicTable = ({ data }) => {
    const myStyles = {
        color: 'blue',
        fontSize: '16px',
        backgroundColor: '#eee',
        padding: '0%',
        borderRadius: '5px',
      };
  return (
    <TableContainer component={Paper}>
      <Table style={myStyles}>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.Status}</TableCell>
              <TableCell>{row.Number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Create the main component with the card and dynamic table
const QuestionTable = () => {
  return (
    <Card>
      <CardContent>
        <h2>Student Status</h2>
        <DynamicTable data={tableData} />
      </CardContent>
    </Card>
  );
};

export default QuestionTable;