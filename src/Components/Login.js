import { useState, useRef } from "react";
import "./Style.css";
import eyeOpen from "../Pictures/ojo_a.png";
import eyeClosed from "../Pictures/ojo_c.png";

export function Login({ setUser, onShowRegister }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState("");

    const MAX_LENGTH = 30; // Límite de caracteres
    const timersRef = useRef({});

    const handlePasswordChange = (setter, value) => {
        if (value.length > MAX_LENGTH) return;

        setter(value);

        if (timersRef.current[setter]) {
            clearTimeout(timersRef.current[setter]);
        }

        if (!showPassword) {
            const newValue = value.replace(/.(?=.)/g, "•"); // Ocultar todos los caracteres menos el último
            setter(newValue);

            timersRef.current[setter] = setTimeout(() => {
                setter((currentValue) => currentValue.replace(/./g, "•")); // Ocultar todos los caracteres
            }, 500); // Mostrar el último caracter durante 0.5 segundos
        } else {
            setVisiblePassword(value);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => {
            if (!prevShowPassword) {
                setVisiblePassword(contraseña);
            }
            return !prevShowPassword;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre === "" || contraseña === "") {
            setError(true);
            return;
        }

        setError(false);
        setUser(nombre, contraseña);
    };

    return (
        <section className="login">
            <h1>Login</h1>

            <form className="login" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                    maxLength={MAX_LENGTH}
                />
                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "text"}
                        value={showPassword ? visiblePassword : contraseña}
                        onChange={(e) => handlePasswordChange(setContraseña, e.target.value)}
                        placeholder="Contraseña"
                        maxLength={MAX_LENGTH}
                    />
                    <img
                        src={showPassword ? eyeOpen : eyeClosed}
                        alt={showPassword ? "Mostrar contraseña" : "Ocultar contraseña"}
                        onClick={handleTogglePasswordVisibility}
                        className="eye-icon"
                    />
                </div>
                <p>
                    ¿No tienes cuenta? <span className="registro-texto" onClick={onShowRegister}>Regístrate aquí</span>
                </p>
                <button type="submit">Iniciar sesión</button>
                {error && <p className="error">Por favor, complete todos los campos.</p>}
            </form>
        </section>
    );
}



