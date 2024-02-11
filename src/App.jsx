import { useState } from "react";
import BouncingLayout from "./components/BouncingTitle";

function App() {
  const [start, setStart] = useState(false);
  const handleProp = (activated) => {
    setStart(activated);
    console.log("hi!");
  };

  return (
    <>
      <BouncingLayout func={handleProp} curr={start} />
    </>
  );
}

export default App;
