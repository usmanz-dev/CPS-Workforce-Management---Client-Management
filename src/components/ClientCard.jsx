import React, { useState } from 'react';

function ClientCard({ client, navigateTo, showNotification }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusConfig = () => {
    const configs = {
      PCN: {
        dot: "bg-emerald-500 shadow-emerald-500/50",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        gradient: "from-emerald-50 to-green-50"
      },
      Regular: {
        dot: "bg-amber-500 shadow-amber-500/50", 
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        gradient: "from-amber-50 to-orange-50"
      }
    };
    return configs[client.type] || configs.Regular;
  };

  const getStatusStyle = () => {
    const styles = {
      Active: "text-emerald-600 bg-emerald-50 border-emerald-200",
      Inactive: "text-red-600 bg-red-50 border-red-200",
      Pending: "text-amber-600 bg-amber-50 border-amber-200"
    };
    return styles[client.status] || styles.Pending;
  };

  const handleQuickAction = (action, e) => {
    e.stopPropagation();
    const actions = {
      edit: () => showNotification(`Opening ${client.name} for editing...`, "info"),
      configure: () => navigateTo("surgery-config", { client }),
      staff: () => navigateTo("staff-management", { client }),
      reports: () => navigateTo("client-reports", { client })
    };
    actions[action]?.();
  };

  const config = getStatusConfig();

  return (
    <div 
      className={`group relative bg-white rounded-xl border border-gray-200 overflow-hidden
        transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-xl 
        ${isHovered ? 'shadow-lg' : 'shadow-sm'} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateTo("client-details", { client })}
    >
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-30 
        transition-opacity duration-300 ${isHovered ? 'opacity-50' : 'opacity-30'}`} />
      
      {/* Status Indicator Strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${config.dot.split(' ')[0]} 
        transition-all duration-300 ${isHovered ? 'h-2' : 'h-1'}`} />

      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`relative w-4 h-4 ${config.dot} rounded-full shadow-lg 
              animate-pulse transition-all duration-300`}>
              <div className={`absolute inset-0 ${config.dot} rounded-full animate-ping opacity-75`} />
            </div>
            <span className={`text-xs font-medium ${config.badge} px-3 py-1 rounded-full border 
              transition-all duration-200 hover:scale-105`}>
              {client.type} Client
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => handleQuickAction('edit', e)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg 
                transition-all duration-200 hover:scale-110"
              title="Edit Client"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg 
                transition-all duration-200 hover:scale-110"
              title="Toggle Details"
            >
              <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 
            transition-colors duration-200">
            {client.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {client.address}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="text-lg font-bold text-gray-900">{client.surgeries}</div>
            <div className="text-xs text-gray-600">Surgeries</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="text-lg font-bold text-gray-900">{client.staff}</div>
            <div className="text-xs text-gray-600">Staff</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusStyle()}`}>
              {client.status}
            </div>
          </div>
        </div>

        {/* Expandable Details */}
        <div className={`overflow-hidden transition-all duration-300 ease-out 
          ${isExpanded ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Last Updated:</span>
                <p className="font-medium">{client.lastUpdated || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-600">Contact:</span>
                <p className="font-medium">{client.contact || 'N/A'}</p>
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={(e) => handleQuickAction('configure', e)}
                className="flex-1 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg text-xs font-medium 
                  hover:bg-indigo-100 transition-colors duration-200"
              >
                Configure
              </button>
              <button
                onClick={(e) => handleQuickAction('staff', e)}
                className="flex-1 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-xs font-medium 
                  hover:bg-purple-100 transition-colors duration-200"
              >
                Staff
              </button>
              <button
                onClick={(e) => handleQuickAction('reports', e)}
                className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs font-medium 
                  hover:bg-green-100 transition-colors duration-200"
              >
                Reports
              </button>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo("client-details", { client });
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
              text-white py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 
              transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>View Details & Configure</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 
        transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />
    </div>
  );
}

export default ClientCard;