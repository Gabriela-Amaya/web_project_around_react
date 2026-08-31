import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Profile from "./Profile";
import Gallery from "./Gallery";

function Main({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <Profile
        user={currentUser}
        onEditProfile={onEditProfile}
        onEditAvatar={onEditAvatar}
        onAddPlace={onAddPlace}
      />

      <Gallery
        cards={cards}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}

export default Main;
