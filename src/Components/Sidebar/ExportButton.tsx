import React from "react";

interface ExportButtonProps {
  onExport: () => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  return (
    <button className="btn-primary text-button mt-auto" onClick={onExport}>
      Export to PNG
    </button>
  );
};
