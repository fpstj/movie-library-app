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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch movies for a given page
  const fetchMovies = async (reset = false) => {
    if (page > 25) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    const apiMovies: ApiMovie[] = await api.getMovies(page);
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
    setMovies((prev) => (reset ? mappedMovies : [...prev, ...mappedMovies]));
    setLoading(false);
    if (apiMovies.length === 0 || page >= 25) setHasMore(false);
  };

  // Initial load and reset on refresh
  useEffect(() => {
    if (page === 1) {
      setHasMore(true);
      fetchMovies(true); // reset for first page
    } else {
      fetchMovies();
    }
    // eslint-disable-next-line
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ minHeight: "100%" }}>
      <h2 className="text-light mb-4">Popular Movies</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
        ))}
      </div>
      {loading && <div className="text-light text-center">Loading...</div>}
      {hasMore && !loading && (
        <div className="d-flex justify-content-center my-4">
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
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
