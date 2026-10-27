import { useState, useCallback, useMemo, useReducer, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouritesReducer } from "../reducers/favouritesReducer";
import LoadingSpinner from "./LoadingSpinner";
import PhotoCard from "./PhotoCard";
import SearchBar from "./SearchBar";

const loadInitialFavourites = () => {
  try {
    const saved = localStorage.getItem("photonest_favourites");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load favourites from localStorage:", error);
    return [];
  }
};

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadInitialFavourites);

  useEffect(() => {
    try {
      localStorage.setItem("photonest_favourites", JSON.stringify(favourites));
    } catch (error) {
      console.error("Failed to save favourites to localStorage:", error);
    }
  }, [favourites]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: id });
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Photo+ api
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Explore photos from Picsum
        </p>
      </header>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {filteredPhotos.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No photos found matching "{searchTerm}"
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;