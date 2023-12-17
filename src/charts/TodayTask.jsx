import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import moment from 'moment';

const TodaysTasksTable = ({ tasks }) => {
    const currentMoment = moment();
  
    const todayTasks = tasks
      .filter(task => {
        const dueTime = task.postedAt.clone().add(24, 'hours');
        return currentMoment.isBefore(dueTime); // Exclude tasks posted more than 24 hours ago
      })
      .map(task => {
        const hoursRemaining = Math.max(0, 24 - currentMoment.diff(task.postedAt, 'hours'));
        const remainingTime = hoursRemaining > 0 ? `${hoursRemaining} hours` : 'Now';
  
        return {
          ...task,
          remainingTime,
        };
      });
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Posted At</TableCell>
            <TableCell>Remaining Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todayTasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.question}</TableCell>
              <TableCell>{task.postedAt.format('MMMM D, YYYY h:mm A')}</TableCell>
              <TableCell>{task.remainingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TodayTask = () => {
  const taskData = [
    {question: 'Question 1', postedAt: moment().subtract(12, 'hours') }, // Within 12 hours
    {question: 'Question 2', postedAt: moment().subtract(22, 'hours') }, // More than 24 hours ago
    {question: 'Question 3', postedAt: moment().subtract(6, 'hours') }, // Within 6 hours
    {question: 'Question 4', postedAt: moment().subtract(25, 'hours') }, // More than 24 hours ago
  ];

  return (
    <div>
      <h2>Today's Questions</h2>
      <TodaysTasksTable tasks={taskData} />
    </div>
  );
};

export default TodayTask;
