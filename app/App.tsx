import React from 'react';
import { createAI } from 'ai/rsc';

type ServerMessage = any; // Replace 'any' with the actual type definition
type ClientMessage = any; // Replace 'any' with the actual type definition

export const AI = createAI<ServerMessage[], ClientMessage[]>({
    actions: {},
    initialAIState: [],
    initialUIState: [],
  });

export default function App({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <AI>
      {children}
    </AI>
  );
}