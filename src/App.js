import React from 'react';
import './App.css';
import NftDataContainer from './containers/NftDataContainer';
import { Button } from 'react-bootstrap';
import useMetaMask from './hooks/metamask';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { connect, disconnect, isActive, account, shouldDisable, chainId } =
    useMetaMask();

  const query = useQuery();
  const blockId = query.get('blockId');
  console.log('tokenId: ', query.get('tokenId'));
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
                type: 'text',
                subType: 'h1',
                color: '#b1b1b1',
                content: 'DONE',
                botId: 'B1PAE2EDV',
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
