import { useRef } from "react";
import UseForm from "../../utils/UseForm";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, reset } = UseForm();
  const input = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value });
    reset();
  }

  function resetWhenClose() {
    onClose();
    reset();
  }

  return (
    <PopupWithForm
      name="avatar_edit"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={resetWhenClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-info">
        <input
          type="url"
          className="popup__form-item popup__form-item_line_link"
          name="avatar"
          placeholder="Ссылка на изображение"
          required
          ref={input}
          value={values.avatar ? values.avatar : ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_avatar" />
      </fieldset>
    </PopupWithForm>
  );
}
