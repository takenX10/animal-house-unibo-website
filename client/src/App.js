import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState("Loading...");

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p class="text-primary h1">{data}</p>
      </header>
    </div>
  );
}

export default App;