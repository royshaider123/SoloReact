import { React, useState } from 'react';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Home } from './Components/Home';

function App() {
  const [view, setView] = useState("login");

  const setUser = (nombre, contraseña) => {
    // Lógica para iniciar sesión
    console.log("Usuario:", nombre, "Contraseña:", contraseña);
    // Cambiar la vista a Home después de iniciar sesión
    setView("home");
  };

  const addUser = (nombre, contraseña) => {
    // Lógica para registrar usuario
    console.log("Usuario registrado:", nombre, "Contraseña:", contraseña);
    // Cambiar la vista a login después de registrar
    setView("login");
  };

  return (
    <div>
      {view === "login" && (
        <Login setUser={setUser} onShowRegister={() => setView("register")} />
      )}
      {view === "register" && (
        <Register addUser={addUser} onShowLogin={() => setView("login")} />
      )}
      {view === "home" && <Home />}
    </div>
  );
}

export default App;