import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CalendarComponent from './components/CalendarComponent';
import DiaryDetailComponent from './components/DiaryDetailComponent';
import EditDiaryComponent from './components/EditDiaryComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import CreateDiaryComponent from './components/CreateDiaryComponent';
import { useAuth } from './context/AuthContext';

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/calendar" element={isAuthenticated ? <CalendarComponent /> : <Navigate to="/login" />} />
                <Route path="/diaries/new" element={isAuthenticated ? <CreateDiaryComponent /> : <Navigate to="/login" />} />
                <Route path="/diaries/:id/edit" element={isAuthenticated ? <EditDiaryComponent /> : <Navigate to="/login" />} />
                <Route path="/diaries/:id" element={isAuthenticated ? <DiaryDetailComponent /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;



