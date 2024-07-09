import React from "react";
import { CloseIcon } from "../../assets/Icons/CloseIcon";
import { AlertIcon } from "../../assets/Icons/AlertIcon";

interface AlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const Alert: React.FC<AlertProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50   flex items-center justify-center">
      <div className="bg-white rounded-[10px] shadow-lg relative w-[620px] py-10 px-32 gap-6 flex flex-col">
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
          onClick={onCancel}
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <AlertIcon className="w-[290px] h-[290px] mb-4 text-red" />
          <h2 className="text-[32px] font-bold mb-4 text-black100">WARNING</h2>
          <p className="text-center mb-8 font-medium text-black75">
            You’re about to reset the whole process. Are you sure you want to do
            it?
          </p>
        </div>
        <div className="flex gap-8 justify-center">
          <button onClick={onCancel}>Cancel</button>
          <button
            className="px-4 py-2 bg-primary text-white text-button rounded-[5px] hover:bg-primary-dark w-[110px] h-[40px]"
            onClick={onConfirm}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
