import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Nombre"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <span className="popup__error" id="owner-name-error" />
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />

        <span className="popup__error" id="owner-description-error" />
      </label>

      <button className="popup__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
