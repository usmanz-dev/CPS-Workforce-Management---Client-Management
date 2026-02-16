"use client"

import React from 'react';
import { Building, Calendar, Users, BarChart3, Plus, Settings, Zap } from 'lucide-react';

function QuickActions({ navigateTo, showNotification, openModal }) {
  const actions = [
    {
      title: "Manage Clients",
      icon: Building,
      color: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200",
      textColor: "text-white",
      description: "View and manage all clients",
      onClick: () => navigateTo("clients"),
    },
    {
      title: "Manage Surgeries",
      icon: Calendar,
      color: "bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      bgColor: "bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border-emerald-200",
      textColor: "text-white",
      description: "Schedule and track surgeries",
      onClick: () => navigateTo("surgeries"),
    },
    {
      title: "Staff Management",
      icon: Users,
      color: "bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700",
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 border-purple-200",
      textColor: "text-white",
      description: "Manage team members",
      onClick: () => showNotification("Loading Staff Management...", "info"),
    },
    {
      title: "Reports",
      icon: BarChart3,
      color: "bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      bgColor: "bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border-orange-200",
      textColor: "text-white",
      description: "View analytics and insights",
      onClick: () => showNotification("Loading Reports...", "info"),
    },
    {
      title: "Add Client",
      icon: Plus,
      color: "bg-gradient-to-br from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700",
      bgColor: "bg-gradient-to-r from-cyan-50 to-teal-50 hover:from-cyan-100 hover:to-teal-100 border-cyan-200",
      textColor: "text-white",
      description: "Register new client",
      onClick: () => openModal("addClient"),
    },
    {
      title: "Settings",
      icon: Settings,
      color: "bg-gradient-to-br from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700",
      bgColor: "bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 border-slate-200",
      textColor: "text-white",
      description: "System configuration",
      onClick: () => showNotification("Loading system settings...", "info"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Quick Actions</h3>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`group relative overflow-hidden ${action.bgColor} rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform`}
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3`}>
                {React.createElement(action.icon, { 
                  className: `w-7 h-7 ${action.textColor}` 
                })}
              </div>
              
              <div>
                <h4 className="text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  {action.description}
                </p>
              </div>
              
              {/* Hover indicator */}
              <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:w-8 transition-all duration-300"></div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">
            {actions.length} actions available
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 text-xs font-medium">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickActions;