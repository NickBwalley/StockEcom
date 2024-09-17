import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // Error Messages
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Further details will be sent to you by your email at ${email}.`
      );
    }
  };

  return (
    <div className="max-w-container  max-w-full  dark:bg-gray-800 dark:text-white">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />
      <div className="flex justify-center items-center min-h-screen">
        {successMsg ? (
          <p className="w-96 font-medium text-green-500 text-center">
            {successMsg}
          </p>
        ) : (
          <form className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h1 className="font-titleFont font-semibold text-3xl mb-6 text-center">
              Fill up a Form
            </h1>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">
                  Name
                </p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-2 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor dark:bg-gray-800 dark:text-white"
                  type="text"
                  placeholder="Enter your name here"
                />
                {errClientName && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full py-2 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor dark:bg-gray-800 dark:text-white"
                  type="email"
                  placeholder="Enter your email here"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">
                  Messages
                </p>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  cols="30"
                  rows="4"
                  className="w-full py-2 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor dark:bg-gray-800 dark:text-white resize-none"
                  placeholder="Enter your message here"
                ></textarea>
                {errMessages && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errMessages}
                  </p>
                )}
              </div>
              <button
                onClick={handlePost}
                className="w-full bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
