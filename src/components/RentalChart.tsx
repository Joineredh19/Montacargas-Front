import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface RentalChartProps {
  title: string;
  icon: LucideIcon;
  data: any[];
  dataKey: string;
  barColor: string;
  barName: string;
}

export function RentalChart({ title, icon: Icon, data, dataKey, barColor, barName }: RentalChartProps) {
  return (
    <Card className="bg-white shadow-xl hover:shadow-2xl rounded-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-orange-800 flex items-center">
          <Icon className="w-6 h-6 mr-2 text-orange-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#9a3412" />
              <YAxis stroke="#9a3412" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#fed7aa' }} />
              <Legend />
              <Bar dataKey={dataKey} fill={barColor} name={barName} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}