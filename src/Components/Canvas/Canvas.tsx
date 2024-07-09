import { forwardRef } from "react";
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
  setEditing: (id: number) => void;
  onClickOutside: (id: number) => void;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  (
    {
      elements,
      removeElement,
      background,
      userBackground,
      onElementClick,
      setTextContent,
      setEditing,
      onClickOutside,
    },
    ref
  ) => {
    const hasElements = elements.length > 0;

    return (
      <div
        ref={ref}
        id="canvas"
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
              onClickOutside={() => onClickOutside(element.id)}
              textContent={element.textContent}
              setTextContent={setTextContent}
              setEditing={setEditing}
            />
          ) : (
            <ImageEditor
              key={element.id}
              id={element.id}
              isEditing={element.isEditing}
              removeElement={removeElement}
              imageUrl={element.imageUrl}
              setEditing={setEditing}
              onClickOutside={() => onClickOutside(element.id)}
            />
          )
        )}
      </div>
    );
  }
);
