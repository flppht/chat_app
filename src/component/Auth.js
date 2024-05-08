import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("authToken", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div className="auth">
      <p className="font-semibold text-4xl uppercase text-slate-700">
        Welcome to the Chat App
      </p>
      <p className="mt-10 text-md text-slate-900/90">
        To join the room for conversation, please sign in with Google.
      </p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Auth;
