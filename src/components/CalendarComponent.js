import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/CalendarComponent.css';

const CalendarComponent = () => {
    const [diaries, setDiaries] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchDiaries = async () => {
                try {
                    const response = await api.get('/diaries');
                    setDiaries(response.data.data);
                } catch (error) {
                    console.error('Error fetching diaries:', error);
                }
            };
            fetchDiaries();
        } 
    }, [currentMonth, currentYear, isAuthenticated]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDayClick = (day, isCurrentMonth = true) => {
        if (!isCurrentMonth) return; // 현재 달의 날짜만 클릭 가능하도록 설정

        const date = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const diary = diaries.find(d => d.date === date);
        if (diary) {
            navigate(`/diaries/${diary.id}`);
        } else {
            navigate(`/diaries/new?date=${date}`);
        }
    };

    const renderDays = () => {
        const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        const days = [];

        // 이전 달의 날짜 추가
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push(
                <div key={`prev-${i}`} className="calendar-day prev-month">
                    <span>{daysInPrevMonth - i}</span>
                </div>
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const diary = diaries.find(d => d.date === date);
            days.push(
                <div key={day} onClick={() => handleDayClick(day)} className={`calendar-day ${diary ? 'selected' : ''}`}>
                    <span>{day}</span>
                   
                </div>
            );
        }

        // 다음 달의 날짜 추가
        const totalCells = firstDayOfMonth + daysInMonth;
        const emptyCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 1; i <= emptyCells; i++) {
            days.push(
                <div key={`next-${i}`} className="calendar-day next-month">
                    <span>{i}</span>
                </div>
            );
        }

        return days;
    };

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="app-container">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button className="prev-month" onClick={handlePrevMonth}>&lt;</button>
                    <h2>{`${currentYear} ${String(currentMonth).padStart(2, '0')}`}</h2>
                    <button className="next-month" onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="calendar-grid">
                    <div className="day">SUN</div>
                    <div className="day">MON</div>
                    <div className="day">TUE</div>
                    <div className="day">WED</div>
                    <div className="day">THU</div>
                    <div className="day">FRI</div>
                    <div className="day">SAT</div>
                    {renderDays()}
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>log out</button>
        </div>
    );
};

export default CalendarComponent;














