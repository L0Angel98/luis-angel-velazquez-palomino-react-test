import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import secureLocalStorage from "../../utils/secureLocalStorage";
import { useNavigate } from "react-router-dom";
import stylesModule from './Login.module.sass'; // Importa los estilos Sass como módulos

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = secureLocalStorage.getSecureItem("defaultUser");
    const storedUsers = secureLocalStorage.getSecureItem("users");
    
    const defaultUser = storedUser ? JSON.parse(storedUser) : null;
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const validUser = 
      (defaultUser && email === defaultUser.email && password === defaultUser.password) ||
      users.some((user: { email: string; password: string }) => email === user.email && password === user.password);

    if (!validUser) {
      setError("Credenciales inválidas.");
      return;
    }

    setError(null);
    const token = "fake-jwt-token";
    secureLocalStorage.setSecureItem("authToken", token);
    dispatch(login(email));
    navigate("/products");
  };

  return (
    <div className={stylesModule.loginContainer}>
      <h2 className={stylesModule.loginHeader}>Login</h2>
      {error && <p className={stylesModule.loginError}>{error}</p>}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={stylesModule.loginInput}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`${stylesModule.loginInput} ${stylesModule.loginInputPassword}`}
      />
      <button
        onClick={handleLogin}
        className={stylesModule.loginButton}
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
