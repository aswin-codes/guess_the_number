import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Card from "./components/Card";

function App() {

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-1 flex justify-center items-center font-nunito p-10">
        <Card/>
      </main>
    </div>
  );
}

export default App;
