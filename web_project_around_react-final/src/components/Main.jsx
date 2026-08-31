import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Profile from "./Profile";
import Gallery from "./Gallery";
import Popup from "./Popup";
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";
import NewCard from "./NewCard";

function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  popup,
  onOpenPopup,
  onClosePopup,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  function handleEditProfileClick() {
    onOpenPopup({
      title: "Editar perfil",
      children: <EditProfile />,
    });
  }

  function handleEditAvatarClick() {
    onOpenPopup({
      title: "Cambiar foto de perfil",
      children: <EditAvatar />,
    });
  }

  function handleAddPlaceClick() {
    onOpenPopup({
      title: "Nuevo lugar",
      children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
    });
  }

  return (
    <main className="content">
      <Profile
        user={currentUser}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
      />

      <Gallery
        cards={cards}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />

      <Popup popup={popup} onClose={onClosePopup} />
    </main>
  );
}

export default Main;
