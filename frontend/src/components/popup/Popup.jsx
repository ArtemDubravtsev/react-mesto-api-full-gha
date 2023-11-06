export default function Popup({ name, children, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className={`popup__container ${
          name === "delete_card" && "popup__container_delete"
        }
        ${name === "registerPopup" ? "popup__container_register" : ""}`}
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        {children}
      </div>
    </section>
  );
}
