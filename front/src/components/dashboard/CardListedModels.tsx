const chartData = [
  { id: 'milano', label: 'Milano', percentage: 42, colorCode: '#cba353', tailwindBg: 'bg-[#cba353]' },
  { id: 'aspen', label: 'Aspen', percentage: 28, colorCode: '#2e2e2e', tailwindBg: 'bg-[#2e2e2e]' },
  { id: 'verona', label: 'Verona', percentage: 18, colorCode: '#dfc48c', tailwindBg: 'bg-[#dfc48c]' },
  { id: 'nordic', label: 'Nordic', percentage: 12, colorCode: '#9ca3af', tailwindBg: 'bg-[#9ca3af]' },
];

export default function ModelosCotizadosCard() {
  // Generamos el gradiente cónico dinámicamente basado en los porcentajes
  let cumulativePercent = 0;
  const gradientStops = chartData.map(item => {
    const start = cumulativePercent;
    cumulativePercent += item.percentage;
    return `${item.colorCode} ${start}% ${cumulativePercent}%`;
  }).join(', ');

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex flex-col h-full">
      
      {/* Encabezado de la tarjeta */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-zinc-900">Modelos Más Cotizados</h3>
        <p className="text-sm text-zinc-500">Distribución de cotizaciones por modelo</p>
      </div>

      {/* Contenedor del Gráfico y la Leyenda */}
      <div className="flex items-center justify-between gap-8 px-2 flex-1">
        
        {/* Gráfico de Dona (Hecho con CSS) */}
        <div 
          className="w-32 h-32 rounded-full relative flex items-center justify-center shrink-0 shadow-inner"
          style={{ background: `conic-gradient(${gradientStops})` }}
        >
          {/* Círculo central blanco que crea el "agujero" de la dona */}
          <div className="w-16 h-16 bg-white rounded-full absolute"></div>
        </div>

        {/* Leyenda de datos */}
        <div className="flex flex-col gap-3 w-full max-w-[120px]">
          {chartData.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {/* Cuadradito de color */}
                <span className={`w-3 h-3 rounded-md ${item.tailwindBg}`}></span>
                <span className="text-zinc-600">{item.label}</span>
              </div>
              <span className="font-semibold text-zinc-900">{item.percentage}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}