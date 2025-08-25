import React from "react";

interface MovieCardProps {
  title: string;
  poster: string;
  year: string;
  rating: number;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster, year, rating, onClick }) => (
  <div className="card h-100 shadow-sm movie-card" style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
    <img src={poster} alt={title} className="card-img-top" style={{ height: "350px", objectFit: "cover" }} />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{title}</h5>
      <p className="card-text mb-1">Year: {year}</p>
      <p className="card-text">Rating: <span className="fw-bold">{rating}</span></p>
    </div>
  </div>
);

export default MovieCard;
