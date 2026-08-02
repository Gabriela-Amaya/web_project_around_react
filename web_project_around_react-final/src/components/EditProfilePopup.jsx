import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ user, isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setAbout(user.about);
    }
  }, [isOpen, user]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Guardar"
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Nombre"
        value={name}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
      />

      <input
        className="popup__input"
        type="text"
        name="about"
        placeholder="Profesión"
        value={about}
        onChange={handleAboutChange}
        required
        minLength="2"
        maxLength="200"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
