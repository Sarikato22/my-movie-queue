import React, { useState, useEffect } from 'react';
import './App.css';
import { PriorityQueue } from './PriorityQueue.js';

const pq = new PriorityQueue(); 

function App() {
  const [title, setTitle] = useState('');
  const [yourRating, setYourRating] = useState('5');
  const [hisRating, setHisRating] = useState('5');
  const [movies, setMovies] = useState([]);
  const [lastPopped, setLastPopped] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('movieQueue');
    if (saved) {
      const savedMovies = JSON.parse(saved);
      pq.clear();
      savedMovies.forEach(movie => pq.enqueue(movie));
      setMovies(pq.getAll());
    }
  }, []);

  // Save movies to localStorage whenever they change
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movieQueue', JSON.stringify(movies));
    }
  }, [movies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      yourRating,
      hisRating,
      priority: Number(yourRating) + Number(hisRating),
    };

    pq.enqueue(newMovie);
    setMovies(pq.getAll());

    setTitle('');
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
<div className= "rating-labels">
        <label className="rating-label">
          You:
          <input
            type="number"
            min="1"
            max="10"
            value={yourRating}
            onChange={(e) => {
              if (e.target.value === '' || (/^\d+$/.test(e.target.value) && Number(e.target.value) <= 10)) {
                setYourRating(e.target.value);
              }
            }}
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
            onChange={(e) => {
              if (e.target.value === '' || (/^\d+$/.test(e.target.value) && Number(e.target.value) <= 10)) {
                setHisRating(e.target.value);
              }
            }}
            required
            className="input-number"
          />
        </label>
</div>
<div className="buttons">
        <button type="submit" className="btn-submit">
          Add Movie
        </button>

        <button className="clear-button" onClick={()=>{
          pq.clear();
          setMovies([]);
        }}>
          Clear List
        </button>
</div>
      </form>
      <p className="movie-list-text">Movie list:</p>
      <ul className="movie-list">
        {movies.map((movie, i) => (
          <li key={i}>
            <strong>{movie.title}</strong>
          </li>
        ))}
      </ul>
      
      <br></br>
      <h1 className="which-movie">Which movie should you watch?</h1>
      <div className="suggestion-section">
      <button className="suggestion-button" onClick={()=>{
          const popped = pq.dequeue();
          setMovies(pq.getAll());
          setLastPopped(popped);
        }}>
          Get suggestion
        </button>
        </div>
        {lastPopped && (
        <div className="popped-movie">
          <h3 className="your-pick">Your top pick:</h3>
          <p>
            <strong>{lastPopped.title}</strong> — You: {lastPopped.yourRating}, Him: {lastPopped.hisRating} (Total: {lastPopped.priority})
          </p>
        </div>
      )}
    </div>
  );
}

export default App;