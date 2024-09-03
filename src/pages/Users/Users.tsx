import React, { useState } from "react";
import secureLocalStorage from "../../utils/secureLocalStorage";
import stylesModule from "./Users.module.sass";

interface User {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = secureLocalStorage.getSecureItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [defaultUser, setDefaultUser] = useState<User>(() => {
    const storedDefaultUser = secureLocalStorage.getSecureItem("defaultUser");
    return storedDefaultUser ? JSON.parse(storedDefaultUser) : { email: "", password: "" };
  });

  const [error, setError] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [newUser, setNewUser] = useState<User>({ email: "", password: "", confirmPassword: "" });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 6 &&
      password.length <= 12 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const addUser = () => {
    if (validateEmail(newUser.email)) {
      if (validatePassword(newUser.password)) {
        if (newUser.password === newUser.confirmPassword) {
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          secureLocalStorage.setSecureItem("users", JSON.stringify(updatedUsers));
          setNewUser({ email: "", password: "", confirmPassword: "" });
          setError(null);
        } else {
          setError("Las contraseñas no coinciden");
        }
      } else {
        setError("La contraseña no es válida");
      }
    } else {
      setError("El correo es inválido");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const editUser = (index: number) => {
    const userToEdit = users[index];
    setNewUser({ ...userToEdit, confirmPassword: userToEdit.password });
    setEditingIndex(index);
  };

  const saveEditedUser = () => {
    if (validateEmail(newUser.email)) {
      if (validatePassword(newUser.password)) {
        if (newUser.password === newUser.confirmPassword) {
          const updatedUsers = [...users];
          updatedUsers[editingIndex!] = { email: newUser.email, password: newUser.password };
          setUsers(updatedUsers);
          secureLocalStorage.setSecureItem("users", JSON.stringify(updatedUsers));
          setNewUser({ email: "", password: "", confirmPassword: "" });
          setEditingIndex(null);
          setError(null);
        } else {
          setError("Las contraseñas no coinciden");
        }
      } else {
        setError("La contraseña no es válida");
      }
    } else {
      setError("El correo es inválido");
    }
  };

  const editDefaultUser = () => {
    setNewUser({ ...defaultUser, confirmPassword: defaultUser.password });
    setEditingIndex(-1);
  };

  const saveEditedDefaultUser = () => {
    if (validateEmail(newUser.email)) {
      if (validatePassword(newUser.password)) {
        if (newUser.password === newUser.confirmPassword) {
          setDefaultUser({ email: newUser.email, password: newUser.password });
          secureLocalStorage.setSecureItem("defaultUser", JSON.stringify({ email: newUser.email, password: newUser.password }));
          setNewUser({ email: "", password: "", confirmPassword: "" });
          setEditingIndex(null);
          setError(null);
        } else {
          setError("Las contraseñas no coinciden");
        }
      } else {
        setError("La contraseña no es válida");
      }
    } else {
      setError("El correo es inválido");
    }
  };

  return (
    <div className={stylesModule.container}>
      {error && <p className={stylesModule.error}>{error}</p>}
      <h2 className={stylesModule.heading}>Usuarios</h2>
      <input
        className={stylesModule.input}
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={newUser.email}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className={stylesModule.input}
        type="password"
        name="password"
        placeholder="Contraseña"
        value={newUser.password}
        onChange={handleChange}
         autoComplete="off"
      />
      <input
        className={stylesModule.input}
        type="password"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        value={newUser.confirmPassword}
        onChange={handleChange}
         autoComplete="off"
      />
      {editingIndex === null ? (
        <button className={stylesModule.button} onClick={addUser}>
          Agregar Usuario
        </button>
      ) : (
        <button
          className={stylesModule.button}
          onClick={editingIndex === -1 ? saveEditedDefaultUser : saveEditedUser}
        >
          Guardar Cambios
        </button>
      )}

      <h3 className={stylesModule.heading}>Editar Usuario Predeterminado</h3>
      <button className={stylesModule.button} onClick={editDefaultUser}>
        Editar Usuario Predeterminado
      </button>

      <h3 className={stylesModule.heading}>Lista de Usuarios</h3>
      <ul className={stylesModule.userList}>
        {users.map((user, index) => (
          <li key={index} className={stylesModule.userItem}>
            {user.email}
            <button onClick={() => editUser(index)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
