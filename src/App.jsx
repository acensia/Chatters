import { useState } from "react";
import BouncingLayout from "./components/BouncingTitle";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BouncingLayout />
    </>
  );
}

export default App;
