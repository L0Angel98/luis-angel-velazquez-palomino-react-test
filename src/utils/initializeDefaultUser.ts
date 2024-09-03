import secureLocalStorage from "./secureLocalStorage";

const initializeDefaultUser = () => {
  const defaultUser = {
    email: "default@example.com",
    password: "Default123!",
  };

  // Verifica si ya existe un usuario en el almacenamiento
  if (!secureLocalStorage.getSecureItem("defaultUser")) {
    secureLocalStorage.setSecureItem("defaultUser", JSON.stringify(defaultUser));
  }
};

export default initializeDefaultUser;
