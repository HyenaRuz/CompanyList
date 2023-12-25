import { useAuth } from "../hooks/useAuth";

export function ProtectedRout({ children }) {
  const isAuth = useAuth();
  return (
    <>
      {!isAuth ? (
        children
      ) : (
        <div>
          <h1>To view this page you mast be logged in</h1>
        </div>
      )}
    </>
  );
}
