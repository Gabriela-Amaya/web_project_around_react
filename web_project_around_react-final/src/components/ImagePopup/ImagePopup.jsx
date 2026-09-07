function ImagePopup({ card, onClose }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_image ${card ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      {card && (
        <div className="popup__image-container">
          <button
            className="popup__image-close"
            type="button"
            aria-label="Cerrar imagen"
            onClick={onClose}
          >
            ×
          </button>

          <img className="popup__image" src={card.link} alt={card.name} />

          <p className="popup__caption">{card.name}</p>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
