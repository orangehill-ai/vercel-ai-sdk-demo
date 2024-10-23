
// commented out to mitigate this issue https://github.com/vercel/next.js/issues/50243
// also, not using Image component from next.js to avoid the same issue
// 'use client';

export type Artwork = {
  id: number;
  image_url: string;
  artist_display: string;
  title: string;
};

function ArtworkCard({ artwork, priority }: { artwork: Artwork; priority?: boolean }) {
  return (
    <div className="relative aspect-square w-full">
      <img
      src={artwork.image_url}
      alt={artwork.title}
      className="object-cover w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
      <h3 className="text-sm font-semibold truncate">{artwork.title}</h3>
      <p className="text-xs truncate">{artwork.artist_display}</p>
      </div>
    </div>
  );
}

export default function ArtworkGallery({ artworks }: { artworks: Artwork[] }) {
  if (!artworks || artworks.length === 0) {
    return <div>No artworks found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="relative aspect-square w-full">
        {artworks[0] && <ArtworkCard artwork={artworks[0]} priority />}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {artworks.slice(1, 5).map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}