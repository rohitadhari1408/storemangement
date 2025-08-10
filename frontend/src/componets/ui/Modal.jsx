// import React from "react";
// import { createPortal } from "react-dom";
// import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
// import { XMarkIcon } from "@heroicons/react/24/solid";

// const Modal = ({ open, handler, title, size, className = "", children }) => {
//   if (!open) return null;

//   return createPortal(
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
//       aria-modal="true"
//       role="dialog"
//     >
//       <Dialog
//         open={open}
//         handler={handler}
//         size={size}
//         className={`${className} max-h-[95vh] overflow-y-auto relative`}
//       >
//         {/* Close Button */}
//         <button
//           onClick={handler}
//           className="absolute right-2 top-2"
//           aria-label="Close Modal"
//         >
//           <XMarkIcon className="size-6 md:size-7 text-gray-800 hover:text-red-700 transition-all duration-200" />
//         </button>

//         {/* Header */}
//         <DialogHeader className="font-poppins capitalize text-black text-lg md:text-xl font-normal flex items-center justify-center border-b border-gray-500">
//           {title}
//         </DialogHeader>

//         {/* Body */}
//         <DialogBody>{children}</DialogBody>
//       </Dialog>
//     </div>,
//     document.body
//   );
// };

// export default Modal;
import React from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ open, handler, title, className = "", children }) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      aria-modal="true"
      role="dialog"
    >
      <div className={`bg-white rounded-lg shadow-lg max-h-[95vh] overflow-y-auto relative w-full max-w-lg ${className}`}>
        {/* Close Button */}
        <button
          onClick={handler}
          className="absolute right-2 top-2"
          aria-label="Close Modal"
        >
          <XMarkIcon className="size-6 md:size-7 text-gray-800 hover:text-red-700 transition-all duration-200" />
        </button>

        {/* Header */}
        <div className="font-poppins capitalize text-black text-lg md:text-xl font-normal flex items-center justify-center border-b border-gray-500 py-4">
          {title}
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
