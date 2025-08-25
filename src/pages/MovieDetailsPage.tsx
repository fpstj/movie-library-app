import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";

interface Genre {
  id: number;
  name: string;
}

interface Video {
  id: string;
  key: string;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  genres?: Genre[];
  videos?: {
    results: Video[];
  };
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const context = React.useContext(ApplicationContext);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!context?.webApi || !id) return;
      setLoading(true);
      const data = await context.webApi.getMovieDetails(id);
      // Transform videos array to { results: Video[] } if needed
      const movieData: Movie = {
        ...data,
        videos: data.videos ? { results: data.videos } : undefined,
      };
      setMovie(movieData);
      setLoading(false);
    };
    fetchDetails();
  }, [context, id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div className="container py-5 text-center">Movie not found.</div>;
  }

  return (
    <div className="d-flex flex-column w-100 h-100" style={{ minHeight: "100vh", minWidth: "100vw", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div className="container py-4 flex-grow-1 d-flex flex-column" style={{ overflow: "auto" }}>
        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-8">
            <h2>{movie.title}</h2>
            <p className="lead">{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Popularity:</strong> {movie.popularity}
            </p>
            <div className="mb-2">
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g: Genre) => g.name).join(", ")}
            </div>
            {movie.videos?.results && movie.videos.results.length > 0 && (
              <div className="mb-3">
                <strong>Videos:</strong>
                <div className="row">
                  {movie.videos.results.map((video: Video) => (
                    <div className="col-md-6 mb-2" key={video.id}>
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
