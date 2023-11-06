import Popup from "../popup/Popup";

export default function InfoTooltip({ name, isRight, isOpen, onClose }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div
        className={`popup__register ${!isRight ? "popup__register-error" : ""}`}
      />
      <h2 className="popup__register-title">
        {isRight
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."}
      </h2>
    </Popup>
  );
}
