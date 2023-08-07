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
      <footer className="flex p-4 text-gray-100 text-xs justify-center" >
        <p>Designed and developed by</p> <a href="https://www.instagram.com/nscc_vitcc/" className="ml-2 font-bold underline"> NSCC</a>
      </footer>
    </div>
  );
}

export default App;
