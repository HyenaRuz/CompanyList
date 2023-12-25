import { getProfile } from "../../services/auth.service";
import style from "./HomePage.module.scss";
import Button from "../../components/Ui/Buttons/Button/Button";
import { useEffect, useState } from "react";
import Loader from "../../components/Ui/Loader /Loader";
import Modal from "../../components/Modal/Modal";
import SignupForm from "../../components/Forms/SignupForm/SignupForm";
import { Navigate } from "react-router-dom";

function HomePage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setUser(data);
    } catch (err) {
      console.error("Get profile error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <main className={style.page}>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.user}>
          <div className={style.user_box}>
            <p className={style.user_title}>First name: </p>
            <p>{user.firstName}</p>
          </div>
          <div className={style.user_box}>
            <p className={style.user_title}>Last name: </p>
            <p>{user.lastName}</p>
          </div>
          <div className={style.user_box}>
            <p className={style.user_title}>Nick name: </p>
            <p>{user.nickname}</p>
          </div>
          <div className={style.user_box}>
            <p className={style.user_title}>Email: </p>
            <p>{user.email}</p>
          </div>
          <div className={style.user_box}>
            <p className={style.user_title}>Phone: </p>
            <p>{user.phone}</p>
          </div>
          <div className={style.user_description}>
            <p className={style.user_title}>Description: </p>
            <p>{user.description}</p>
          </div>
          <div className={style.user_box}>
            <p className={style.user_title}>Position: </p>
            <p>{user.position}</p>
          </div>
        </div>
      )}
      <Button title="Update" width={"300px"} method={() => setModal(true)} />

      <Modal
        active={modal}
        setActive={() => {
          setModal(false);
        }}
      >
        <SignupForm user={user} setActive={setModal} fetchUser={fetchUser} />
      </Modal>
    </main>
  );
}

export default HomePage;
