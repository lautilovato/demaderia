import CardDashboard from "../components/layout/CardDashboard";
import { Package, CheckCircle2, Armchair, FileText } from 'lucide-react';
export default function Dashboard() {
  return (
   <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900">Resumen General</h2>
        <p className="text-zinc-500">Métricas actualizadas al día de hoy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <CardDashboard 
          title="Pedidos Activos"
          icon={Package}
          value="38"
          subtitle="En curso actualmente"
          theme="amber"
        />

        <CardDashboard 
          title="Completados este Mes"
          icon={CheckCircle2}
          value="126"
          subtitle="+12% vs mes anterior"
          theme="green"
        />

        <CardDashboard 
          title="Modelos en Catálogo"
          icon={Armchair}
          value="54"
          subtitle="12 añadidos este año"
          theme="zinc"
        />

        <CardDashboard 
          title="Cotizaciones Pendientes"
          icon={FileText}
          value="17"
          subtitle="Requieren revisión"
          theme="orange"
        />

      </div>
    </div>
  );
}