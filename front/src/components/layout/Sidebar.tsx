import { useState } from 'react';
import { Armchair, LayoutGrid, Layers3, Calculator, ShoppingCart } from 'lucide-react';

// estructura de los ítems de navegación
const sidebarItems = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Catálogo', icon: Layers3 },
  { label: 'Cotizador', icon: Calculator },
  { label: 'Pedidos', icon: ShoppingCart },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(sidebarItems[0].label);

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-zinc-50 p-6 flex flex-col gap-10 border-r border-zinc-100">
      
      {/* Sección del encabezado con el logo y nombre de la empresa */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center p-3">
          <Armchair className="w-full h-full text-amber-400 stroke-[1.5]" />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-zinc-900">Demaderia</h1>
          <p className="text-sm text-zinc-600">Panel Empleados</p>
        </div>
      </div>

      {/* Sección de navegación */}
      <nav className="flex flex-col gap-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            // Botón para cada ítem
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-colors duration-200 ${
                isActive
                  ? 'bg-zinc-100 text-zinc-900 font-medium' // Estilo activo
                  : 'text-zinc-700 hover:bg-zinc-100/70' // Estilo inactivo con hover
              }`}
            >
              <Icon className={`w-6 h-6 stroke-[1.5] ${isActive ? 'text-zinc-900' : 'text-zinc-600'}`}/>
              <span className="text-lg">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}