import React from "react";
import { FlashCard } from "./FlashCard";

export const FlashCardList = ({ flashcards }) => {
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <FlashCard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
};
