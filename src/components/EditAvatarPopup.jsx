import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarLink, setAvatarLink] = useState("");

  function handleAvatarChange(event) {
    setAvatarLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink,
    });

    setAvatarLink("");
  }

  return (
    <PopupWithForm
      title="Cambiar foto de perfil"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Guardar"
    >
      <input
        className="popup__input"
        type="url"
        name="avatar"
        placeholder="Enlace de la imagen"
        value={avatarLink}
        onChange={handleAvatarChange}
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
