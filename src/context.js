import { useState, useContext, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [localPage, setLocalPage] = useState(
    localStorage.getItem("pagine-wp")
      ? JSON.parse(localStorage.getItem("pagine-wp"))
      : []
  );
  const [filterProducts, setFilterProducts] = useState([]);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getScrollPosition = (value) => {
    setScrollPosition(value);
  };

  const deleteScrollPosition = () => {
    setScrollPosition(0);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        scrollPosition,
        getScrollPosition,
        deleteScrollPosition,
        localPage,
        setLocalPage,
        filterProducts,
        setFilterProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
