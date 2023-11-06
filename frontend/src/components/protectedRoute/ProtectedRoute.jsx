import { Navigate } from "react-router-dom";
import Header from "../header/Header";
import Main from "../main/Main";

export default function ProtectedRoute({ loggedIn, userEmail, ...props }) {
  return loggedIn ? (
    <>
      <Header dataUser={userEmail} />
      <Main name="main" {...props} />
    </>
  ) : (
    <Navigate to={"/sign-in"} replace />
  );
}
