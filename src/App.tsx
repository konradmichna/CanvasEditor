import { useState } from "react";
import { Canvas } from "./Components/Canvas/Canvas";
import { Header } from "./Components/Header/Header";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Alert } from "./Components/Alert/Alert"; // Import Alert
import startImage from "./assets/Images/startImage.png";
import html2canvas from "html2canvas";

function App() {
  const [elements, setElements] = useState<any[]>([]);
  const [background, setBackground] = useState<string | null>(startImage);
  const [isTextAdded, setIsTextAdded] = useState(false);
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [userBackground, setUserBackground] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false); // State for alert

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
    const element = elements.find((element) => element.id === id);
    const newElements = elements.filter((element) => element.id !== id);
    setElements(newElements);

    if (element?.type === "text") setIsTextAdded(false);
    if (element?.type === "image") setIsImageAdded(false);
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
    setUserBackground(true);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    addElement("image", imageUrl);
  };

  const handleExport = async () => {
    if (!elements.length && !userBackground) return;

    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
      const canvas = await html2canvas(canvasElement as HTMLElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "canvas.png";
      link.click();
    }
  };

  const handleReset = () => {
    setElements([]);
    setBackground(startImage);
    setIsTextAdded(false);
    setIsImageAdded(false);
    setUserBackground(false);
    setShowAlert(false); // Hide alert after resetting
  };

  return (
    <div className="flex justify-center gap-6 p-8 relative">
      {showAlert && (
        <Alert onConfirm={handleReset} onCancel={() => setShowAlert(false)} />
      )}
      <Canvas
        elements={elements}
        removeElement={removeElement}
        background={background}
        userBackground={userBackground}
        onElementClick={onElementClick}
        setTextContent={setTextContent}
      />
      <div className="flex flex-col">
        <Header onReset={() => setShowAlert(true)} /> {/* Pass onReset */}
        <Sidebar
          onAddText={() => addElement("text")}
          onAddImage={handleImageUpload}
          onChangeBackground={changeBackground}
          isTextAdded={isTextAdded}
          isImageAdded={isImageAdded}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}

export default App;
