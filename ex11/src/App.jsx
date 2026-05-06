import './App.css'
import HelloCGU from './components/HelloCGU'
import MultiButton from './components/MultiButton'

function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <HelloCGU />
        <div className="button-group">
          <MultiButton />
        </div>
      </section>
    </main>
  )
}

export default App
