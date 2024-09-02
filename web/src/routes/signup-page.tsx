import { ChangeEvent, useState, KeyboardEvent } from "react";
import { API_URL } from "../utils/constants";

interface SignupSucessPayload {
  message: string;
}

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSignupClick = async () => {
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    console.log("Signup Clicked");
    setErrorMessage(""); // Clear error message on successful signup
    const body = JSON.stringify({ email });

    try {
      const response = await fetch(`${API_URL}/newsletter/signup`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const payload = (await response.json()) as SignupSucessPayload;

      const isOkayRequest = response.status === 200 || response.status === 201;
      if (!isOkayRequest) {
        if (typeof payload === "string") {
          return setErrorMessage(payload);
        }
        return setErrorMessage("Invalid email, please try again");
      }

      return navigate("/confirm-email-sent", { state: { email } });
    } catch (error) {
      console.error(error);
      setEmail("");
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      void onSignupClick();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-rose-50">
      <div className="m-4 mb-10 text-3xl ">
        <h1 className="text-stone-800 font-space">
          Welcome to <br />
          <span className="font-bold font-space flex items-center justify-center">
            The Pattern's Place
            <img
              className="w-20 ml-4"
              src="./src/assets/tppLogo.png"
              alt="The Pattern's Place Logo"
            />
          </span>
        </h1>
        <p className="text-stone-800 text-base">
          We're a place <span className="font-extrabold">for sewists</span> to
          buy and sell patterns with features like video tutorials, reviews, and
          difficulty levels! <br /> We're currently under construction but would
          love to keep in contact. Drop your email below to stay updated!
        </p>
      </div>
      <div className="flex flex-col text-center justify-center">
        <div className="flex mt-1 justify-center items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm text-start mb-1 text-opacity-70">
              Signup with your email address
            </span>

            <div className="flex">
              <input
                value={email}
                id="email"
                placeholder="address@email.com"
                onChange={onEmailChange}
                onKeyDown={onKeyDown} // This line enables Enter key submission
                className="border p-2 rounded mr-4 text-stone-800"
              />
              <button
                onClick={onSignupClick}
                className="px-5 rounded p-2 flex justify-center items-center bg-stone-800 text-white hover:bg-stone-950"
              >
                Signup
              </button>
            </div>
            <span
              className={`text-red-700 text-sm text-start mb-1 text-opacity-70 ${
                errorMessage ? "block" : "invisible"
              }`}
              style={{ height: "1.25rem" }} // Optional, if you want more precise control
            >
              {errorMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
