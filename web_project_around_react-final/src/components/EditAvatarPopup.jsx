import { useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = "";
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
        ref={avatarRef}
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
