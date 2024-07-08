import React from "react";
import { TextEditor } from "./TextEditor";
import { ImageEditor } from "./ImageEditor";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/canvasSize";
import startImage from "../../assets/Images/startImage.png";

interface CanvasProps {
  elements: any[];
  removeElement: (id: number) => void;
  background: string | null;
  onElementClick: (id: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  removeElement,
  background,
  onElementClick,
}) => {
  return (
    <div
      className={`relative w-[${CANVAS_WIDTH}px] h-[${CANVAS_HEIGHT}px] bg-center bg-cover`}
      style={{
        backgroundImage: `url(${background || startImage})`,
      }}
    >
      {elements.map((element) =>
        element.type === "text" ? (
          <div
            key={element.id}
            onClick={(e) => {
              e.stopPropagation();
              onElementClick(element.id);
            }}
          >
            <TextEditor
              id={element.id}
              isEditing={element.isEditing}
              removeElement={removeElement}
              onClickOutside={() => onElementClick(null)}
            />
          </div>
        ) : (
          <div
            key={element.id}
            onClick={(e) => {
              e.stopPropagation();
              onElementClick(element.id);
            }}
          >
            <ImageEditor id={element.id} removeElement={removeElement} />
          </div>
        )
      )}
    </div>
  );
};
