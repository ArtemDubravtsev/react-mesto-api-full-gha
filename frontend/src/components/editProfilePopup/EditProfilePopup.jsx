import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import UseForm from "../../utils/UseForm";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValue, reset } = UseForm();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("job", currentUser.about);
  }, [currentUser, setValue]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, job: values.job });
  }

  function resetWhenClose() {
    onClose();
    reset({ name: currentUser.name, job: currentUser.about });
  }

  return (
    <PopupWithForm
      name="profil_edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={resetWhenClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-info">
        <input
          type="text"
          className="popup__form-item popup__form-item_line_name"
          name="name"
          placeholder="Введите имя"
          minLength={2}
          maxLength={40}
          required
          value={values.name ? values.name : ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_name" />
        <input
          type="text"
          className="popup__form-item popup__form-item_line_job"
          name="job"
          placeholder="Расскажите о себе"
          minLength={2}
          maxLength={200}
          required
          value={values.job ? values.job : ""}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_job" />
      </fieldset>
    </PopupWithForm>
  );
}
