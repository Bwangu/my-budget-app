import { createContext, useState } from "react";

const modalContext = createContext(null);
export default modalContext;

export function ModalProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <modalContext.Provider value={{ isOpen, close, setOpen }}>
      {children}
    </modalContext.Provider>
  );
}
