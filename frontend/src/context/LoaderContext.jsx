import React, {createContext, useContext, useState} from "react";

const LoaderContext =createContext();

const useLoader = () => {
    const context = useContext(LoaderContext);
    if(!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};

const LoaderProvider = ({children}) => {
    const [laoding, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <LoaderContext.Provider value={{laoding,showLoader,hideLoader}}>
            {children}
            {laoding && (
                <div className="global-loader">
                    <div className="loader-spinner"></div>
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export default {useLoader, LoaderProvider};