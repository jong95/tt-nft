import './App.css';
import NftDataContainer from './containers/NftDataContainer';
import { Button } from 'react-bootstrap';
import useMetaMask from './hooks/metamask';

function App() {
  const { connect, disconnect, isActive, account, shouldDisable } =
    useMetaMask();

  return (
    <div>
      <Button variant="secondary" onClick={connect} disabled={shouldDisable}>
        Connect to MetaMask
      </Button>
      <div className="mt-2 mb-2">
        Connected Account: {isActive ? account : ''}
      </div>
      <Button variant="danger" onClick={disconnect}>
        Disconnect MetaMask
      </Button>
      <hr />
      <NftDataContainer />
    </div>
  );
}

export default App;
