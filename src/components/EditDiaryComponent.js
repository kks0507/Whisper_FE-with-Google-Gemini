import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import '../styles/EditDiaryComponent.css';

const EditDiaryComponent = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchDiary = async () => {
                try {
                    const response = await api.get(`/diaries/${id}`);
                    setContent(response.data.data.content);
                } catch (err) {
                    setError('Failed to fetch diary');
                }
            };
            fetchDiary();
        }
    }, [id, isAuthenticated, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('diary', new Blob([JSON.stringify({ content })], { type: 'application/json' }));
            if (file) formData.append('file', file);
            await api.put(`/diaries/${id}`, formData);
            navigate(`/diaries/${id}`);
        } catch (err) {
            setError('Diary update failed');
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
            <h2>Edit Diary</h2>
            <form className="diary-form" onSubmit={handleUpdate}>
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
                    <button type="button" className="btn-secondary" onClick={() => navigate(`/diaries/${id}`)}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
                {error && <p className="text-danger mt-3">{error}</p>}
            </form>
        </div>
    );
};

export default EditDiaryComponent;








