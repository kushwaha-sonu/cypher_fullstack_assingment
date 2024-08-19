

const CameraPermissionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Camera Access Required</h2>
        <p className="mb-4">To proceed with the quiz, please allow camera access in your browser.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CameraPermissionModal;
