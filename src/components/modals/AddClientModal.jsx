import { useState } from "react"

function AddClientModal({ isOpen, onClose, showNotification }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    clientType: "",
    clientPhone: "",
    clientEmail: "",
    clientNotes: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.clientName || !formData.clientAddress || !formData.clientType) {
      showNotification("Please fill in all required fields", "warning")
      return
    }

    showNotification(`${formData.clientName} has been added successfully!`, "success")
    onClose()
    setFormData({
      clientName: "",
      clientAddress: "",
      clientType: "",
      clientPhone: "",
      clientEmail: "",
      clientNotes: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add New Client</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="client-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  id="client-name"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter client name (e.g., Royal Victoria PCN)"
                />
              </div>

              <div>
                <label htmlFor="client-address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  id="client-address"
                  name="clientAddress"
                  required
                  rows="3"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter full address"
                />
              </div>

              <div>
                <label htmlFor="client-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Type *
                </label>
                <select
                  id="client-type"
                  name="clientType"
                  required
                  value={formData.clientType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select Client Type</option>
                  <option value="PCN">PCN Client</option>
                  <option value="Non-PCN">Non-PCN Client</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="client-phone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="028 XXXX XXXX"
                  />
                </div>
                <div>
                  <label htmlFor="client-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="client-email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="contact@client.nhs.uk"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="client-notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="client-notes"
                  name="clientNotes"
                  rows="3"
                  value={formData.clientNotes}
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
                className="px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg transition-colors duration-200"
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddClientModal
