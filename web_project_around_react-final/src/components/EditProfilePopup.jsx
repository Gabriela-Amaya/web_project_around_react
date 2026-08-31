import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name || "");
      setAbout(currentUser.about || "");
    }
  }, [isOpen, currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
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
