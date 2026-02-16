import { useState } from "react"
function SurgeryStaffPage({ surgery, navigateTo, showNotification, openModal }) {
  const [activeTab, setActiveTab] = useState("cps")
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)

  // State for CPS Staff with actual data management
  const [cpsStaff, setCpsStaff] = useState([
    {
      id: "CPS001",
      name: "John Smith",
      role: "Nurse Practitioner",
      initials: "JS",
      type: "Permanent",
      hours: "9:00 AM - 3:00 PM",
      days: "Mon, Tue, Wed, Thu, Fri",
      status: "Active",
    },
    {
      id: "CPS002",
      name: "Mary Johnson",
      role: "Healthcare Assistant",
      initials: "MJ",
      type: "Cover Staff",
      hours: "10:00 AM - 6:00 PM",
      covering: "John Smith (On Leave)",
      coverPeriod: "Dec 15 - Dec 22, 2024",
      status: "Active",
    },
    {
      id: "CPS003",
      name: "Robert Davis",
      role: "Registered Nurse",
      initials: "RD",
      type: "Permanent",
      hours: "8:00 AM - 4:00 PM",
      leaveType: "Annual Leave",
      returnDate: "Dec 23, 2024",
      status: "On Leave",
    },
  ])

  // State for Surgery Employees with actual data management
  const [surgeryEmployees, setSurgeryEmployees] = useState([
    {
      id: 1,
      name: "Dr. Williams",
      role: "GP Lead",
      initials: "DW",
      email: "d.williams@surgery.nhs.uk",
      phone: "028 9032 1234",
      roleType: "Primary Contact",
       
    },
    {
      id: 2,
      name: "Sarah Brown",
      role: "Practice Manager",
      initials: "SB",
      email: "s.brown@surgery.nhs.uk",
      phone: "028 9032 1235",
      roleType: "Administrative",
      
    },
  ])

  // Form states
  const [newCpsStaff, setNewCpsStaff] = useState({
    name: "",
    role: "",
    type: "Permanent",
    hours: "",
    days: "",
  })

  const [newSurgeryEmployee, setNewSurgeryEmployee] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    roleType: "Administrative",
  })

  if (!surgery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Surgery Selected</h3>
          <p className="text-gray-500 mb-6">Please select a surgery to manage staff assignments</p>
          <button
            onClick={() => navigateTo("client-details")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            Back to Client Details
          </button>
        </div>
      </div>
    )
  }

  const showStaffTab = (tabType) => {
  setActiveTab(tabType)
  }

  const handleRemoveCPSStaff = (staffId) => {
    setCpsStaff(prev => prev.filter(staff => staff.id !== staffId))
    showNotification("CPS staff member successfully removed from surgery", "success")
  }

  const handleAddCPSStaff = () => {
    if (!newCpsStaff.name || !newCpsStaff.role || !newCpsStaff.hours) {
    showNotification("Please fill in all required fields", "error")
   return
    }

    const newId = `CPS${String(cpsStaff.length + 1).padStart(3, '0')}`
    const initials = newCpsStaff.name.split(' ').map(n => n[0]).join('').toUpperCase()

    const staffMember = {
      id: newId,
      name: newCpsStaff.name,
      role: newCpsStaff.role,
      initials: initials,
      type: newCpsStaff.type,
      hours: newCpsStaff.hours,
      days: newCpsStaff.days || "Mon, Tue, Wed, Thu, Fri",
      status: "Active",
    }

    setCpsStaff(prev => [...prev, staffMember])
    setNewCpsStaff({ name: "", role: "", type: "Permanent", hours: "", days: "" })
    setShowAssignModal(false)
    showNotification("CPS staff member successfully assigned to surgery", "success")
  }

  const handleRemoveSurgeryEmployee = (employeeId) => {
    setSurgeryEmployees(prev => prev.filter(emp => emp.id !== employeeId))
    showNotification("Surgery employee successfully removed", "success")
  }

  const handleAddSurgeryEmployee = () => {
    if (!newSurgeryEmployee.name || !newSurgeryEmployee.role || !newSurgeryEmployee.email) {
      showNotification("Please fill in all required fields", "error")
      return
    }

    const newId = Math.max(...surgeryEmployees.map(e => e.id), 0) + 1
    const initials = newSurgeryEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase()

    const employee = {
      id: newId,
      name: newSurgeryEmployee.name,
      role: newSurgeryEmployee.role,
      initials: initials,
      email: newSurgeryEmployee.email,
      phone: newSurgeryEmployee.phone,
      roleType: newSurgeryEmployee.roleType,
    }

    setSurgeryEmployees(prev => [...prev, employee])
    setNewSurgeryEmployee({ name: "", role: "", email: "", phone: "", roleType: "Administrative" })
    setShowAddEmployeeModal(false)
    showNotification("Surgery employee successfully added", "success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo("client-details")}
            className="group flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 hover:translate-x-1"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center mr-3 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </div>
            Back to Surgery Details
          </button>
        </div>

        {/* Enhanced Surgery Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                  Active Surgery
                </span>
              </div>
              <button
                onClick={() => showNotification("Editing surgery information...", "info")}
                className="group flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit Surgery
              </button>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
              {surgery.name} - Staff Management
            </h1>
            <p className="text-gray-600 text-lg">{surgery.address}</p>
          </div>
        </div>

        {/* Enhanced Staff Management Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <nav className="flex space-x-8 px-8" aria-label="Tabs">
              <button
                onClick={() => showStaffTab("cps")}
                className={`relative border-b-3 py-6 px-1 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "cps"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                CPS Staff ({cpsStaff.length})
                {activeTab === "cps" && (
                  <div className="absolute -bottom-px left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
                )}
              </button>
              <button
                onClick={() => showStaffTab("surgery")}
                className={`relative border-b-3 py-6 px-1 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "surgery"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Surgery Employees ({surgeryEmployees.length})
                {activeTab === "surgery" && (
                  <div className="absolute -bottom-px left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-lg"></div>
                )}
              </button>
            </nav>
          </div>

          {/* CPS Staff Tab Content */}
          {activeTab === "cps" && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">CPS Staff Assignments</h3>
                  <p className="text-gray-600">Manage care staff provided by CPS for this surgery</p>
                </div>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Assign CPS Staff
                </button>
              </div>

              {/* Enhanced CPS Staff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cpsStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className={`group relative bg-white border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      staff.status === "On Leave" 
                        ? "border-gray-200 bg-gray-50" 
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <button
                        onClick={() => showNotification("Opening staff schedule management...", "info")}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          staff.status === "On Leave" 
                            ? "text-gray-400 hover:bg-gray-100" 
                            : "text-blue-600 hover:bg-blue-100 hover:scale-110"
                        }`}
                        title="Edit Schedule"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemoveCPSStaff(staff.id)}
                        className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Remove Staff"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-4 ${
                        staff.status === "On Leave" 
                          ? "bg-gray-200" 
                          : "bg-gradient-to-br from-blue-500 to-purple-600"
                      }`}>
                        <span className={`font-bold text-lg ${
                          staff.status === "On Leave" ? "text-gray-600" : "text-white"
                        }`}>
                          {staff.initials}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{staff.name}</h4>
                        <p className="text-gray-600 font-medium">{staff.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          staff.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {staff.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          staff.type === "Permanent" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {staff.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Hours</span>
                        <span className="text-sm font-medium text-gray-900">{staff.hours}</span>
                      </div>
                      {staff.days && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Days</span>
                          <span className="text-sm font-medium text-gray-900">{staff.days}</span>
                        </div>
                      )}
                      {staff.covering && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-500">Covering</span>
                            <span className="text-sm font-medium text-gray-900">{staff.covering}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Period</span>
                            <span className="text-sm font-medium text-gray-900">{staff.coverPeriod}</span>
                          </div>
                        </div>
                      )}
                      {staff.leaveType && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-500">Leave Type</span>
                            <span className="text-sm font-medium text-gray-900">{staff.leaveType}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Return Date</span>
                            <span className="text-sm font-medium text-gray-900">{staff.returnDate}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Surgery Staff Tab Content */}
          {activeTab === "surgery" && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Surgery Employees</h3>
                  <p className="text-gray-600">Manage GP leads, practice managers, and other surgery staff</p>
                </div>
                <button
                  onClick={() => setShowAddEmployeeModal(true)}
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Employee
                </button>
              </div>

              {/* Enhanced Surgery Staff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {surgeryEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-green-300"
                  >
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <button
                        onClick={() => showNotification("Editing surgery employee...", "info")}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Edit Employee"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemoveSurgeryEmployee(employee.id)}
                        className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Remove Employee"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">{employee.initials}</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{employee.name}</h4>
                        <p className="text-gray-600 font-medium">{employee.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Email</span>
                        <span className="text-sm font-medium text-gray-900 truncate ml-2">{employee.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Phone</span>
                        <span className="text-sm font-medium text-gray-900">{employee.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Role Type</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {employee.roleType}
                        </span>
                        
                      </div>
                       
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Info Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-900 mb-2">Surgery Employee Information</h4>
                    <p className="text-blue-700 leading-relaxed">
                      Surgery employees (GP Leads, Practice Managers, etc.) are maintained for contact and coordination
                      purposes only. They do not directly integrate with the CPS workforce management system but are
                      essential for communication and operational coordination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assign CPS Staff Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Assign CPS Staff</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={newCpsStaff.name}
                  onChange={(e) => setNewCpsStaff({...newCpsStaff, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter staff name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                <select
                  value={newCpsStaff.role}
                  onChange={(e) => setNewCpsStaff({...newCpsStaff, role: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select role</option>
                  <option value="Nurse Practitioner">Nurse Practitioner</option>
                  <option value="Registered Nurse">Registered Nurse</option>
                  <option value="Healthcare Assistant">Healthcare Assistant</option>
                  <option value="Care Worker">Care Worker</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  value={newCpsStaff.type}
                  onChange={(e) => setNewCpsStaff({...newCpsStaff, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Permanent">Permanent</option>
                  <option value="Cover Staff">Cover Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Working Hours *</label>
                <input
                  type="text"
                  value={newCpsStaff.hours}
                  onChange={(e) => setNewCpsStaff({...newCpsStaff, hours: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Working Days</label>
                <input
                  type="text"
                  value={newCpsStaff.days}
                  onChange={(e) => setNewCpsStaff({...newCpsStaff, days: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Mon, Tue, Wed, Thu, Fri"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCPSStaff}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Assign Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Surgery Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Surgery Employee</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={newSurgeryEmployee.name}
                  onChange={(e) => setNewSurgeryEmployee({...newSurgeryEmployee, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter employee name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                <input
                  type="text"
                  value={newSurgeryEmployee.role}
                  onChange={(e) => setNewSurgeryEmployee({...newSurgeryEmployee, role: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., GP Lead, Practice Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newSurgeryEmployee.email}
                  onChange={(e) => setNewSurgeryEmployee({...newSurgeryEmployee, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="employee@surgery.nhs.uk"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newSurgeryEmployee.phone}
                  onChange={(e) => setNewSurgeryEmployee({...newSurgeryEmployee, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="028 9032 1234"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role Type</label>
                <select
                  value={newSurgeryEmployee.roleType}
                  onChange={(e) => setNewSurgeryEmployee({...newSurgeryEmployee, roleType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Administrative">Administrative</option>
                  <option value="Primary Contact">Primary Contact</option>
                  <option value="Medical">Medical</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSurgeryEmployee}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SurgeryStaffPage