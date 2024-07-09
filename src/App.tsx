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

  const addElement = (type: string, imageUrl?: string) => {
    if (type === "text" && isTextAdded) return;
    if (type === "image" && isImageAdded) return;

    const id = new Date().getTime();
    setElements([
      ...elements,
      { id, type, isEditing: true, textContent: "", imageUrl: imageUrl || "" },
    ]);
    if (type === "text") setIsTextAdded(true);
    if (type === "image") setIsImageAdded(true);
  };

  const removeElement = (id: number) => {
    const newElements = elements.filter((element) => element.id !== id);
    setElements(newElements);
    if (newElements.length === 0) {
      setBackground(startImage);
      setIsTextAdded(false);
      setIsImageAdded(false);
    }
  };

  const onElementClick = (id: number | null) => {
    setElements(
      elements.map((element) =>
        element.id === id
          ? { ...element, isEditing: true }
          : { ...element, isEditing: false }
      )
    );
  };

  const setTextContent = (id: number, text: string) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, textContent: text } : element
      )
    );
  };

  const changeBackground = (bg: string) => {
    setBackground(bg);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    addElement("image", imageUrl);
  };

  return (
    <div className="flex justify-center gap-6 p-8">
      <Canvas
        elements={elements}
        removeElement={removeElement}
        background={background}
        onElementClick={onElementClick}
        setTextContent={setTextContent}
      />
      <div className="flex flex-col">
        <Header />
        <Sidebar
          onAddText={() => addElement("text")}
          onAddImage={handleImageUpload}
          onChangeBackground={changeBackground}
          isTextAdded={isTextAdded}
          isImageAdded={isImageAdded}
        />
      </div>
    </div>
  );
}

export default App;
