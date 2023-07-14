import './App.css';
import Carousel from './carousel';

// eslint-disable-next-line require-jsdoc
function App() {
  const els = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="App">
      <header className="App-header">
        <Carousel left={<button>Left</button>} right={<button>Right</button>} distance={124} >
          {els.map((e)=><a href='www.google.com' key={e}>{e}</a>)}
        </Carousel>
      </header>
    </div>
  );
}

export default App;
