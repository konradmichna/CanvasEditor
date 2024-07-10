import React from "react";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  text: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  text,
  disabled,
  ...buttonProps
}) => {
  return (
    <button {...buttonProps} disabled={disabled} className="btn-action">
      <Icon className="text-black75 mt-10 h-32 w-32" />
      <span className="text-black100 font-medium">{text}</span>
    </button>
  );
};
