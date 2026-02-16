import { Clock, UserPlus, Building2, FileText, Settings } from 'lucide-react'

function RecentActivity() {
  const activities = [
    {
      message: "New surgery configured for Royal Victoria PCN",
      time: "2 hours ago",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      icon: Settings,
      type: "configuration"
    },
    {
      message: "Staff member added to Belfast City Client",
      time: "4 hours ago",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      icon: UserPlus,
      type: "user"
    },
    {
      message: "New PCN client added to system",
      time: "6 hours ago",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      icon: Building2,
      type: "client"
    },
    {
      message: "Monthly report generated",
      time: "1 day ago",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      icon: FileText,
      type: "report"
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          Recent Activity
        </h3>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 font-medium">Live</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon
          return (
            <div 
              key={index} 
              className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className={`flex-shrink-0 w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className={`w-5 h-5 ${activity.textColor}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500 font-medium">{activity.time}</p>
                  <div className={`w-1 h-1 ${activity.color} rounded-full`}></div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${activity.bgColor} ${activity.textColor}`}>
                    {activity.type}
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50">
          View All Activity
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default RecentActivity