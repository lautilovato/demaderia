import CardDashboard from "../components/dashboard/CardDashboard";
import { Package, CheckCircle2, Armchair, FileText } from 'lucide-react';
import CardListedModels from "../components/dashboard/CardListedModels";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-1">Panel de Control</h2>
        <p className="text-zinc-500 mb-6">Métricas actualizadas al día de hoy</p>
      </div>
      
      {/* Información de las tarjetas superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <CardDashboard title="Pedidos Activos" icon={Package} value="38" subtitle="En curso actualmente" theme="amber" />
        <CardDashboard title="Completados este Mes" icon={CheckCircle2} value="126" subtitle="+12% vs mes anterior" theme="green" />
        <CardDashboard title="Modelos en Catálogo" icon={Armchair} value="54" subtitle="12 añadidos este año" theme="zinc" />
        <CardDashboard title="Cotizaciones Pendientes" icon={FileText} value="17" subtitle="Requieren revisión" theme="orange" />
      </div>

      {/* Grilla para las tarjetas grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mt-2">
        {/* Gráfico de torta */}
        <div className="lg:col-span-3">
          <CardListedModels />
        </div>
        
        {/* Tarjeta 2: Actividad Reciente (Ocupa 5 de 8 columnas, equivalente a 2.5 de 4) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-zinc-200/80 border-dashed flex items-center justify-center text-zinc-400 p-6 h-full min-h-[300px]">
            Aquí irá el componente de Actividad Reciente...
          </div>
        </div>
      </div>

    </div>
  );
}