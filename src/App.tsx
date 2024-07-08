import { useState } from "react";
import { Canvas } from "./Components/Canvas/Canvas";
import { Header } from "./Components/Header/Header";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import startImage from "./assets/Images/startImage.png";

function App() {
  const [elements, setElements] = useState<any[]>([]);
  const [background, setBackground] = useState<string | null>(startImage);
  const [isTextAdded, setIsTextAdded] = useState(false);
  const [isImageAdded, setIsImageAdded] = useState(false);

  const addElement = (type: string) => {
    const id = new Date().getTime();
    setElements([...elements, { id, type, isEditing: true }]);
    setBackground(null); // Ustawienie tła na null przy dodaniu nowego elementu

    if (type === "text") {
      setIsTextAdded(true);
    } else if (type === "image") {
      setIsImageAdded(true);
    }
  };

  const removeElement = (id: number) => {
    const element = elements.find((el) => el.id === id);
    setElements(elements.filter((element) => element.id !== id));

    if (element.type === "text") {
      setIsTextAdded(false);
    } else if (element.type === "image") {
      setIsImageAdded(false);
    }

    if (elements.length === 1) {
      setBackground(startImage); // Przywrócenie startowego obrazu, gdy nie ma elementów
    }
  };

  const changeBackground = (bg: string) => {
    setBackground(bg);
  };

  const handleElementClick = (id: number) => {
    setElements(
      elements.map((element) =>
        element.id === id
          ? { ...element, isEditing: true }
          : { ...element, isEditing: false }
      )
    );
  };

  const handleClickOutside = () => {
    setElements(elements.map((element) => ({ ...element, isEditing: false })));
  };

  return (
    <div
      className="flex flex-grow justify-center gap-6 p-8"
      onClick={handleClickOutside}
    >
      <Canvas
        elements={elements}
        removeElement={removeElement}
        background={background}
        onElementClick={handleElementClick}
      />
      <div className="flex flex-col">
        <Header />
        <Sidebar
          onAddText={() => addElement("text")}
          onAddImage={() => addElement("image")}
          onChangeBackground={changeBackground}
          isTextAdded={isTextAdded}
          isImageAdded={isImageAdded}
        />
      </div>
    </div>
  );
}

export default App;
