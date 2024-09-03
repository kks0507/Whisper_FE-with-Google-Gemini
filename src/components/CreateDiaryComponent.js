import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import '../styles/CreateDiaryComponent.css';

const CreateDiaryComponent = () => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const date = new URLSearchParams(location.search).get('date');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const formData = new FormData();
            const diary = { date, content };
            formData.append('diary', new Blob([JSON.stringify(diary)], { type: 'application/json' }));
            if (file) formData.append('file', file);
            const response = await api.post('/diaries', formData);
            if (response.status === 201) {
                navigate('/calendar');
            } else {
                setError('Diary creation failed');
            }
        } catch (err) {
            console.error(err);
            setError('Diary creation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <div className="container">
            <h2>Create Diary</h2>
            <form className="diary-form" onSubmit={handleCreate}>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="text" className="form-control" value={date} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div className="mb-3 attachment-section">
                    <label className="form-label">Attachment</label>
                    <input type="file" className="form-control" onChange={handleFileChange} ref={fileInputRef} />
                    {file && (
                        <button type="button" className="remove-file-button" onClick={handleRemoveFile}>
                            &times;
                        </button>
                    )}
                </div>
                <div className="button-group">
                    <button type="button" className="btn-secondary" onClick={() => navigate('/calendar')}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
                {error && <p className="text-danger mt-3">{error}</p>}
            </form>
        </div>
    );
};

export default CreateDiaryComponent;






