'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const XrplContext = react.createContext(null);
const XrplProvider = ({ config, children }) => {
    return jsxRuntime.jsx(XrplContext.Provider, { value: { config }, children: children });
};

function useXrplReact() {
    const context = react.useContext(XrplContext);
    if (!context) {
        throw new Error('useXrplReact must be used within a XrplProvider');
    }
    const [address, setAddress] = react.useState();
    const [connectedAccounts, setConnectedAccounts] = react.useState([]);
    const [network, setNetwork] = react.useState('mainnet');
    const [initialized, setInitialized] = react.useState(false);
    const [error, setError] = react.useState(null);
    const [isConnecting, setIsConnecting] = react.useState(false);
    react.useEffect(() => {
        if (typeof window === 'undefined' || !window.xrpl)
            return;
        window.xrpl?.initialize?.();
        setInitialized(true);
    }, []);
    react.useEffect(() => {
        if (typeof window === 'undefined' || !window.xrpl)
            return;
        const handleSelectedNetwork = (val) => setNetwork(val);
        const handleSelectedAddress = (val) => setAddress(val);
        const handleConnectedAccounts = (val) => setConnectedAccounts(val);
        window.xrpl?.on?.('xrpl_selectedNetwork', handleSelectedNetwork);
        window.xrpl?.on?.('xrpl_selectedAddress', handleSelectedAddress);
        window.xrpl?.on?.('xrpl_connectedAccounts', handleConnectedAccounts);
        return () => {
            window.xrpl?.off?.('xrpl_selectedNetwork', handleSelectedNetwork);
            window.xrpl?.off?.('xrpl_selectedAddress', handleSelectedAddress);
            window.xrpl?.off?.('xrpl_connectedAccounts', handleConnectedAccounts);
        };
    }, []);
    const connect = async () => {
        setIsConnecting(true);
        try {
            if (!window.xrpl)
                throw new Error('No window.xrpl found');
            const response = await window.xrpl.connect();
            setAddress(response);
            return response;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setIsConnecting(false);
        }
    };
    const disconnect = async () => {
        if (!window.xrpl)
            throw new Error('No window.xrpl found');
        await window.xrpl.disconnect(address);
        setAddress(undefined);
    };
    const sendTransaction = async (tx) => {
        if (!window.xrpl)
            throw new Error('No window.xrpl found');
        return await window.xrpl.sendTransaction(tx);
    };
    const changeNetwork = async (network) => {
        if (!window.xrpl)
            throw new Error('No window.xrpl found');
        return await window.xrpl.changeNetwork(network);
    };
    const signMessage = async (message) => {
        if (!window.xrpl)
            throw new Error('No window.xrpl found');
        const res = await window.xrpl.signMessage(message);
        if (res.error)
            throw new Error(res.error);
        return res;
    };
    return react.useMemo(() => ({
        address,
        wallet: address,
        isConnected: connectedAccounts.includes(address || ''),
        connect,
        disconnect,
        sendTransaction,
        changeNetwork,
        connectedAccounts,
        network,
        error,
        isConnecting,
        signMessage,
        initialized,
    }), [address, connectedAccounts, network, error, isConnecting, initialized]);
}

exports.XrplProvider = XrplProvider;
exports.useXrplReact = useXrplReact;
//# sourceMappingURL=index.cjs.map
