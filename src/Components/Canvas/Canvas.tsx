import React from "react";
import { TextEditor } from "./TextEditor";
import { ImageEditor } from "./ImageEditor";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/canvasSize";

interface CanvasProps {
  elements: any[];
  removeElement: (id: number) => void;
  background: string | null;
  userBackground: boolean;
  onElementClick: (id: number | null) => void;
  setTextContent: (id: number, text: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  removeElement,
  background,
  userBackground,
  onElementClick,
  setTextContent,
}) => {
  const hasElements = elements.length > 0;

  return (
    <div
      className={`relative w-[${CANVAS_WIDTH}px] h-[${CANVAS_HEIGHT}px] ${
        hasElements && !userBackground ? "bg-black50" : "bg-center bg-cover"
      }`}
      style={{
        backgroundImage: userBackground
          ? `url(${background})`
          : hasElements
          ? "none"
          : `url(${background})`,
      }}
      onClick={() => onElementClick(null)}
    >
      {elements.map((element) =>
        element.type === "text" ? (
          <TextEditor
            key={element.id}
            id={element.id}
            isEditing={element.isEditing}
            removeElement={removeElement}
            onClickOutside={() => onElementClick(null)}
            textContent={element.textContent}
            setTextContent={setTextContent}
            setEditing={onElementClick}
          />
        ) : (
          <ImageEditor
            key={element.id}
            id={element.id}
            removeElement={removeElement}
            imageUrl={element.imageUrl}
          />
        )
      )}
    </div>
  );
};
