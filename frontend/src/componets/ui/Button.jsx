/* eslint-disable react/prop-types */
export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
}
