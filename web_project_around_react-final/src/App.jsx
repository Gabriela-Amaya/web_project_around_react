import { useEffect, useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import EditProfilePopup from "./components/EditProfilePopup";
import EditAvatarPopup from "./components/EditAvatarPopup";
import AddPlacePopup from "./components/AddPlacePopup";
import ImagePopup from "./components/ImagePopup";

import api from "./utils/api";
import CurrentUserContext from "./contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  // Obtener usuario y tarjetas desde la API
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Error al cargar el usuario:", error);
      });

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Error al cargar las tarjetas:", error);
      });
  }, []);

  function handleOpenEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleOpenEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleOpenAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleClosePopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  // Editar perfil con API
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopups();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  }

  // Editar avatar con API
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopups();
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      });
  }

  // Crear tarjeta con API
  function handleAddPlace(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((currentCards) => [newCard, ...currentCards]);

        handleClosePopups();
      })
      .catch((error) => {
        console.error("Error al agregar la tarjeta:", error);
      });
  }

  // Like / dislike con API
  function handleCardLike(card) {
    const isLiked = card.isLiked;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((currentCards) =>
          currentCards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        console.error("Error al cambiar el like:", error);
      });
  }

  // Eliminar tarjeta con API
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((currentCards) =>
          currentCards.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  // Cerrar popups con Escape
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        handleClosePopups();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <div className="page">
        <Header />

        <Main
          cards={cards}
          onEditProfile={handleOpenEditProfilePopup}
          onEditAvatar={handleOpenEditAvatarPopup}
          onAddPlace={handleOpenAddPlacePopup}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClosePopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClosePopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClosePopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup card={selectedCard} onClose={handleClosePopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
