import { useState, useRef } from "react";
import Auth from "./component/Auth";
import Cookies from "universal-cookie";
import Chat from "./component/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("authToken"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("authToken");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }

  return (
    <>
      {room ? (
        <div className="chat-app">
          <Chat room={room} />
        </div>
      ) : (
        <div className="room">
          <label className="font-semibold mb-2 text-lg">Enter room name:</label>
          <input ref={roomInputRef} id="inputRoomName" />
          <button
            onClick={() => setRoom(roomInputRef.current.value)}
            className="px-5 py-2 mt-5 bg-cyan-700 cursor-pointer rounded-md text-md text-white w-36 font-semibold"
          >
            Enter chat
          </button>
        </div>
      )}

      <div className="sign-out absolute top-3 right-3">
        <button
          onClick={signUserOut}
          className="rounded-md px-3 py-2 bg-cyan-700 text-white font-semibold"
        >
          Sign out
        </button>
      </div>
    </>
  );
}

export default App;
