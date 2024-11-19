import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface MetricasCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: {
    value: string;
    isPositive: boolean;
    text: string;
  };
  borderColor: string;
}

export function MetricasCard({ title, value, icon: Icon, trend, borderColor }: MetricasCardProps) {
  return (
    <Card className={`bg-white shadow-xl border-t-4 ${borderColor} hover:shadow-2xl rounded-lg transition-shadow`}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-semibold text-orange-700">{title}</CardTitle>
        <Icon className="h-6 w-6 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-orange-800">{value}</div>
        <p className="text-sm text-orange-600 mt-1 flex items-center">
          {trend.isPositive ? (
            <ArrowUpIcon className="w-5 h-5 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 text-red-500 mr-1" />
          )}
          <span className={trend.isPositive ? "text-green-600" : "text-red-600"}>
            {trend.value}
          </span>
          {" "}{trend.text}
        </p>
      </CardContent>
    </Card>
  );
}