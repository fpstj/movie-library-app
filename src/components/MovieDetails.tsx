import React from "react";
import type { Movie } from "./MovieCard";

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => (
  <div
    className="movie-details-overlay d-flex justify-content-center align-items-center"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.8)",
      zIndex: 1000,
    }}
  >
    <div className="card p-4" style={{ maxWidth: "500px" }}>
      <img
        src={movie.image}
        alt={movie.title}
        className="card-img-top mb-3"
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-text">{movie.description}</p>
        <p className="card-text text-muted">Year: {movie.year}</p>
        <button className="btn btn-danger" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default MovieDetails;
