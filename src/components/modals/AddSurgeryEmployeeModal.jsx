import { useState } from "react"

function AddSurgeryEmployeeModal({ isOpen, onClose, showNotification }) {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeTitle: "",
    customTitle: "",
    employeeEmail: "",
    employeePhone: "",
    employeeRole: "Primary Contact",
    employeeNotes: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.employeeName || !formData.employeeTitle || !formData.employeeEmail) {
      showNotification("Please fill in all required fields", "warning")
      return
    }

    if (formData.employeeTitle === "Other" && !formData.customTitle) {
      showNotification("Please enter a custom job title", "warning")
      return
    }

    showNotification(`${formData.employeeName} has been added as surgery employee!`, "success")
    onClose()
    setFormData({
      employeeName: "",
      employeeTitle: "",
      customTitle: "",
      employeeEmail: "",
      employeePhone: "",
      employeeRole: "Primary Contact",
      employeeNotes: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add Surgery Employee</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="employee-name"
                  name="employeeName"
                  required
                  value={formData.employeeName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter full name (e.g., Dr. John Williams)"
                />
              </div>

              <div>
                <label htmlFor="employee-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <select
                  id="employee-title"
                  name="employeeTitle"
                  required
                  value={formData.employeeTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select Job Title</option>
                  <option value="GP Lead">GP Lead</option>
                  <option value="Practice Manager">Practice Manager</option>
                  <option value="Senior Partner">Senior Partner</option>
                  <option value="Practice Nurse">Practice Nurse</option>
                  <option value="Reception Manager">Reception Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.employeeTitle === "Other" && (
                <div>
                  <label htmlFor="custom-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Job Title
                  </label>
                  <input
                    type="text"
                    id="custom-title"
                    name="customTitle"
                    value={formData.customTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter custom job title"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="employee-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="employee-email"
                    name="employeeEmail"
                    required
                    value={formData.employeeEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="email@surgery.nhs.uk"
                  />
                </div>
                <div>
                  <label htmlFor="employee-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="employee-phone"
                    name="employeePhone"
                    value={formData.employeePhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="028 XXXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="employee-role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role Type
                </label>
                <select
                  id="employee-role"
                  name="employeeRole"
                  value={formData.employeeRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="Primary Contact">Primary Contact</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Clinical">Clinical</option>
                  <option value="Management">Management</option>
                </select>
              </div>

              <div>
                <label htmlFor="employee-notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="employee-notes"
                  name="employeeNotes"
                  rows="3"
                  value={formData.employeeNotes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter any additional notes or comments"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSurgeryEmployeeModal
