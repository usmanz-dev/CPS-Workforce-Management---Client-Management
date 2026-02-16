import { useState } from "react"

function Header({ navigateTo, showNotification }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleNavigation = (page, title) => {
    navigateTo(page)
    showNotification(`Loading ${title}...`, "info")
    closeDropdown()
    closeMobileMenu()
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center group">
            <div className="flex-shrink-0 transform transition-all duration-300 hover:scale-110">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <span className="text-white font-bold text-sm sm:text-lg">CPS</span>
              </div>
            </div>
            <div className="ml-2 sm:ml-4">
              <h1 className="text-sm sm:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer">
                <span className="hidden sm:inline">Workforce Management System</span>
                <span className="sm:hidden">Workforce Management System</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 transform hover:scale-105"
                >
                  Admin Management
                  <svg
                    className={`ml-1 w-4 h-4 transition-all duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 transition-all duration-300 ${
                    dropdownOpen ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-95 translate-y-[-10px]"
                  }`}
                >
                  <button
                    onClick={() => handleNavigation("clients", "Client Management")}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 transform group"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                      </svg>
                      <span className="font-medium">Manage Clients</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavigation("surgeries", "Surgery Management")}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-200 transform group"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="font-medium">Manage Surgeries</span>
                    </div>
                  </button>
                </div>
              </div>
              <button
                onClick={() => showNotification("Loading Staff Management...", "info")}
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 transform hover:scale-105 font-medium"
              >
                Staff Management
              </button>
              <button
                onClick={() => showNotification("Loading Reports...", "info")}
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 transform hover:scale-105 font-medium"
              >
                Reports
              </button>
            </nav>
            
            {/* User Info and Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-500 hidden md:block hover:text-gray-700 transition-colors duration-200">
                Welcome, <span className="font-semibold text-blue-600">Admin</span>
              </span>
              <div className="relative group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full cursor-pointer hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    Profile
                  </button>
                  <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    Settings
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                    Sign out
                  </button>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200 space-y-2">
            {/* Admin Management Section */}
            <div className="mb-3">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-left px-3 py-2 text-blue-600 font-medium hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Admin Management
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${dropdownOpen ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => handleNavigation("clients", "Client Management")}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    Manage Clients
                  </button>
                  <button
                    onClick={() => handleNavigation("surgeries", "Surgery Management")}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Manage Surgeries
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                showNotification("Loading Staff Management...", "info")
                closeMobileMenu()
              }}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Staff Management
            </button>
            <button
              onClick={() => {
                showNotification("Loading Reports...", "info")
                closeMobileMenu()
              }}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Reports
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header