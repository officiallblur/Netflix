import React from 'react';
import Modal from 'react-modal';
import './MovieModal.css';

Modal.setAppElement('#root'); // Accessibility

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieModal = ({ isOpen, onClose, movie }) => {
  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Movie Details"
      className="modal"
      overlayClassName="overlay"
    >
      <button className="close-button" onClick={onClose}>×</button>
      <div className="modal-content">
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name}
        />
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date || movie.first_air_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
    </Modal>
  );
};

export default MovieModal;
