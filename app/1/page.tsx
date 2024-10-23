'use client'

import { useState } from 'react';

export default function Page() {
  const [generation, setGeneration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="m-4 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-4 w-full text-center">Example 1: Generating text</h1>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={async () => {
          setIsLoading(true);

            await fetch('/api/completion', {
              method: 'POST',
              body: JSON.stringify({
                prompt: 'Why is the sky blue?',
              }),
            }).then(response => {
              response.json().then(json => {
                setGeneration(json.text);
                setIsLoading(false);
              });
            });
          }}
        >
          Generate
        </button>
      </div>

      <div className="pt-4">{isLoading ? 'Loading...' : generation}</div>
    </div>
  );
}