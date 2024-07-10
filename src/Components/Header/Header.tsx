import React from "react";
import { Logo } from "./Logo";
import { Title } from "./Title";
import { ResetButton } from "./ResetButton";

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <div className="border-white98 flex w-[759px] items-center justify-between border-b-2 pb-6">
      <div className="flex items-center gap-3">
        <Logo />
        <Title />
      </div>
      <ResetButton onReset={onReset} />
    </div>
  );
};
