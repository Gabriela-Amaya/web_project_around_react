function Popup({ popup, onClose }) {
  if (!popup) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="popup popup_opened" onMouseDown={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>

        {popup.title && <h2 className="popup__title">{popup.title}</h2>}

        {popup.children}
      </div>
    </div>
  );
}

export default Popup;
