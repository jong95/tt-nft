import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
	// only for rinkeby
	// https://chainlist.org
  supportedChainIds: [1, 4, 137, 80001],
});
