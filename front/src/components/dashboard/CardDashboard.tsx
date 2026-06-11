import { type LucideIcon } from 'lucide-react';

type ColorTheme = 'amber' | 'green' | 'zinc' | 'orange';

const themeStyles: Record<ColorTheme, { bg: string; textIcon: string; textValue: string }> = {
  amber: {
    bg: 'bg-amber-100/50',
    textIcon: 'text-amber-600',
    textValue: 'text-amber-500',
  },
  green: {
    bg: 'bg-green-100/50',
    textIcon: 'text-green-600',
    textValue: 'text-green-500',
  },
  zinc: {
    bg: 'bg-zinc-100',
    textIcon: 'text-zinc-700',
    textValue: 'text-zinc-800',
  },
  orange: {
    bg: 'bg-orange-100/50',
    textIcon: 'text-orange-500',
    textValue: 'text-orange-500',
  },
};

interface CardDashboardProps {
  title: string;
  icon: LucideIcon;
  value: string | number;
  subtitle: string;
  theme: ColorTheme;
}

export default function CardDashboard({ title, icon: Icon, value, subtitle, theme }: CardDashboardProps) {
  const currentTheme = themeStyles[theme];

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex flex-col">
      {/* Título de la tarjeta */}
      <h3 className="text-zinc-500 font-medium mb-4">
        {title}
      </h3>

      {/* Contenedor del Icono con fondo dinámico */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${currentTheme.bg}`}>
        <Icon className={`w-6 h-6 stroke-[1.5] ${currentTheme.textIcon}`} />
      </div>

      {/* Valor principal con color dinámico */}
      <p className={`text-4xl font-bold mb-1 ${currentTheme.textValue}`}>
        {value}
      </p>

      {/* Subtítulo */}
      <p className="text-sm text-zinc-500">
        {subtitle}
      </p>
    </div>
  );
}