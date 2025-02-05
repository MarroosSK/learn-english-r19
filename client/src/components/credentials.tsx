import { useState } from "react";

const Credentials = () => {
  const [openCred, setOpenCred] = useState(false);
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-[38] bg-gray-200 text-center">
      {openCred ? (
        <button onClick={() => setOpenCred(!openCred)}>X</button>
      ) : (
        <button onClick={() => setOpenCred(!openCred)}>
          Log in with this email & password (click)
        </button>
      )}
      {openCred && (
        <>
          <p>
            <span className="font-bold">E-mail:</span>{" "}
            english3+clerk_test@example.com
          </p>
          <p>
            <span className="font-bold">password:</span> english3learning3
          </p>
        </>
      )}
    </div>
  );
};

export default Credentials;
