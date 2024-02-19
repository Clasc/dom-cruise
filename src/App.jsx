import './App.css';
import LinksDemo from './components/Demo/LinksDemo';
import CardsDemo from './components/Demo/CardsDemo';

// eslint-disable-next-line require-jsdoc
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <LinksDemo />
          <CardsDemo />
        </div>
      </header>
    </div>
  );
}

export default App;
