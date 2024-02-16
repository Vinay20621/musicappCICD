import { createContext, useContext, useState } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => useContext(authContext);
