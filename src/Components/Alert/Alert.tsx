import React from "react";
import { CloseIcon } from "../../assets/Icons/CloseIcon";
import { AlertIcon } from "../../assets/Icons/AlertIcon";

interface AlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const Alert: React.FC<AlertProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-[620px] flex-col gap-6 rounded-[10px] bg-white px-32 py-10 shadow-lg">
        <button
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
          onClick={onCancel}
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center">
          <AlertIcon className="text-red mb-4 h-[290px] w-[290px]" />
          <h2 className="text-black100 mb-4 text-[32px] font-bold">WARNING</h2>
          <p className="text-black75 mb-8 text-center font-medium">
            You’re about to reset the whole process. Are you sure you want to do
            it?
          </p>
        </div>
        <div className="flex justify-center gap-8">
          <button onClick={onCancel}>Cancel</button>
          <button
            className="bg-primary text-button hover:bg-primary-dark h-[40px] w-[110px] rounded-[5px] px-4 py-2 text-white"
            onClick={onConfirm}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
