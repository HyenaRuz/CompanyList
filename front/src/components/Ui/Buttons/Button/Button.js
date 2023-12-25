import style from "./Button.module.scss";

function Button({ title, method, type, width }) {
  return (
    <button
      className={style.button}
      onClick={method}
      type={type}
      style={{ width: width }}
    >
      {title}
    </button>
  );
}

export default Button;
