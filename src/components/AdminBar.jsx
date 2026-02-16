function AdminBar({ showNotification }) {
  return (
    <div className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">Admin Management</span>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="text-sm text-gray-300">Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => showNotification("You have 3 new notifications", "info")}
              className="relative p-1 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 7h6a2 2 0 012 2v9a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2z"
                ></path>
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>
            <span className="text-xs text-gray-300 hidden sm:block">Last login: Today 09:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBar
