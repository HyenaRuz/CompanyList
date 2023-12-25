import style from "./Modal.module.scss";

function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? `${style.modal} ${style.active}` : style.modal}
      onClick={setActive}
    >
      <div
        className={
          active
            ? `${style.modal_content} ${style.active}`
            : style.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
