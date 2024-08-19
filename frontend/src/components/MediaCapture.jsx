// import React, { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";

// const MediaCapture = () => {
//   const [cameraAllowed, setCameraAllowed] = useState(false);
//   const [error, setError] = useState(null);
//   const webcamRef = useRef(null);

//   useEffect(() => {
//     const requestCameraAccess = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "user" },
//         });
//         setCameraAllowed(true);
//       } catch (err) {
//         setError("Please allow camera access to continue.");
//         console.log(err);
//       }
//     };

//     requestCameraAccess();
//   }, []);

//   return (
//     <div className="fixed top-24 right-5 flex items-end justify-center">
//       <div className="max-w-sm mx-auto">
//         {error && <p className="text-red-500">{error}</p>}
//         {cameraAllowed ? (
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             videoConstraints={{ facingMode: "user" }}
//             width="100%"
//             height="100%"
//             className="object-cover h-32 w-60"
//           />
//         ) : (
//           <p className="text-white text-center">Requesting camera access...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MediaCapture;



import  { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import CameraPermissionModal from './CameraPermissionModal'; // Adjust the path as needed

const MediaCapture = () => {
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const webcamRef = useRef(null);

  useEffect(() => {
    const requestCameraAccess = async () => {
      if (cameraAllowed) return; // If camera is already allowed, no need to request again

      try {
        // Request camera access when user acknowledges the modal
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraAllowed(true);
        setShowModal(false); // Hide modal if access is granted
      } catch (err) {
        // Handle the error if access is denied
        console.error('Camera access denied:', err);
        setCameraAllowed(false);
      }
    };

    if (!cameraAllowed) {
      requestCameraAccess();
    }
  }, [cameraAllowed]);

  const handleModalClose = () => {
    // Request camera access when modal is closed
    setShowModal(false);
    setCameraAllowed(false); // Reset state to request camera access
  };

  return (
    <div className="relative">
      {showModal && (
        <CameraPermissionModal onClose={handleModalClose} />
      )}
      {cameraAllowed ? (
        <div className="fixed top-0 left-0 w-full h-1/3 bg-gray-800 flex items-center justify-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={{ facingMode: 'user' }}
            width="100%"
            height="100%"
            className="object-cover"
          />
        </div>
      ) : (
        !showModal && (
          <div className="fixed top-0 left-0 w-full h-1/3 bg-gray-800 flex items-center justify-center">
            <p className="text-white">Requesting camera access...</p>
          </div>
        )
      )}
    </div>
  );
};

export default MediaCapture;



