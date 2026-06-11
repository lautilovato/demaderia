import { CheckCircle2, FileText, Factory, Armchair, type LucideIcon } from 'lucide-react';

type Activity = {
  id: string;
  tittle: string;
  time: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
};

// Datos estáticos copiados exactamente de tu diseño
const actividades: Activity[] = [
  {
    id: '1',
    tittle: 'Pedido #PD-1040 marcado como completado',
    time: 'Hace 12 minutos',
    icon: CheckCircle2,
    bgColor: 'bg-green-100/50',
    iconColor: 'text-green-600',
  },
  {
    id: '2',
    tittle: 'Nueva cotización para Sillón Milano',
    time: 'Hace 45 minutos',
    icon: FileText,
    bgColor: 'bg-amber-100/50',
    iconColor: 'text-amber-600',
  },
  {
    id: '3',
    tittle: 'Pedido #PD-1041 entró en producción',
    time: 'Hace 2 horas',
    icon: Factory, // Usamos Factory (fábrica) para representar producción
    bgColor: 'bg-blue-100/50',
    iconColor: 'text-blue-600',
  },
  {
    id: '4',
    tittle: 'Modelo Sillón Nordic agregado al catálogo',
    time: 'Hace 5 horas',
    icon: Armchair,
    bgColor: 'bg-zinc-100',
    iconColor: 'text-zinc-600',
  },
];

export default function CardRecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex flex-col h-full">
      
      {/* Encabezado */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-zinc-900">Actividad Reciente</h3>
        <p className="text-sm text-zinc-500">Eventos del sistema</p>
      </div>

      {/* Lista de eventos */}
      <div className="flex flex-col gap-5">
        {actividades.map((actividad) => {
          const Icon = actividad.icon;
          return (
            <div key={actividad.id} className="flex items-start gap-4">
              
              {/* Contenedor del ícono circular */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${actividad.bgColor}`}>
                <Icon className={`w-5 h-5 stroke-[1.5] ${actividad.iconColor}`} />
              </div>

              {/* Textos del evento */}
              {/* Usamos pt-0.5 para alinear sutilmente la primera línea de texto con el centro del ícono */}
              <div className="flex flex-col pt-0.5">
                <p className="text-[15px] text-zinc-800 leading-tight">
                  {actividad.tittle}
                </p>
                <p className="text-sm text-zinc-500 mt-1">
                  {actividad.time}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}