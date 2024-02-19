import './App.css';
import DemoCarousel from './components/DemoCarousel';

// eslint-disable-next-line require-jsdoc
function App() {
  const els = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <DemoCarousel
          >
            <div style={{ minWidth: 400, display: 'block', height: 300, background: 'orange' }} key="test">
              Test element
            </div>
            {els.map((e) => <a href="www.google.com" key={e}>
              <img src={`https://picsum.photos/seed/${e}/200`} />
            </a>)}</DemoCarousel>
        </div>
      </header>
    </div>
  );
}

export default App;
