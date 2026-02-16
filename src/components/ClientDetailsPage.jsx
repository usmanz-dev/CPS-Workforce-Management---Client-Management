import { useState } from "react";
import { 
  ChevronLeft, 
  FileText, 
  Edit3, 
  Building, 
  Users, 
  Calendar, 
  MapPin, 
  Settings,
  Plus,
  UserCheck,
  Stethoscope
} from "lucide-react";

function ClientDetailsPage({ client, navigateTo, showNotification, openModal }) {
  const [activeTab, setActiveTab] = useState("cps");
  const [editingClient, setEditingClient] = useState(false);
  const [editingSurgery, setEditingSurgery] = useState(null);
  const [clientData, setClientData] = useState(client);

  const [surgeries, setSurgeries] = useState([
    {
      id: 1,
      name: "Cardiology Surgery",
      address: "Theatre 1, Main Building",
      contractRenewal: "2025-01-15",
      contractExpiry: "2026-01-15",
      cpsStaff: 8,
      surgeryStaff: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Orthopedic Surgery",
      address: "Theatre 2, West Wing",
      contractRenewal: "2025-03-20",
      contractExpiry: "2026-03-20",
      cpsStaff: 6,
      surgeryStaff: 4,
      status: "Active",
    },
    {
      id: 3,
      name: "General Surgery",
      address: "Theatre 3, East Wing",
      contractRenewal: "2025-06-10",
      contractExpiry: "2026-06-10",
      cpsStaff: 0,
      surgeryStaff: 2,
      status: "Pending Setup",
    },
  ]);

  if (!clientData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <FileText className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No client selected</h3>
        <p className="text-gray-500 mb-8 max-w-md text-lg">
          Select a client from the list to view their details and manage surgery configurations.
        </p>
        <button 
          onClick={() => navigateTo("clients")} 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Clients
        </button>
      </div>
    );
  }

  const getClientTypeColors = () => {
    if (clientData.type === "PCN") {
      return {
        dot: "bg-gradient-to-r from-emerald-400 to-emerald-600",
        badge: "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border border-emerald-200",
        gradient: "from-emerald-500 to-emerald-600"
      };
    }
    return {
      dot: "bg-gradient-to-r from-amber-400 to-amber-600",
      badge: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200",
      gradient: "from-amber-500 to-amber-600"
    };
  };

  const colors = getClientTypeColors();

  const handleManageSurgeryStaff = (surgery) => {
    navigateTo("surgery-staff", { surgery });
    showNotification(`Loading staff management for ${surgery.name}...`, "info");
  };

  const handleClientEdit = (updatedData) => {
    setClientData(updatedData);
    setEditingClient(false);
    showNotification("Client information updated successfully!", "success");
  };

  const handleSurgeryEdit = (updatedSurgery) => {
    setSurgeries(surgeries.map(s => s.id === updatedSurgery.id ? updatedSurgery : s));
    setEditingSurgery(null);
    showNotification("Surgery information updated successfully!", "success");
  };

  const handleAddSurgery = (newSurgery) => {
    setSurgeries([...surgeries, newSurgery]);
    showNotification("Surgery added successfully!", "success");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Client Edit Form
  const ClientEditForm = () => {
    const [formData, setFormData] = useState({

      name: clientData.name,
      address: clientData.address,
      type: clientData.type
    });

    const handleSubmit = () => {
      handleClientEdit({ ...clientData, ...formData });
    };

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <Edit3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Client Information</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
            <input
            required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            >
              <option value="PCN">PCN</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingClient(false)}
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Surgery Edit Form
  const SurgeryEditForm = ({ surgery }) => {
    const [formData, setFormData] = useState({
      name: surgery.name,
      address: surgery.address,
      contractRenewal: surgery.contractRenewal,
      contractExpiry: surgery.contractExpiry,
      status: surgery.status
    });

    const handleSubmit = () => {
      handleSurgeryEdit({ ...surgery, ...formData });
    };

    return (
      <div className="border-2 border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">Edit Surgery</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Surgery Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contract Renewal</label>
              <input
                type="date"
                value={formData.contractRenewal}
                onChange={(e) => setFormData({...formData, contractRenewal: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contract Expiry</label>
              <input
                type="date"
                value={formData.contractExpiry}
                onChange={(e) => setFormData({...formData, contractExpiry: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            >
              <option value="Active">Active</option>
              <option value="Pending Setup">Pending Setup</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Save
            </button>
            <button
              onClick={() => setEditingSurgery(null)}
              className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigateTo("clients")}
          className="group flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-all duration-200 transform hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/50"
        >
          <ChevronLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Clients
        </button>
      </div>

      {/* Client Header or Edit Form */}
      {editingClient ? (
        <ClientEditForm />
      ) : (
        <div className="bg-white/90 rounded-2xl shadow-xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full transform -translate-y-16 translate-x-16"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`w-5 h-5 ${colors.dot} rounded-full mr-4 shadow-lg`}></div>
                <span className={`text-sm ${colors.badge} px-4 py-2 rounded-full font-semibold shadow-sm`}>
                  {clientData.type} Client
                </span>
              </div>
              <button
                onClick={() => setEditingClient(true)}
                className="group flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-all duration-200 transform hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/60"
              >
                <Edit3 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Edit Client
              </button>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{clientData.name}</h1>
            <p className="text-gray-600 mb-8 text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {clientData.address}
            </p>

            {/* Client Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200/50 transition-all duration-200 hover:shadow-xl hover:scale-105">
                <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">{clientData.surgeries}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Total Surgeries</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg border border-emerald-200/50 transition-all duration-200 hover:shadow-xl hover:scale-105">
                <UserCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-emerald-600">{clientData.surgeries - 2}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Active</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg border border-amber-200/50 transition-all duration-200 hover:shadow-xl hover:scale-105">
                <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-amber-600">2</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Pending</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200/50 transition-all duration-200 hover:shadow-xl hover:scale-105">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">{clientData.staff}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">Staff Members</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Surgery Configuration Section */}
      <div className="bg-white/90 rounded-2xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-400/10 to-purple-600/10 rounded-full transform translate-y-20 -translate-x-20"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Surgery Configuration</h2>
            </div>
            <button
              onClick={() => openModal("addSurgery", { onAddSurgery: handleAddSurgery })}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Add Surgery
            </button>
          </div>

          {/* Surgery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surgeries.map((surgery) => (
              <div key={surgery.id}>
                {editingSurgery === surgery.id ? (
                  <SurgeryEditForm surgery={surgery} />
                ) : (
                  <div className="bg-white/80 border border-gray-200/50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/95">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 text-lg">{surgery.name}</h3>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
                          surgery.status === "Active" 
                            ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300" 
                            : "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {surgery.status}
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg">
                        <span className="text-gray-600 font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Address:
                        </span>
                        <span className="text-gray-900 font-semibold text-right">{surgery.address}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg">
                        <span className="text-gray-600 font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Contract Renewal:
                        </span>
                        <span className="text-gray-900 font-semibold">{formatDate(surgery.contractRenewal)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg">
                        <span className="text-gray-600 font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Contract Expiry:
                        </span>
                        <span className="text-gray-900 font-semibold">{formatDate(surgery.contractExpiry)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                          <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                          <div className="text-xl font-bold text-blue-700">{surgery.cpsStaff}</div>
                          <div className="text-xs text-blue-600 font-medium">CPS Staff</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                          <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                          <div className="text-xl font-bold text-purple-700">{surgery.surgeryStaff}</div>
                          <div className="text-xs text-purple-600 font-medium">Surgery Staff</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200/50 flex space-x-3">
                      <button
                        onClick={() => handleManageSurgeryStaff(surgery)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Manage Staff
                      </button>
                      <button
                        onClick={() => setEditingSurgery(surgery.id)}
                        className="flex-1 text-blue-600 hover:text-blue-800 text-sm font-semibold hover:bg-blue-50/50 py-2 px-4 rounded-lg transition-all duration-200 border border-blue-200/50 hover:border-blue-300 flex items-center justify-center"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsPage;