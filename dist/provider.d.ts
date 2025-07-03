export interface XrplProviderConfig {
}
interface XrplContextValue {
    config?: XrplProviderConfig;
}
export declare const XrplContext: import("react").Context<XrplContextValue | null>;
export interface XrplProviderProps {
    config?: XrplProviderConfig;
    children: React.ReactNode;
}
export declare const XrplProvider: React.FC<XrplProviderProps>;
export {};
