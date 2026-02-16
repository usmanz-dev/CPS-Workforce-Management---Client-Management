import { useState } from "react";
import { X, Plus } from "lucide-react";

function AddSurgeryModal({ isOpen, onClose, showNotification, onAddSurgery }) {
  const [formData, setFormData] = useState({
    surgeryName: "",
    surgeryAddress: "",
    contractRenewal: "",
    contractExpiry: "",
    surgeryStatus: "",
    client: "",
    practice: "",
    type: "",
    cpsStaff: "",
    surgeryStaff: "",
    urgency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cpsStaff" || name === "surgeryStaff" ? parseInt(value) || "" : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.surgeryName ||
      !formData.surgeryAddress ||
      !formData.contractRenewal ||
      !formData.contractExpiry ||
      !formData.surgeryStatus ||
      !formData.client ||
      !formData.practice ||
      !formData.type ||
      formData.cpsStaff === "" ||
      formData.surgeryStaff === "" ||
      !formData.urgency
    ) {
      showNotification("Please fill in all required fields", "warning");
      return;
    }

    // Create new surgery object
    const newSurgery = {
      id: Date.now(), // Temporary unique ID
      name: formData.surgeryName,
      client: formData.client,
      practice: formData.practice,
      type: formData.type,
      address: formData.surgeryAddress,
      contractRenewal: formData.contractRenewal,
      contractExpiry: formData.contractExpiry,
      cpsStaff: formData.cpsStaff,
      surgeryStaff: formData.surgeryStaff,
      status: formData.surgeryStatus,
      urgency: formData.urgency,
    };

    // Call the callback to add the surgery
    onAddSurgery(newSurgery);
    showNotification(`${formData.surgeryName} has been added successfully!`, "success");
    onClose();
    setFormData({
      surgeryName: "",
      surgeryAddress: "",
      contractRenewal: "",
      contractExpiry: "",
      surgeryStatus: "",
      client: "",
      practice: "",
      type: "",
      cpsStaff: "",
      surgeryStaff: "",
      urgency: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Add New Surgery</h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Surgery Name */}
            <div className="lg:col-span-2">
              <label htmlFor="surgery-name" className="block text-sm font-medium text-gray-700 mb-2">
                Surgery Name *
              </label>
              <input
                type="text"
                id="surgery-name"
                name="surgeryName"
                required
                value={formData.surgeryName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter surgery name (e.g., Cardiology Surgery)"
              />
            </div>

            {/* Address */}
            <div className="lg:col-span-2">
              <label htmlFor="surgery-address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                id="surgery-address"
                name="surgeryAddress"
                required
                value={formData.surgeryAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter surgery address (e.g., Theatre 1, Main Building)"
              />
            </div>

            {/* Client */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
                Client *
              </label>
              <input
                type="text"
                id="client"
                name="client"
                required
                value={formData.client}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter client name (e.g., NeoHealth PCN)"
              />
            </div>

            {/* Practice */}
            <div>
              <label htmlFor="practice" className="block text-sm font-medium text-gray-700 mb-2">
                Practice *
              </label>
              <input
                type="text"
                id="practice"
                name="practice"
                required
                value={formData.practice}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter practice name (e.g., Golborne Medical Centre)"
              />
            </div>

            {/* Surgery Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Surgery Type *
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Type</option>
                <option value="Cardiac">Cardiac</option>
                <option value="Orthopaedic">Orthopaedic</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="General">General</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                Urgency *
              </label>
              <select
                id="urgency"
                name="urgency"
                required
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Urgency</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Contract Dates */}
            <div>
              <label htmlFor="contract-renewal" className="block text-sm font-medium text-gray-700 mb-2">
                Contract Renewal Date *
              </label>
              <input
                type="date"
                id="contract-renewal"
                name="contractRenewal"
                required
                value={formData.contractRenewal}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="contract-expiry" className="block text-sm font-medium text-gray-700 mb-2">
                Contract Expiry Date *
              </label>
              <input
                type="date"
                id="contract-expiry"
                name="contractExpiry"
                required
                value={formData.contractExpiry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Staff Numbers */}
            <div>
              <label htmlFor="cps-staff" className="block text-sm font-medium text-gray-700 mb-2">
                CPS Staff *
              </label>
              <input
                type="number"
                id="cps-staff"
                name="cpsStaff"
                required
                min="0"
                value={formData.cpsStaff}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter number of CPS staff"
              />
            </div>

            <div>
              <label htmlFor="surgery-staff" className="block text-sm font-medium text-gray-700 mb-2">
                Surgery Staff *
              </label>
              <input
                type="number"
                id="surgery-staff"
                name="surgeryStaff"
                required
                min="0"
                value={formData.surgeryStaff}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                placeholder="Enter number of surgery staff"
              />
            </div>

            {/* Status */}
            <div className="lg:col-span-2">
              <label htmlFor="surgery-status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="surgery-status"
                name="surgeryStatus"
                required
                value={formData.surgeryStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Pending Setup">Pending Setup</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Surgery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSurgeryModal;