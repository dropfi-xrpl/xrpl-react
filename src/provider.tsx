import { createContext } from 'react';

export interface XrplProviderConfig {
    // Add any future config options here
}

interface XrplContextValue {
    config?: XrplProviderConfig;
}

export const XrplContext = createContext<XrplContextValue | null>(null);

export interface XrplProviderProps {
    config?: XrplProviderConfig;
    children: React.ReactNode;
}

export const XrplProvider: React.FC<XrplProviderProps> = ({ config, children }) => {
    return <XrplContext.Provider value={{ config }}>{children}</XrplContext.Provider>;
};
