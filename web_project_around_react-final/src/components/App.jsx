import { useEffect, useState } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";

import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Popup de formularios
  const [popup, setPopup] = useState(null);

  // Popup de imagen
  const [selectedCard, setSelectedCard] = useState(null);

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

  function handleOpenPopup(newPopup) {
    setPopup(newPopup);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((currentCards) => [newCard, ...currentCards]);

        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al agregar la tarjeta:", error);
      });
  }

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

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        handleClosePopup();
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
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <Footer />

        <ImagePopup card={selectedCard} onClose={handleClosePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
