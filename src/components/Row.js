import React, { useEffect, useRef, useState } from 'react';
import axios from '../api/tmdb';
import './Row.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };
    getMovies();
  }, [fetchUrl]);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-container">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
        <div className="row-posters" ref={scrollRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="row-poster"
            />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Row;
