import { useContext, useEffect, useMemo, useState } from 'react';
import { XrplContext } from './provider';

export function useXrplReact() {
  const context = useContext(XrplContext);
  if (!context) {
    throw new Error('useXrplReact must be used within a XrplProvider');
  }

  const [address, setAddress] = useState<string | undefined>();
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [network, setNetwork] = useState<string>('mainnet');
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const xrpl = window.xrpl;
    if (!xrpl) return;

    const handleSelectedNetwork = (val: string) => setNetwork(val);
    const handleSelectedAddress = (val: string) => setAddress(val);
    const handleConnectedAccounts = (val: string[]) => setConnectedAccounts(val);

    // 1) attach listeners
    xrpl.on?.('xrpl_selectedNetwork', handleSelectedNetwork);
    xrpl.on?.('xrpl_selectedAddress', handleSelectedAddress);
    xrpl.on?.('xrpl_connectedAccounts', handleConnectedAccounts);

    // 2) then initialize
    xrpl.initialize?.();
    setInitialized(true);

    return () => {
      xrpl.off?.('xrpl_selectedNetwork', handleSelectedNetwork);
      xrpl.off?.('xrpl_selectedAddress', handleSelectedAddress);
      xrpl.off?.('xrpl_connectedAccounts', handleConnectedAccounts);
    };
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    try {
      if (!window.xrpl) throw new Error('No window.xrpl found');
      const response = await window.xrpl.connect();
      setAddress(response);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (!window.xrpl) throw new Error('No window.xrpl found');
    await window.xrpl.disconnect(address);
    setAddress(undefined);
  };

  const sendTransaction = async (tx: any) => {
    if (!window.xrpl) throw new Error('No window.xrpl found');
    return await window.xrpl.sendTransaction(tx);
  };

  const changeNetwork = async (network: string) => {
    if (!window.xrpl) throw new Error('No window.xrpl found');
    return await window.xrpl.changeNetwork(network);
  };

  const signMessage = async (message: string) => {
    if (!window.xrpl) throw new Error('No window.xrpl found');
    const res = await window.xrpl.signMessage(message);
    if (res.error) throw new Error(res.error);
    return res;
  };

  return useMemo(
    () => ({
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
    }),
    [address, connectedAccounts, network, error, isConnecting, initialized],
  );
}
