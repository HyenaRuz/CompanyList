import style from "./LoginPage.module.scss";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import SignupForm from "../../components/Forms/SignupForm/SignupForm";

function LoginPage() {
  const [modal, setModal] = useState(false);

  return (
    <main className={style.sing}>
      <Modal active={modal}>
        <SignupForm setActive={setModal} />
      </Modal>
      <Modal active={!modal}>
        <LoginForm setActive={setModal} />
      </Modal>
    </main>
  );
}

export default LoginPage;
