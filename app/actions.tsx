'use server';

import { streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import ArtworkGallery, { Artwork } from '@/components/artwork';

const LoadingComponent = () => (
  <div className="animate-pulse p-4">Processing...</div>
);

const getWeather = async (location: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const randomTemperature = Math.floor(Math.random() * 11) + 20;
  return `${randomTemperature}°C ☀️`;
};

interface WeatherProps {
  location: string;
  weather: string;
}

const WeatherComponent = ({ location, weather }: WeatherProps) => (
  <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    The weather in {location} is {weather}
  </div>
);

// Mock function to simulate currency conversion
const getConversionRate = async (fromCurrency: string): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  const mockRates: { [key: string]: number } = {
    USD: 0.85,
    GBP: 1.15,
    JPY: 0.0075,
    CAD: 0.64,
  };
  return mockRates[fromCurrency.toUpperCase()] || 1; // Default 1 if not found
};

interface ConversionProps {
  fromCurrency: string;
  amount: number;
  convertedAmount: number;
}

const ConversionComponent = ({
  fromCurrency,
  amount,
  convertedAmount,
}: ConversionProps) => (
<div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
    💱 {amount} {fromCurrency} is equivalent to {convertedAmount.toFixed(2)} EUR
</div>
);

/**
 * Fetches artwork data from the Art Institute of Chicago API
 * @param {string} searchQuery - The search term to query for
 * @param {number} [page=1] - The page number to fetch
 * @param {number} [limit=10] - Number of results per page
 * @returns {Promise<Artwork[]>} Array of artwork objects
 */
async function fetchArtworks(searchQuery: string, page = 1, limit = 10) {
  try {
    // Calculate offset based on page number
    const offset = (page - 1) * limit;
    
    // Construct the API URL with proper encoding
    const apiUrl = new URL('https://api.artic.edu/api/v1/artworks/search');
    apiUrl.searchParams.append('q', searchQuery);
    apiUrl.searchParams.append('fields', 'title,artist_display,image_id');
    apiUrl.searchParams.append('limit', limit.toString());
    apiUrl.searchParams.append('offset', offset.toString());

    // Fetch data from the API
    const response = await fetch(apiUrl.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Transform the data into the required format
    const artworks = data.data.map((artwork: { _score: number; image_id: string | null; artist_display: string; title: string }) => ({
      id: artwork._score, // Using _score as id since no specific id is provided in the example
      image_url: artwork.image_id 
        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
        : null,
      artist_display: artwork.artist_display,
      title: artwork.title
    }));

    return artworks;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
}

export async function streamComponent(input: string) {
  const result = await streamUI({
    model: openai('gpt-4o'),
    prompt: input, // Use dynamic input as the message exchange
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getArtwork: {
        description: 'Get the artwork gallery for a search query',
        parameters: z.object({
          searchQuery: z.string(),
        }),
        generate: async function* ({ searchQuery }) {
          yield <LoadingComponent />;
          const artwork = await fetchArtworks(searchQuery);
          return <ArtworkGallery artworks={artwork} />;
        },
      },      
      getWeather: {
        description: 'Get the weather for a location',
        parameters: z.object({
          location: z.string(),
        }),
        generate: async function* ({ location }) {
          yield <LoadingComponent />;
          const weather = await getWeather(location);
          return <WeatherComponent weather={weather} location={location} />;
        },
      },
      getConversionRate: {
        description: 'Convert any currency to EUR',
        parameters: z.object({
          fromCurrency: z.string(),
          amount: z.number(),
        }),
        generate: async function* ({ fromCurrency, amount }) {
          yield <LoadingComponent />;
          const rate = await getConversionRate(fromCurrency);
          const convertedAmount = amount * rate;
          return (
            <ConversionComponent
              fromCurrency={fromCurrency}
              amount={amount}
              convertedAmount={convertedAmount}
            />
          );
        },
      },
    },
  });

  return result.value;
}