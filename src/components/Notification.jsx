import { useEffect } from "react"

function Notification({ message, type, onClose }) {
  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-600"
      case "warning":
        return "bg-orange-600"
      default:
        return "bg-blue-600"
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 ${getBgColor()} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`}
    >
      {message}
    </div>
  )
}

export default Notification
