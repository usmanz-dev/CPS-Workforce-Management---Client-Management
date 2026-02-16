import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function SurgeriesPage({ navigateTo, showNotification, openModal }) {
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [surgeries, setSurgeries] = useState([
    {
      id: 1,
      name: "Cardiac Catheterization",
      client: "NeoHealth PCN",
      practice: "Golborne Medical Centre",
      type: "Cardiac",
      location: "Theatre 1",
      cpsStaff: 12,
      surgeryStaff: 4,
      status: "Active",
      urgency: "High",
    },
    {
      id: 2,
      name: "Hip Replacement Surgery",
      client: "West London Health PCN",
      practice: "Colville Health Centre",
      type: "Orthopaedic",
      location: "Theatre 2",
      cpsStaff: 8,
      surgeryStaff: 5,
      status: "Active",
      urgency: "Medium",
    },
    {
      id: 3,
      name: "Appendectomy",
      client: "North Thames PCN",
      practice: "Foreland Medical Centre",
      type: "General",
      location: "Theatre 3",
      cpsStaff: 6,
      surgeryStaff: 3,
      status: "Active",
      urgency: "High",
    },
    {
      id: 4,
      name: "Cataract Surgery",
      client: "NeoHealth PCN",
      practice: "West 10 GP Surgery",
      type: "Ophthalmology",
      location: "Theatre 4",
      cpsStaff: 4,
      surgeryStaff: 2,
      status: "Pending Setup",
      urgency: "Low",
    },
    {
      id: 5,
      name: "Laparoscopic Surgery",
      client: "Central London PCN",
      practice: "Paddington Green Health",
      type: "General",
      location: "Theatre 5",
      cpsStaff: 10,
      surgeryStaff: 4,
      status: "Active",
      urgency: "Medium",
    },
  ]);

  const handleManageSurgeryStaff = (surgery) => {
    navigateTo("surgery-staff", { surgery });
    showNotification(`Loading staff management for ${surgery.name}...`, "info");
  };

  const handleEditSurgery = (surgery) => {
    openModal("editSurgery", { surgery });
    showNotification(`Editing ${surgery.name} details...`, "info");
  };

  const handleAddSurgery = () => {
    openModal("addSurgery", {
      onAddSurgery: (newSurgery) => setSurgeries([...surgeries, newSurgery]),
    });
    showNotification("Opening new surgery form...", "info");
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200";
    if (status === "Active") {
      return `${baseClasses} bg-emerald-100 text-emerald-700 border border-emerald-200`;
    }
    return `${baseClasses} bg-amber-100 text-amber-700 border border-amber-200`;
  };

  const getUrgencyIndicator = (urgency) => {
    const baseClasses = "w-3 h-3 rounded-full";
    switch (urgency) {
      case "High":
        return `${baseClasses} bg-red-400 shadow-lg shadow-red-200`;
      case "Medium":
        return `${baseClasses} bg-yellow-400 shadow-lg shadow-yellow-200`;
      case "Low":
        return `${baseClasses} bg-green-400 shadow-lg shadow-green-200`;
      default:
        return `${baseClasses} bg-gray-400`;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Cardiac":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case "Orthopaedic":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );
      case "Ophthalmology":
        return (
          <svg
            className="w-5 h-5 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  // Filter surgeries based on selected filters
  const filteredSurgeries = surgeries.filter((surgery) => {
    const clientMatch =
      selectedClient === "All Clients" || surgery.client === selectedClient;
    const statusMatch =
      selectedStatus === "All Status" || surgery.status === selectedStatus;
    return clientMatch && statusMatch;
  });

  const totalSurgeries = filteredSurgeries.length;
  const activeSurgeries = filteredSurgeries.filter(
    (s) => s.status === "Active"
  ).length;
  const totalStaff = filteredSurgeries.reduce(
    (acc, surgery) => acc + surgery.cpsStaff + surgery.surgeryStaff,
    0
  );

  // Chart data
  const staffingData = surgeries.map((surgery) => ({
    name: surgery.practice.split(" ")[0],
    CPS: surgery.cpsStaff,
    Surgery: surgery.surgeryStaff,
    Total: surgery.cpsStaff + surgery.surgeryStaff,
  }));

  const statusData = [
    {
      name: "Active",
      value: surgeries.filter((s) => s.status === "Active").length,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: surgeries.filter((s) => s.status === "Pending Setup").length,
      color: "#f59e0b",
    },
    {
      name: "Expiring Soon",
      value: surgeries.filter((s) => s.status === "Expiring Soon").length,
      color: "#ef4444",
    },
    {
      name: "Inactive",
      value: surgeries.filter((s) => s.status === "Inactive").length,
      color: "#6b7280",
    },
  ].filter((entry) => entry.value > 0); // Only show statuses with data

  const urgencyData = [
    {
      name: "High",
      count: surgeries.filter((s) => s.urgency === "High").length,
    },
    {
      name: "Medium",
      count: surgeries.filter((s) => s.urgency === "Medium").length,
    },
    { name: "Low", count: surgeries.filter((s) => s.urgency === "Low").length },
  ];

  const clientList = [...new Set(surgeries.map((s) => s.client))];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Surgery Management
              </h2>
              <p className="text-gray-600 mt-1">
                Configure and monitor surgical operations across NHS PCNs
              </p>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Surgeries
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {totalSurgeries}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Active Operations
                  </p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">
                    {activeSurgeries}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Staff
                  </p>
                  <p className="text-3xl font-bold text-purple-600 mt-1">
                    {totalStaff}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Staffing Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={staffingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="CPS"
                    stackId="a"
                    fill="#3b82f6"
                    name="CPS Staff"
                  />
                  <Bar
                    dataKey="Surgery"
                    stackId="a"
                    fill="#10b981"
                    name="Surgery Staff"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Surgery Status
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Surgeon Urgency Levels
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={urgencyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-gray-100"
              >
                <option>All Clients</option>
                {clientList.map((client) => (
                  <option key={client} value={client}>
                    {client}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-gray-100"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending Setup</option>
                <option>Expiring Soon</option>
                <option>Inactive</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddSurgery}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Surgery
          </button>
        </div>
      </div>

      {/* Surgery Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg
              className="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Surgery Configurations
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Surgery Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  PCN & Practice
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Staffing
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filteredSurgeries.map((surgery) => (
                <tr
                  key={surgery.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors duration-200">
                          {getTypeIcon(surgery.type)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {surgery.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <span className="mr-2">{surgery.type}</span>
                          <div
                            className={getUrgencyIndicator(surgery.urgency)}
                            title={`${surgery.urgency} Priority`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {surgery.client}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {surgery.practice}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center mt-1">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {surgery.location}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                        <span className="text-gray-600">CPS:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {surgery.cpsStaff}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-gray-600">Surgery:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {surgery.surgeryStaff}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className={getStatusBadge(surgery.status)}>
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          surgery.status === "Active"
                            ? "bg-emerald-400"
                            : "bg-amber-400"
                        }`}
                      ></div>
                      {surgery.status}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleManageSurgeryStaff(surgery)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Manage Staff
                      </button>
                      <button
                        onClick={() => handleEditSurgery(surgery)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SurgeriesPage;
