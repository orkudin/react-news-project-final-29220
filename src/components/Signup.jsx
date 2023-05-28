import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch {
      setError(e.message);
      console.log(e.message);
    }
  };

  const togglePassword = () => {
    if (!passwordShown) {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordShown ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      onClick={togglePassword}
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Show password
                    </label>
                  </div>
                </div>
              </div>

              <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
                Sign up
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account yet?
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    // <div className="max-w-[700px] mx-auto my-16 p-4">
    //   <div>
    //     <h1 className="text-2xl font-bold py-2">Sign up to your account</h1>
    //     <p className="py-2">
    //       Already have an account yet?
    //       <Link to="/" className="underline">
    //         Sign In.
    //       </Link>
    //     </p>
    //   </div>
    //   <form onSubmit={handleSubmit}>
    //     <div className="flex flex-col py-2">
    //       <label className="py-2 font-medium">Email Address</label>
    //       <input
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="border p-3"
    //         type="email"
    //       ></input>
    //     </div>
    //     <div className="flex flex-col py-2">
    //       <label className="py-2 font-medium">Password</label>
    //       <input
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="border p-3"
    //         type={passwordShown ? "text" : "password"}
    //       />
    //       <div>
    //         <input type="checkbox" onClick={togglePassword} />
    //         Show Password
    //       </div>
    //     </div>
    //     <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
    //       Sign Up
    //     </button>
    //   </form>
    // </div>
  );
};

export default Signup;
