import React, { useState, useEffect } from "react";
import { ApplicationRestApi } from "../services/web-api/rest/application-rest-api";
import type { Movie as ApiMovie } from "../services/web-api/application-api";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";

const api = new ApplicationRestApi();

type Movie = {
  id: number;
  title: string;
  image: string;
  description: string;
  year: number;
  rating: number;
};

const MainPage: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Example movies array; replace with real data or fetch from API
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getMovies().then((apiMovies: ApiMovie[]) => {
      const mappedMovies = apiMovies.map((m) => ({
        id: m.id,
        title: m.title,
        image: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "https://via.placeholder.com/200x300?text=No+Image",
        description: m.title, // Placeholder, can fetch details on click
        year: m.release_date ? parseInt(m.release_date) : 0,
        rating: m.vote_average ?? 0,
      }));
      setMovies(mappedMovies);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container-fluid py-4" style={{ minHeight: "100%" }}>
      <h2 className="text-light mb-4">Popular Movies</h2>
      {loading ? (
        <div className="text-light text-center">Loading...</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      )}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
