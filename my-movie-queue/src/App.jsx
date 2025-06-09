import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [yourRating, setYourRating] = useState(5);
  const [hisRating, setHisRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Movie: ${title}\nYour Rating: ${yourRating}\nHis Rating: ${hisRating}`);
    setTitle('');
    setYourRating(5);
    setHisRating(5);
  };

  return (
    <div className="app-container">
      <h1 className="main-title">The Ultimate Movie Recommendation Tool</h1>
      <p>Add a movie</p>
      <p>On a scale from 1 to 10, how much do you want to watch this movie?</p>

      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-text"
        />

        <label className="rating-label">
          You:
          <input
            type="number"
            min="1"
            max="10"
            value={yourRating}
            onChange={(e) => setYourRating(Number(e.target.value))}
            required
            className="input-number"
          />
        </label>

        <label className="rating-label">
          Him:
          <input
            type="number"
            min="1"
            max="10"
            value={hisRating}
            onChange={(e) => setHisRating(Number(e.target.value))}
            required
            className="input-number"
          />
        </label>

        <button type="submit" className="btn-submit">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default App;