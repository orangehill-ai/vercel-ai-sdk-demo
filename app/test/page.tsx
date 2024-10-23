'use client'

import { useState } from 'react';
import ArtworkGallery, { Artwork } from '@/components/artwork';

export default function Page() {
  const [generation, setGeneration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mockArtworks: Artwork[] = [
    {
    id: 1,
    image_url: 'https://www.artic.edu/iiif/2/48d485ec-6102-b7ec-062c-8b351055ca5f/full/843,/0/default.jpg',
    artist_display: 'Artist One',
    title: 'Artwork One'
    },
    {
      id: 2,
      image_url: 'https://www.artic.edu/iiif/2/48d485ec-6102-b7ec-062c-8b351055ca5f/full/843,/0/default.jpg',
      artist_display: 'Artist Two',
      title: 'Artwork Two'
      },
    {
    id: 3,
    image_url: 'https://www.artic.edu/iiif/2/48d485ec-6102-b7ec-062c-8b351055ca5f/full/843,/0/default.jpg',
    artist_display: 'Artist Two',
    title: 'Artwork Two'
    },
    {
      id: 4,
      image_url: 'https://www.artic.edu/iiif/2/48d485ec-6102-b7ec-062c-8b351055ca5f/full/843,/0/default.jpg',
      artist_display: 'Artist Two',
      title: 'Artwork Two'
      },
      {
        id: 5,
        image_url: 'https://www.artic.edu/iiif/2/48d485ec-6102-b7ec-062c-8b351055ca5f/full/843,/0/default.jpg',
        artist_display: 'Artist Two',
        title: 'Artwork Two'
        },
          ];

  return (
    <div className="m-4 w-1/2 mx-auto">
    <ArtworkGallery artworks={mockArtworks} />
    </div>
  );
}