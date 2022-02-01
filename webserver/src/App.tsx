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
import { PATH_EARLEANING, PATH_LOGIN, PATH_REGISTER, PATH_TEACHER } from './libs/utils';
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
            <Route path={`${PATH_LOGIN}`} element={<LoginPage />} />
            <Route path={`${PATH_EARLEANING}/*`} element={<Appmain />} />
            <Route path={`${PATH_TEACHER}`} element={<TeacherPage />} />
            <Route path={`${PATH_REGISTER}`} element={<RegisterPage />} />
            <Route path="*" element={<Navigate to={`${PATH_LOGIN}`} />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </>
  );
}

export default App;
