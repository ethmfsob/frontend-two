import "./App.css";
import TeacherNav from "./components/TeacherNav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TeacherDash from "./pages/TeacherDash";
import Addtask from "./pages/AddTask";
import StudentRank from "./pages/StudentRank";
import AddStudent from "./pages/AddStudent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<TeacherDash />}></Route>
          <Route path="/addtask" exact element={<Addtask />}></Route>
          <Route path="/studentrank" exact element={<StudentRank />}></Route>
          <Route path="/addstudent" exact element={<AddStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
