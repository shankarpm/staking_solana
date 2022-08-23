import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header/Header';

const App = () =>{
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(
    () => [
      getPhantomWallet(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return(
    <>
      <Provider store={store}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <BrowserRouter>
              <Header />
                <Switch>
                  <Routes />
                </Switch>
            </BrowserRouter>
          </WalletProvider>
        </ConnectionProvider>
      </Provider>
    </>
  );
}

export default App;
