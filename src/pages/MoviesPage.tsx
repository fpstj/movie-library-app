import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

const MoviesPage: React.FC = () => {
  const context = React.useContext(ApplicationContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!context?.webApi) return;
      setLoading(true);
      const data = await context.webApi.getMovies();
      setMovies(data);
      setFilteredMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, [context]);

  useEffect(() => {
    let filtered = movies;
    if (search) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (genre) {
      filtered = filtered.filter((m) => m.genre_ids.includes(Number(genre)));
    }
    setFilteredMovies(filtered);
  }, [search, genre, movies]);

  // Get unique genres from movies
  const genreMap: { [id: number]: string } = {};
  movies.forEach((m) =>
    m.genres?.forEach?.(
      (g: { id: number; name: string }) => (genreMap[g.id] = g.name)
    )
  );
  // Fallback to TMDB genre IDs if not present
  if (Object.keys(genreMap).length === 0 && movies.length > 0) {
    // Example genre list
    genreMap[28] = "Action";
    genreMap[12] = "Adventure";
    genreMap[16] = "Animation";
    genreMap[35] = "Comedy";
    genreMap[80] = "Crime";
    genreMap[99] = "Documentary";
    genreMap[18] = "Drama";
    genreMap[10751] = "Family";
    genreMap[14] = "Fantasy";
    genreMap[36] = "History";
    genreMap[27] = "Horror";
    genreMap[10402] = "Music";
    genreMap[9648] = "Mystery";
    genreMap[10749] = "Romance";
    genreMap[878] = "Science Fiction";
    genreMap[10770] = "TV Movie";
    genreMap[53] = "Thriller";
    genreMap[10752] = "War";
    genreMap[37] = "Western";
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 py-4">
      <h2 className="mb-4 text-center">Popular Movies</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="col-md-6">
          <GenreFilter
            genres={Object.values(genreMap)}
            selected={genre}
            onChange={setGenre}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredMovies.length === 0 ? (
            <div className="col-12 text-center">No movies found.</div>
          ) : (
            filteredMovies.map((movie) => (
              <div className="col-md-3 col-sm-6" key={movie.id}>
                <MovieCard
                  title={movie.title}
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  year={movie.release_date?.slice(0, 4) || ""}
                  rating={movie.vote_average ?? 0}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
