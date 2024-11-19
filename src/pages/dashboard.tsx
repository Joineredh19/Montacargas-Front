// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { Truck, Clock, DollarSign ,Briefcase } from 'lucide-react';
import { MetricasCard } from '@/components/metricas';
import { RentalChart } from '@/components/RentalChart';
import GeneralLayout from '@/components/GeneralLayout';

function DashboardPage() {

  
  const [metrics, setMetrics] = useState({
    totalForklifts: 0,
    activeRentals: 0,
    monthlyRevenue: 0,
    maintenanceCount: 0
  });

  interface RentalData {
    mes: string;
    alquileres: number;
    ingresos: number;
  }

  const [rentalData, setRentalData] = useState<RentalData[]>([]);

  useEffect(() => {
    // Aquí irían tus llamadas a la API
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simular datos - reemplazar con llamadas API reales
      setMetrics({
        totalForklifts: 12,
        activeRentals: 8,
        monthlyRevenue: 18500,
        maintenanceCount: 2
      });

      setRentalData([
        { mes: 'Ene', alquileres: 45, ingresos: 15000 },
        { mes: 'Feb', alquileres: 52, ingresos: 17800 },
        { mes: 'Mar', alquileres: 61, ingresos: 20500 },
        { mes: 'Abr', alquileres: 58, ingresos: 19200 },
        { mes: 'May', alquileres: 48, ingresos: 16500 },
        { mes: 'Jun', alquileres: 55, ingresos: 18300 },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-orange-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricasCard
          title="Total Montacargas"
          value={metrics.totalForklifts}
          icon={Truck}
          trend={{ value: "2", isPositive: true, text: "nuevos este mes" }}
          borderColor="border-orange-500"
        />
        <MetricasCard
          title="Alquileres Activos"
          value={metrics.activeRentals}
          icon={Clock}
          trend={{ value: "3", isPositive: true, text: "más que ayer" }}
          borderColor="border-yellow-500"
        />
        <MetricasCard
          title="Ingresos Mensuales"
          value={`$${metrics.monthlyRevenue}`}
          icon={DollarSign}
          trend={{ value: "12%", isPositive: true, text: "más que el mes pasado" }}
          borderColor="border-green-500"
        />
        <MetricasCard
          title="En Mantenimiento"
          value={metrics.maintenanceCount}
          icon={Briefcase}
          trend={{ value: "1", isPositive: false, text: "más que la semana pasada" }}
          borderColor="border-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RentalChart
          title="Alquileres por Mes"
          icon={Clock}
          data={rentalData}
          dataKey="alquileres"
          barColor="#f97316"
          barName="Número de Alquileres"
        />
        <RentalChart
          title="Ingresos Mensuales"
          icon={DollarSign}
          data={rentalData}
          dataKey="ingresos"
          barColor="#22c55e"
          barName="Ingresos ($)"
        />
      </div>
    </div>
  );
}

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default DashboardPage;
