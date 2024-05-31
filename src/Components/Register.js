import { useState, useRef } from "react";
import "./Style.css";

export function Register({ addUser, onShowHome }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [contraseña2, setContraseña2] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const MAX_LENGTH = 40; // Límite de caracteres
    const timersRef = useRef({});

    const handlePasswordChange = (setter, value) => {
        if (value.length > MAX_LENGTH) return;

        setter(value);

        if (timersRef.current[setter]) {
            clearTimeout(timersRef.current[setter]);
        }

        const newValue = value.replace(/.(?=.)/g, "•"); // Ocultar todos los caracteres menos el último
        setter(newValue);

        timersRef.current[setter] = setTimeout(() => {
            setter((currentValue) => currentValue.replace(/./g, "•")); // Ocultar todos los caracteres
        }, 500); // Mostrar el último caracter durante 0.5 segundos
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre === "" || contraseña === "" || contraseña2 === "") {
            setError(true);
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }

        if (contraseña !== contraseña2) {
            setError(true);
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        setError(false);
        setErrorMessage("");
        addUser(nombre, contraseña);
    };

    return (
        <section className="login">
            <h1>Registro</h1>

            <form className="login" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    maxLength={MAX_LENGTH}
                />
                <input
                    type="text"
                    value={contraseña}
                    onChange={(e) => handlePasswordChange(setContraseña, e.target.value)}
                    placeholder="Contraseña"
                    maxLength={MAX_LENGTH}
                />
                <input
                    type="text"
                    value={contraseña2}
                    onChange={(e) => handlePasswordChange(setContraseña2, e.target.value)}
                    placeholder="Confirmar Contraseña"
                    maxLength={MAX_LENGTH}
                />
                <div>
                    <button type="submit" onClick={onShowHome}>Registrar</button>
                    {error && <p className="error">{errorMessage}</p>} 
                </div> 
            </form>
        </section>
    );
}
