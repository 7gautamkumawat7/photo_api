const PhotoCard = ({ photo, isFavourite = false, onToggleFavourite }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="flex items-center justify-between p-4">
        <p className="truncate font-medium text-gray-800" title={photo.author}>
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggleFavourite && onToggleFavourite(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className="text-2xl transition-transform hover:scale-110 focus:outline-none"
        >
          <span className={isFavourite ? "text-red-500" : "text-gray-300 hover:text-gray-400"}>
            ♥
          </span>
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
