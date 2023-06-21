import Counter from './components/Counter';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="container mx-auto flex flex-col h-screen">
      <Header />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
