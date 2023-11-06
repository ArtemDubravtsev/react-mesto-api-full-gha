export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_image ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__image-container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__button-close popup__button-close_image"
          onClick={onClose}
        />
        <img className="popup__image-foto" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </section>
  );
}
