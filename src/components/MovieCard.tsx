import React from "react";
import starUrl from "../assets/icons/star.svg";

export type Movie = {
  id: number;
  title: string;
  image: string;
  description: string;
  year: number;
  rating: number;
};

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="card d-flex align-items-stretch m-2 p-0 text-white shadow-sm border border-opacity-25"
      style={{
        width: "16rem",
        minHeight: "20rem",
        cursor: "pointer",
        transition: "transform 0.2s",
        overflow: "hidden",
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 30%),
          radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 50%)
        `,
        backgroundColor: "#000000ff",
      }}
      onClick={() => onClick(movie)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={movie.image}
        className="card-img-top object-fit-cover w-100"
        alt={movie.title}
        style={{ height: "75%" }}
      />
      <div className="card-body d-flex flex-column justify-content-end text-start px-3 py-2 w-100 h-100">
        <div>
          {Array.from({ length: 5 }).map((_, i) => {
            const fullStar = i < Math.round(movie.rating / 2);
            return (
              <img
                key={i}
                src={starUrl}
                alt={fullStar ? "Full star" : "Empty star"}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "2px",
                  filter: fullStar ? "none" : "grayscale(1) brightness(2)",
                  opacity: fullStar ? 1 : 0.4,
                }}
              />
            );
          })}
        </div>
        <h5
          className="card-title mb-1"
          style={{
            fontSize: "1rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.title}
        </h5>
        <p className="card-text mb-1" style={{ fontSize: "0.9rem" }}>
          {movie.year}
        </p>
        <p
          className="card-text"
          style={{ fontSize: "0.95rem", color: "#a2b0bbff" }}
        >
          {movie.description}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
