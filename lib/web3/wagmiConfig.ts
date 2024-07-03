import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { http } from 'viem';
import { createConfig, type CreateConfigParameters } from 'wagmi';

import config from 'configs/app';
import currentChain from 'lib/web3/currentChain';
const feature = config.features.blockchainInteraction;

const wagmiConfig = (() => {
  const chains: CreateConfigParameters['chains'] = [ currentChain ];

  if (!feature.isEnabled) {
    const wagmiConfig = createConfig({
      chains: [ currentChain ],
      transports: {
        [currentChain.id]: http(config.chain.rpcUrl || `${ config.api.endpoint }/api/eth-rpc`),
      },
      ssr: true,
      batch: { multicall: { wait: 100 } },
    });

    return wagmiConfig;
  }
  // eslint-disable-next-line no-console
  console.log('feature.walletConnect', feature.walletConnect);

  const wagmiConfig = defaultWagmiConfig({
    chains,
    multiInjectedProviderDiscovery: true,
    transports: {
      [currentChain.id]: http(),
    },
    projectId: feature.walletConnect.projectId,
    metadata: {
      name: `${ config.chain.name } explorer`,
      description: `${ config.chain.name } explorer`,
      url: config.app.baseUrl,
      icons: [ config.UI.navigation.icon.default ].filter(Boolean),
    },
    enableEmail: true,
    ssr: true,
    batch: { multicall: { wait: 100 } },
  });

  return wagmiConfig;
})();

export default wagmiConfig;
