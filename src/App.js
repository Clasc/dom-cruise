import './App.css';
import Carousel from './carousel';

// eslint-disable-next-line require-jsdoc
function App() {
  const els = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="App">
      <header className="App-header">
        <Carousel>
          {els.map((e)=><h2 key={e}>{e}</h2>)}
        </Carousel>
      </header>
    </div>
  );
}

export default App;
