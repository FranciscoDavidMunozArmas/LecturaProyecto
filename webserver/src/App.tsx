import React from 'react';
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

const styles = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*"  element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </>
  );
}

export default App;
