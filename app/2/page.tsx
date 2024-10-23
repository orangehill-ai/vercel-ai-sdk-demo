'use client';

import { useCompletion } from 'ai/react';

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: '/api/stream',
    initialInput: 'Why is the sky blue?',
  });

  return (
    <div className="m-4 w-1/2 mx-auto">
      <h1 className="text-2xl font-bold mb-4 w-full text-center">Example 2: Streaming text</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2">Submit</button>
        <div className="pt-4 text-white">{completion}</div>
      </form>
    </div>
  );
}