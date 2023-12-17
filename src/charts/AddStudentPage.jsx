import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import swal from 'sweetalert2';

const AddStudentPage = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    const requiredFields = Object.keys(studentInfo);
    const isAnyFieldEmpty = requiredFields.some((field) => !studentInfo[field]);

    if (isAnyFieldEmpty) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    swal.fire({
      icon: 'success',
      title: 'Student Added!',
      html: requiredFields.map((field) => `${field}: ${studentInfo[field]}<br>`).join(''),
    });

    setStudentInfo(Object.fromEntries(requiredFields.map((field) => [field, ''])));
  };

  const formConfig = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
  ];

  const buttonStyles = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Card>
        <CardContent>
          {formConfig.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              fullWidth
              margin="normal"
              name={field.name}
              type={field.type}
              value={studentInfo[field.name]}
              onChange={handleChange}
              required
            />
          ))}
          <Button variant="contained" color="primary" style={buttonStyles} onClick={handleAddStudent}>
            Add Student
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddStudentPage;
