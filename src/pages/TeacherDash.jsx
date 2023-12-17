import React from "react";
import Box from "@mui/material/Box";
import TeacherNav from "../components/TeacherNav";
import TeacherMainNav from "../components/TeacherMainNav";
import Paper from "@mui/material/Paper";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BarChart from "../charts/BarChart";
import QuestionTable from "../charts/QuestionTable";
import { Stack } from "@mui/material";
import PieChart from "../charts/Piechart"
import TodayTask from "../charts/TodayTask";


function Teacherdash() {
    const myStyles = {
        color: 'blue',
        fontSize: '16px',
        backgroundColor: '#eee',
        padding: '0%',
        borderRadius: '5px',
      };
  return (
    <div>
      <TeacherMainNav />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <TeacherNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Stack spacing={2} direction= "column" gridColumn="span 8">
            <Box>
              <Card sx={{ maxWidth: 'auto', maxHeight: '450' }}>
                  <CardContent>
                    <BarChart/>
                  </CardContent>
              </Card>
            </Box>
            <Box>
            <Card sx={{ maxWidth: 'auto', maxHeight: '450' }}>
                  <CardContent>
                    <TodayTask/>
                  </CardContent>
              </Card>
            </Box>
            </Stack>
            <Stack spacing={2} gridColumn="span 4">
            <Box>
            <Card sx={{ maxWidth: '100%'}}>
                  <CardContent style={myStyles}>
                    <QuestionTable/>
                  </CardContent>
              </Card>
            </Box>
            <Box>
            <Card sx={{ maxWidth: 'auto'}}>
                  <CardContent style={myStyles}>
                    <PieChart/>
                  </CardContent>
              </Card>
            </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Teacherdash;
