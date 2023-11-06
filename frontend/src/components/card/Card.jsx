import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((like) => like === currentUser._id);

  return (
    <div className="elements__item">
      {currentUser._id === card.owner && (
        <button
          type="button"
          className="elements__item-delete"
          onClick={() => onCardDelete(card._id)}
        />
      )}
      <img
        className="elements__item-image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="elements__item-name">
        <h2 className="elements__item-title">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={`elements__item-like ${
              isLiked && "elements__item-like_active"
            }`}
            onClick={() => onCardLike(card)}
          />
          <span className="elements__like-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
