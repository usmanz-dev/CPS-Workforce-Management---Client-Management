import { useState, useMemo } from "react";
import ClientCard from "./ClientCard";

function ClientsPage({ navigateTo, showNotification, openModal }) {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Royal Victoria PCN",
      address: "274 Grosvenor Road, Belfast BT12 6BA",
      type: "PCN",
      surgeries: 12,
      staff: 45,
      status: "Active",
      lastActivity: "2024-08-20",
      revenue: "£125,000",
      contactPerson: "Dr. Sarah Mitchell",
      phone: "+44 28 9063 2100",
    },
    {
      id: 2,
      name: "Belfast City PCN",
      address: "51 Lisburn Road, Belfast BT9 7AB",
      type: "PCN",
      surgeries: 8,
      staff: 38,
      status: "Active",
      lastActivity: "2024-08-22",
      revenue: "£98,500",
      contactPerson: "Dr. Michael O'Connor",
      phone: "+44 28 9066 3400",
    },
    {
      id: 3,
      name: "Ulster Non-PCN",
      address: "Upper Newtownards Road, Dundonald BT16 1RH",
      type: "Non-PCN",
      surgeries: 6,
      staff: 32,
      status: "Pending Setup",
      lastActivity: "2024-08-18",
      revenue: "£0",
      contactPerson: "Dr. Emma Thompson",
      phone: "+44 28 9048 7200",
    },
    {
      id: 4,
      name: "Antrim Coast PCN",
      address: "Marine Road, Ballycastle BT54 6BN",
      type: "PCN",
      surgeries: 5,
      staff: 28,
      status: "Active",
      lastActivity: "2024-08-23",
      revenue: "£76,200",
      contactPerson: "Dr. James Wilson",
      phone: "+44 28 2076 2024",
    },
    {
      id: 5,
      name: "Derry City PCN",
      address: "Strand Road, Derry BT48 7AB",
      type: "PCN",
      surgeries: 10,
      staff: 42,
      status: "Inactive",
      lastActivity: "2024-07-15",
      revenue: "£110,000",
      contactPerson: "Dr. Patricia Kelly",
      phone: "+44 28 7126 1234",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "All" || client.type === filterType;
      const matchesStatus =
        filterStatus === "All" || client.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "surgeries":
          return b.surgeries - a.surgeries;
        case "staff":
          return b.staff - a.staff;
        case "revenue":
          const aRevenue = parseFloat(a.revenue.replace(/[£,]/g, ""));
          const bRevenue = parseFloat(b.revenue.replace(/[£,]/g, ""));
          return bRevenue - aRevenue;
        case "lastActivity":
          return new Date(b.lastActivity) - new Date(a.lastActivity);
        default:
          return 0;
      }
    });
  }, [clients, searchTerm, filterType, filterStatus, sortBy]);

  const getStatusCounts = () => {
    const counts = clients.reduce((acc, client) => {
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const statusCounts = getStatusCounts();
  const totalRevenue = clients.reduce((sum, client) => {
    return sum + parseFloat(client.revenue.replace(/[£,]/g, ""));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Client Management
            </h2>
            <p className="text-gray-600">
              Manage PCN and Non-PCN clients across Northern Ireland
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">
                {clients.length}
              </div>
              <div className="text-sm text-gray-600">Total Clients</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">
                £{totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div className="text-2xl font-bold text-orange-600">
                {statusCounts["Active"] || 0}
              </div>
              <div className="text-sm text-gray-600">Active Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Search clients by name, address, or contact person..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="PCN">PCN Only</option>
              <option value="Non-PCN">Non-PCN Only</option>
            </select>

            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Setup">Pending Setup</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="surgeries">Sort by Surgeries</option>
              <option value="staff">Sort by Staff</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="lastActivity">Sort by Last Activity</option>
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal("addClient")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center shadow-sm"
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
                ></path>
              </svg>
              Add New Client
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-medium">{filteredAndSortedClients.length}</span>{" "}
          of <span className="font-medium">{clients.length}</span> clients
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Clients Grid/List */}
      {filteredAndSortedClients.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No clients found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms or filters."
              : "Get started by adding your first client."}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredAndSortedClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              navigateTo={navigateTo}
              showNotification={showNotification}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientsPage;
