
import './App.css'

function App() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-2xl bg-white p-8 shadow-xl text-center max-w-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          ¡React + Tailwind funcionando! 🚀
        </h1>
        <p className="text-slate-600 mb-4">
          Ya puedes empezar a diseñar tu interfaz de usuario usando clases de utilidad.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Explorar componentes
        </button>
      </div>
    </div>
  )
}

export default App
