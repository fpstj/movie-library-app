import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search movies..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
