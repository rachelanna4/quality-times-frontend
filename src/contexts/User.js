import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const RequiresLogin = ({ isLoggedIn, children }) => {
  return <section>{isLoggedIn && children}</section>;
};

export const RequiresGuest = ({ isLoggedIn, children }) => {
  return <section>{!isLoggedIn && children}</section>;
};
