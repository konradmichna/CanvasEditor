interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={`w-5 h-5 rounded-full ${
        isSelected ? "border-2 border-black25" : ""
      }`}
      style={{
        backgroundColor: color,
        boxShadow: isSelected ? "0 0 0 2px #fff" : "none",
      }}
      onClick={onClick}
    ></button>
  );
};
