import axios from "axios";
import { useState } from "react";
function App() {
  const sendRequest = async () => {
    console.log("sendRequest method was called ");
    await axios.post("http://localhost:3001/create", { text });
  };
  const [text, setText] = useState<string>();

  const updateText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <input type="text" placeholder="description" onChange={updateText} />
      <button onClick={sendRequest}>submit</button>
    </div>
  );
}

export default App;
