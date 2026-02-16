 import { useMemo } from "react";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import '../Animation.css'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity,
  Clock,
  UserCheck,
  AlertCircle
} from "lucide-react";

// Mock components for demonstration
function StatsCard({ title, value, change, icon, color, trend }) {
  const iconMap = {
    building: Building2,
    users: Users,
    calendar: Calendar,
    chart: TrendingUp,
    activity: Activity,
    clock: Clock,
    userCheck: UserCheck,
    alert: AlertCircle
  };
  
  const Icon = iconMap[icon] || TrendingUp;
  
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]} bg-opacity-10`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-500">{change}</p>
    </div>
  );
}

 
 

function ClientOverview({ navigateTo }) {
  const clientData = [
    { name: 'Hospital A', staff: 45, utilization: 92 },
    { name: 'Hospital B', staff: 38, utilization: 87 },
    { name: 'Hospital C', staff: 52, utilization: 94 },
    { name: 'Clinic D', staff: 28, utilization: 78 },
    { name: 'Medical Center E', staff: 41, utilization: 89 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Client Overview</h2>
        <button 
          onClick={() => navigateTo?.("clients")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={clientData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="staff" fill="#3B82F6" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SurgeryStatus({ navigateTo }) {
  const surgeryData = [
    { name: 'Completed', value:94, color: '#10B981' },
    { name: 'Scheduled', value: 42, color: '#3B82F6' },
    { name: 'In Progress', value: 18, color: '#F59E0B' },
    { name: 'Cancelled', value: 7, color: '#EF4444' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Surgery Status</h2>
        <button 
          onClick={() => navigateTo?.("surgeries")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={surgeryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
            >
              {surgeryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {surgeryData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceChart() {
  const performanceData = [
    { month: 'Jan', utilization: 82, satisfaction: 88, efficiency: 79 },
    { month: 'Feb', utilization: 85, satisfaction: 90, efficiency: 83 },
    { month: 'Mar', utilization: 87, satisfaction: 89, efficiency: 86 },
    { month: 'Apr', utilization: 89, satisfaction: 92, efficiency: 88 },
    { month: 'May', utilization: 91, satisfaction: 94, efficiency: 90 },
    { month: 'Jun', utilization: 87, satisfaction: 91, efficiency: 87 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Trends</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorUtilization" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[70, 100]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="utilization"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorUtilization)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="satisfaction"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorSatisfaction)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-sm text-gray-600">Utilization Rate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">Client Satisfaction</span>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ navigateTo, showNotification, openModal }) {
  // Enhanced stats data with trends
  const stats = useMemo(() => [
    {
      title: "Total Clients",
      value: "8",
      change: "+2 this month",
      icon: "building",
      color: "blue",
      trend: 25
    },
    {
      title: "Active Staff",
      value: "247",
      change: "+12 this week",
      icon: "users",
      color: "green",
      trend: 5.1
    },
    {
      title: "Total Surgeries",
      value: "156",
      change: "Across all clients",
      icon: "calendar",
      color: "blue",
      trend: 8.3
    },
    {
      title: "Utilization Rate",
      value: "87%",
      change: "+5% vs last month",
      icon: "chart",
      color: "purple",
      trend: 5.7
    },
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Enhanced Header Section */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome to the CPS Workforce Management System
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',})}
            </p>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Cards Grid */}
      <section className="mb-8" aria-label="Key Statistics">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={`${stat.title}-${index}`}
              {...stat}
            />
          ))}
        </div>
      </section>
      
    {/* Quick Actions and Recent Activity */}
      <section className="mb-8" aria-label="Quick Actions and Activity">
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className=" lg:col-span-2">
            <QuickActions 
              navigateTo={navigateTo} 
              showNotification={showNotification} 
              openModal={openModal} 
            />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </section>

      {/* Performance Chart Section */}
      <section className="fade mb-8" aria-label="Performance Analytics">
        <PerformanceChart />
      </section>


      {/* Client and Surgery Overview */}
      <section aria-label="Overview Summary">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ClientOverview navigateTo={navigateTo} />
          <SurgeryStatus navigateTo={navigateTo} />
        </div>
      </section>

      
    </div>
  );
}

export default Dashboard;