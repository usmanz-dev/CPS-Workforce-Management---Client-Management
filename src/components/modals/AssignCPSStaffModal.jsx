function AssignCPSStaffModal({ isOpen, onClose, showNotification }) {
  const availableStaff = [
    {
      id: "CPS003",
      name: "Robert Davis",
      role: "Registered Nurse",
      initials: "RD",
    },
    {
      id: "CPS004",
      name: "Lisa Wilson",
      role: "Healthcare Assistant",
      initials: "LW",
    },
  ]

  const handleSelectStaff = (staff) => {
    showNotification(`${staff.name} has been assigned to this surgery!`, "success")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Assign CPS Staff</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Available CPS Staff</h4>
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <div className="divide-y divide-gray-200">
                {availableStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectStaff(staff)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-sm">{staff.initials}</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{staff.name}</h5>
                          <p className="text-sm text-gray-600">{staff.role}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>ID: {staff.id}</p>
                        <p>Available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignCPSStaffModal
