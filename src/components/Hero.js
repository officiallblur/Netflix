import React, { useEffect, useState } from 'react';
import axios from '../api/tmdb';
import requests from '../requests';
import './Hero.css';
import MovieModal from './MovieModal';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(requests.fetchTrending);
        const results = response.data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        setMovie(results[randomIndex]);
      } catch (error) {
        console.error('Failed to fetch hero movie', error);
      }
    };

    fetchRandomMovie();
  }, []);

  const handlePlayClick = async () => {
    if (!movie) return;

    setLoadingTrailer(true);

    try {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      const videos = response.data.results;

      const officialTrailer = videos.find(
        (vid) =>
          vid.type === 'Trailer' &&
          vid.site === 'YouTube' &&
          vid.official === true
      );

      const fallbackTrailer = videos.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );

      const selectedTrailer = officialTrailer || fallbackTrailer;

      if (selectedTrailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${selectedTrailer.key}`);
      } else {
        alert('No trailer available for this movie.');
      }
    } catch (error) {
      console.error('Error fetching trailer', error);
    } finally {
      setLoadingTrailer(false);
    }
  };

  if (!movie) return null;

  return (
    <>
      <header
        className="hero"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="hero-content">
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview?.substring(0, 150)}...</p>
          <div className="buttons">
            <button onClick={handlePlayClick}>▶ Play</button>
            <button onClick={() => setModalOpen(true)}>ℹ More Info</button>
          </div>
          {loadingTrailer && <p className="loading-text">Loading trailer...</p>}
        </div>
        <div className="hero-fade-bottom" />
      </header>

      {trailerUrl && (
        <div className="trailer-modal">
          <iframe
            width="100%"
            height="500px"
            src={trailerUrl}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <button className="close-trailer" onClick={() => setTrailerUrl('')}>✖</button>
        </div>
      )}

      <MovieModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movie={movie} />
    </>
  );
};

export default Hero;
