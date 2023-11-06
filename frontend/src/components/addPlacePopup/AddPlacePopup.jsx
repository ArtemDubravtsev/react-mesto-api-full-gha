import UseForm from "../../utils/UseForm";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, reset } = UseForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link });
    reset();
  }

  function resetWhenClose() {
    onClose();
    reset();
  }

  return (
    <PopupWithForm
      name="add_card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={resetWhenClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-info">
        <input
          type="text"
          className="popup__form-item popup__form-item_line_title"
          name="title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.title ? values.title : ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_title" />
        <input
          type="url"
          className="popup__form-item popup__form-item_line_link"
          name="link"
          placeholder="Ссылка на изображение"
          required
          value={values.link ? values.link : ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_link" />
      </fieldset>
    </PopupWithForm>
  );
}
