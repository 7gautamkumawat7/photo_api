const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
