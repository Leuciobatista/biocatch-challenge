
import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [csid, setCsid] = useState(null);
  return (
    <SessionContext.Provider value={{ csid, setCsid }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
