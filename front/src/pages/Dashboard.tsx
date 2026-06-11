export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-zinc-900 mb-6">Resumen General</h2>
      
      {/* Contenedor de ejemplo para tarjetas del dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <h3 className="text-zinc-500 font-medium">Ventas de hoy</h3>
          <p className="text-3xl font-bold text-zinc-900 mt-2">$24,500</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <h3 className="text-zinc-500 font-medium">Nuevos Pedidos</h3>
          <p className="text-3xl font-bold text-zinc-900 mt-2">12</p>
        </div>
      </div>
    </div>
  );
}