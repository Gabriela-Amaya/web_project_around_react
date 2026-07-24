import { useState } from "react";

function Card({ card, onCardClick, onDeleteCard }) {
  const [isLiked, setIsLiked] = useState(false);

  function handleImageClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onDeleteCard(card.id);
  }

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="card">
      <button
        className="card__delete-button"
        type="button"
        aria-label="Eliminar tarjeta"
        onClick={handleDeleteClick}
      />

      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />

      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>

        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          type="button"
          aria-label="Me gusta"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;
