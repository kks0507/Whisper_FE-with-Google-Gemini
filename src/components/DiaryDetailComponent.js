import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import DeleteConfirmationComponent from './DeleteConfirmationComponent';
import { useAuth } from '../context/AuthContext';
import '../styles/DiaryDetailComponent.css';

const DiaryDetailComponent = () => {
    const { id } = useParams();
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchDiary = async () => {
                try {
                    const response = await api.get(`/diaries/${id}`);
                    setDiary(response.data.data);
                } catch (err) {
                    setError('Failed to fetch diary');
                } finally {
                    setLoading(false);
                }
            };
            fetchDiary();
        } 
    }, [id, isAuthenticated, navigate]);

    const handleDelete = async () => {
        try {
            await api.delete(`/diaries/${id}`);
            navigate('/calendar');
        } catch (err) {
            setError('Failed to delete diary');
        }
    };

    const handleShare = () => {
        alert('Shared successfully');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!diary) return <p>No diary found</p>;

    return (
        <div className="container">
            <button className="btn btn-secondary my-3" onClick={() => navigate('/calendar')}>Home</button>
            <div className="card p-4 shadow">
                <h2>{diary.date}</h2>
                <p>{diary.content}</p>
                <p>{diary.attachment}</p>
                
                <p>{diary.message}</p>
              
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => navigate(`/diaries/${id}/edit`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => setShowModal(true)}>Delete</button>
                    <button className="btn btn-info" onClick={handleShare}>Share</button>
                </div>
            </div>
            <DeleteConfirmationComponent show={showModal} onDelete={handleDelete} onCancel={() => setShowModal(false)} />
        </div>
    );
};

export default DiaryDetailComponent;




