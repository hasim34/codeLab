import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && (
        <div className="global-loader">
          <div className="loader-orbit">
            <span className="orbit-dot"></span>
            <span className="orbit-dot"></span>
            <span className="orbit-dot"></span>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export default { useLoader, LoaderProvider };
