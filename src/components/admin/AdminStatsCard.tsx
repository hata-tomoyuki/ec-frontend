interface AdminStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function AdminStatsCard({
  title,
  value,
  subtitle,
}: AdminStatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      <p className="text-sm text-stone-500">{title}</p>
      <p className="text-3xl font-bold text-stone-900 mt-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-stone-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
