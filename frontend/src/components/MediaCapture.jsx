import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CameraPermissionModal from './CameraPermissionModal';

const MediaCapture = ({ cameraAllowed, setCameraAllowed }) => {
    const [showModal, setShowModal] = useState(true);
    const webcamRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const checkUrlAndRequestCameraAccess = async () => {
            if (location.pathname.includes('quiz')) {
                try {
                    // Request camera access manually
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    mediaStreamRef.current = stream;
                    setCameraAllowed(true);
                    setShowModal(false);

                    // Assign the stream to a video element (instead of using Webcam component)
                    if (webcamRef.current) {
                        webcamRef.current.srcObject = stream;
                    }
                } catch (err) {
                    console.error('Camera access denied:', err);
                    setCameraAllowed(false);
                }
            } else {
                // If the URL doesn't include 'quiz', stop the camera and reload the page
                setCameraAllowed(false);
                setShowModal(false);
                stopCameraStream();
                window.location.reload();
            }
        };

        const stopCameraStream = () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
                mediaStreamRef.current = null;
            }
            if (webcamRef.current) {
                webcamRef.current.srcObject = null;
            }
        };

        checkUrlAndRequestCameraAccess();

        const handleUrlChange = () => {
            stopCameraStream(); // Stop camera on URL change
            checkUrlAndRequestCameraAccess();
        };

        window.addEventListener('popstate', handleUrlChange);

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            stopCameraStream(); // Ensure the camera is stopped when the component unmounts
        };
    }, [location]);

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="relative">
            {showModal && <CameraPermissionModal onClose={handleModalClose} />}
            {cameraAllowed ? (
                <div className="fixed top-24 left-0 flex items-center justify-center">
                    <video
                        ref={webcamRef}
                        autoPlay
                        playsInline
                        muted
                        width="100%"
                        height="100%"
                        className="object-cover h-32 w-60"
                    />
                </div>
            ) : (
                !showModal && (
                    <div className="fixed top-0 left-0 w-full h-1/3 bg-gray-200 flex items-center justify-center">
                        <p className="text-black text-2xl font-semibold p-2">Requesting camera access...</p>
                    </div>
                )
            )}
        </div>
    );
};

export default MediaCapture;