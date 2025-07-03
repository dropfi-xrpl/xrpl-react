export declare function useXrplReact(): {
    address: string | undefined;
    wallet: string | undefined;
    isConnected: boolean;
    connect: () => Promise<string>;
    disconnect: () => Promise<void>;
    sendTransaction: (tx: any) => Promise<any>;
    changeNetwork: (network: string) => Promise<any>;
    connectedAccounts: string[];
    network: string;
    error: string | null;
    isConnecting: boolean;
    signMessage: (message: string) => Promise<{
        signature: string;
        error?: string;
    }>;
    initialized: boolean;
};
