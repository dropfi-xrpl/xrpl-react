export {};

declare global {
    interface Window {
        xrpl?: XRPLProvider;
    }

    interface XRPLProvider {
        // DropFi-specific metadata
        isDropFi: true;
        selectedAddress: string | null;
        selectedNetwork: string | null;
        connectedAccounts: string[];
        network: string | null;
        endpoint: string | null;

        // Lifecycle methods
        initialize: () => Promise<void>;
        connect: (data?: any) => Promise<string>;
        disconnect: (address?: string) => Promise<void>;
        signMessage: (message: string) => Promise<{ signature: string; error?: string }>;
        sendTransaction: (tx: any) => Promise<any>;
        switchNetwork: (networkId: string) => Promise<any>;
        changeAccount: (account: string) => Promise<any>;
        changeNetwork: (network: string) => Promise<any>;
        isConnected: () => boolean;

        // Internal event system
        on: (event: XRPLProviderEvent, callback: (payload: any) => void) => void;
        off: (event: XRPLProviderEvent, callback?: (payload: any) => void) => void;
    }

    type XRPLProviderEvent = 'xrpl_selectedAddress' | 'xrpl_connectedAccounts' | 'xrpl_selectedNetwork' | 'xrpl_disconnect';
}
