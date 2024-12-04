import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <main className="error-page">
            <h1 className="error-title">✈️404 Boarding Pass Not Found✈️</h1>
            <p className="error-message">Looks like this page took a detour and got lost! 🗺️ Don't worry, let's get you back on track.
            </p>
            <Link to="/" className="error-button">📍Re-Route Back Home</Link>
        </main>
    );
}

export default ErrorPage;