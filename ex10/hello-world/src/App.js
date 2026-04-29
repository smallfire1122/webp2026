import './App.css';

const styleArgument = {
  color: '#1f3c88',
};

function App() {
  const changeText = (event) => {
    event.target.innerText = `${event.target.innerText}被點了`;
  };

  return (
    <main className="page">
      <section className="card">
        <h1 style={styleArgument} onClick={changeText}>
          hello CGU!!
        </h1>
      </section>
    </main>
  );
}

export default App;
