import React from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Alert from "../Alert";

function Index() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [passwordHidden, setPasswordHidden] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState({
    status: false,
    message: "",
    behaviour: "",
  });

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordHidden = (isHidden) => {
    if (isHidden === "show") {
      setPasswordHidden(true);
    } else if (isHidden === "hidden") {
      setPasswordHidden(false);
    } else {
      setPasswordHidden(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: "https://api-dev.contrax.com.au/api/v1/token/",
      data: { username: username, password: password },
    }).then(
      function (response) {
        try {
          localStorage.setItem("token", response.data.token);
          setLoading(false);
          navigate("/Dashboard");
        } catch (error) {
          setLoading(false);
          setShowAlert({
            status: true,
            message: "Something went wrong",
            behaviour: "error",
          });
        }
      },
      () => {
        setLoading(false);
          setShowAlert({
            status: true,
            message: "Something went wrong",
            behaviour: "error",
          });
      }
    );
  };

  return (
    <>
      <div className="backgroundImage">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div className="loginBackground">
            <div className="mt-6 loginStyle">
              <div className="logoContainer">
                <p className="loginText">LogIn</p>
              </div>
              <form onSubmit={handleLogin} style={{ margin: "20px" }}>
                <div className="mx-auto max-w-lg">
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Email</span>
                    <input
                      placeholder="Email"
                      onChange={handleUsernameInput}
                      value={username}
                      type="text"
                      className="text-md block px-3 py-2  rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-2" x-data="{ show: true }">
                    <span className="px-1 text-sm text-gray-600">Password</span>
                    <div className="relative">
                      <input
                        onChange={handlePasswordInput}
                        value={password}
                        placeholder="Password"
                        type={passwordHidden ? "text" : "password"}
                        className="text-md block px-3 py-2 rounded-lg w-full 
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        {passwordHidden ? (
                          <svg
                            onClick={() => handlePasswordHidden("hidden")}
                            className="h-6 text-gray-700"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="currentColor"
                              d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            onClick={() => handlePasswordHidden("show")}
                            className="h-6 text-gray-700"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path
                              fill="currentColor"
                              d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-between">
                    <label className="block text-gray-500 font-bold my-4">
                      <input
                        type="checkbox"
                        className="leading-loose text-pink-600 mr-1"
                      />
                      <span className="py-2 text-sm text-gray-600 leading-snug">
                        Remember Me
                      </span>
                    </label>
                  </div> */}
                  <button
                    type="submit"
                    className=" loginBtnStyle mt-3 text-lg font-semibold 
                 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white"
                  >
                    {loading ? <Loader color={"white"} /> : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showAlert.status ? (
        <Alert behaviour={showAlert.behaviour} message={showAlert.message} />
      ) : (
        ""
      )}
    </>
  );
}

export default Index;
