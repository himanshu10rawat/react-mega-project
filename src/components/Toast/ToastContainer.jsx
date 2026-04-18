import React from "react";
import { useToast } from "../../context/ToastContext";

/**
 * Toast Container Component
 * Displays all active toast notifications
 * Place this in your root App component
 */
export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type) => {
    const baseStyles =
      "px-4 py-3 rounded-lg shadow-lg text-white animate-fadeIn";

    switch (type) {
      case "success":
        return `${baseStyles} bg-green-500`;
      case "error":
        return `${baseStyles} bg-red-500`;
      case "warning":
        return `${baseStyles} bg-yellow-500`;
      case "info":
      default:
        return `${baseStyles} bg-blue-500`;
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} pointer-events-auto`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {getToastIcon(toast.type)}
              </span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-lg font-bold hover:opacity-70 transition-opacity shrink-0"
              aria-label="Close toast"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
