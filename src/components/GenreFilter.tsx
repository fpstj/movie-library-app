import React from "react";

interface GenreFilterProps {
  genres: string[];
  selected: string;
  onChange: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selected, onChange }) => (
  <div className="mb-3">
    <select className="form-select" value={selected} onChange={e => onChange(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map(genre => (
        <option key={genre} value={genre}>{genre}</option>
      ))}
    </select>
  </div>
);

export default GenreFilter;
