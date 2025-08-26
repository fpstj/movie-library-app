import React from "react";
import type { Movie } from "./MovieCard";

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => (
  <div
    className="d-flex flex-column movie-details-overlay d-flex justify-content-center align-items-center"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1000,
    }}
  >
    <div
      className="card d-flex align-items-stretch m-2 p-0 text-white shadow-sm border border-opacity-25"
      style={{
        width: "500px",
        height: "90%",
        background:
          "radial-gradient(125% 125% at 50% 10%, #131313ff 40%, #2a072bff 100%)",
      }}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="card-img-top object-fit-cover"
        style={{ maxHeight: "70%", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-end px-3 py-2 w-100 h-100 pb-3">
        <h3 className="card-title p-0 m-0">{movie.title}</h3>
        <p className="card-text p-0 mb-2">{movie.description}</p>
        <p className="card-text text-white">Year: {movie.year}</p>
        <button className="btn btn-danger mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default MovieDetails;
