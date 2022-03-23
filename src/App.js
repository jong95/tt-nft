import React from 'react';
import './App.css';
import NftDataContainer from './containers/NftDataContainer';
import { Button } from 'react-bootstrap';
import useMetaMask from './hooks/metamask';
import { useLocation } from 'react-router-dom';

const newBlockId = Math.random() + '';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { connect, disconnect, isActive, account, shouldDisable, chainId } =
    useMetaMask();

  const query = useQuery();
  const blockId = query.get('blockId');
  const tokenId = query.get('tokenId');
  console.log('tokenId: ', tokenId);
  console.log('blockId: ', blockId);
  console.log('actionId: ', query.get('actionId'));

  const handleClick = () => {
    const data = [
      {
        // blockId: 73d56e44c4aa77a70e40f46ea7997e203e9d8d3c
        // actionType: 'show-toast',
        // actionData: {
        //   toastType: 'success',
        //   toastMessage: 'Successfully voted!',
        // },
        actionType: 'replace',
        actionData: [
          {
            blockId,
            blocks: [
              {
                type: 'reference',
                replaceId: 'options',
                botId: 'B1PAE2EDV',
                blockId: newBlockId,
                params: {
                  tokenId,
                },
              },
            ],
          },
        ],
      },
    ];

    window.location.replace(
      `https://padobox.vingle.network/plugin/revised/callback?data=${encodeURIComponent(
        JSON.stringify(data),
      )}`,
    );
  };

  return (
    <div>
      <Button variant="secondary" onClick={connect} disabled={shouldDisable}>
        Connect to MetaMask
      </Button>
      <div className="mt-2 mb-2">
        Connected Account: {isActive ? account : ''}
        <br />
        ChainId: {isActive ? chainId : ''}
      </div>
      <Button variant="danger" onClick={disconnect}>
        Disconnect MetaMask
      </Button>
      <hr />
      {/* <NftDataContainer /> */}
      <Button onClick={handleClick} type="button">
        Redirect
      </Button>
    </div>
  );
}

export default App;
