import React, { useState } from 'react';
// import { styles } from './libs/styles';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Paper } from "@mui/material";
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Appmain from './pages/Appmain';
import LoadingContainer from './components/LoadingContainer';
import { PATH_TEACHER } from './libs/utils';
import TeacherPage from './pages/TeacherPage';

const styles = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflowY: "hidden" as const,
  overflowX: "hidden" as const
}

function App() {

  return (
    <>
      <Paper
        color="inherit"
        elevation={3}
        style={styles}
        square>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/earlearning/*" element={<Appmain />} />
            <Route path="/teacher/*" element={<TeacherPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </>
  );
}

export default App;
