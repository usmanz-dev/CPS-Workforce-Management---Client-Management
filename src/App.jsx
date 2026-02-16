import { useState ,useEffect } from "react";
import Header from "./components/Header/Header";
import AdminBar from "./components/AdminBar";
import Dashboard from "./components/Dashboard";
import ClientsPage from "./components/ClientsPage";
import ClientDetailsPage from "./components/ClientDetailsPage";
import SurgeriesPage from "./components/SurgeriesPage";
import SurgeryStaffPage from "./components/SurgeryStaffPage";
import AddClientModal from "./components/modals/AddClientModal";
import AddSurgeryModal from "./components/modals/AddSurgeryModal";
import AssignCPSStaffModal from "./components/modals/AssignCPSStaffModal";
import AddSurgeryEmployeeModal from "./components/modals/AddSurgeryEmployeeModal";
import Notification from "./components/Notification";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentClient, setCurrentClient] = useState(null);
  const [currentSurgery, setCurrentSurgery] = useState(null);
  const [notification, setNotification] = useState(null);
  const [modals, setModals] = useState({
    addClient: false,
    addSurgery: false,
    assignCPSStaff: false,
    addSurgeryEmployee: false,
  });
  const [modalProps, setModalProps] = useState({}); // Store modal props
  const [surgeries, setSurgeries] = useState([
    {
      id: 1,
      name: "Cardiac Catheterization",
      client: "NeoHealth PCN",
      practice: "Golborne Medical Centre",
      type: "Cardiac",
      location: "Theatre 1",
      cpsStaff: 12,
      surgeryStaff: 4,
      status: "Active",
      urgency: "High",
    },
    {
      id: 2,
      name: "Hip Replacement Surgery",
      client: "West London Health PCN",
      practice: "Colville Health Centre",
      type: "Orthopaedic",
      location: "Theatre 2",
      cpsStaff: 8,
      surgeryStaff: 5,
      status: "Active",
      urgency: "Medium",
    },
    {
      id: 3,
      name: "Appendectomy",
      client: "North Thames PCN",
      practice: "Foreland Medical Centre",
      type: "General",
      location: "Theatre 3",
      cpsStaff: 6,
      surgeryStaff: 3,
      status: "Active",
      urgency: "High",
    },
    {
      id: 4,
      name: "Cataract Surgery",
      client: "NeoHealth PCN",
      practice: "West 10 GP Surgery",
      type: "Ophthalmology",
      location: "Theatre 4",
      cpsStaff: 4,
      surgeryStaff: 2,
      status: "Pending Setup",
      urgency: "Low",
    },
    {
      id: 5,
      name: "Laparoscopic Surgery",
      client: "Central London PCN",
      practice: "Paddington Green Health",
      type: "General",
      location: "Theatre 5",
      cpsStaff: 10,
      surgeryStaff: 4,
      status: "Active",
      urgency: "Medium",
    },
  ]);
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);


  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const openModal = (modalName, props = {}) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
    setModalProps((prev) => ({ ...prev, [modalName]: props }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    setModalProps((prev) => ({ ...prev, [modalName]: {} }));
  };

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      if (data.client) setCurrentClient(data.client);
      if (data.surgery) setCurrentSurgery(data.surgery);
    }
  };

  const addSurgery = (newSurgery) => {
    setSurgeries([...surgeries, newSurgery]);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard navigateTo={navigateTo} showNotification={showNotification} openModal={openModal} />;
      case "clients":
        return <ClientsPage navigateTo={navigateTo} showNotification={showNotification} openModal={openModal} />;
      case "client-details":
        return (
          <ClientDetailsPage
            client={currentClient}
            navigateTo={navigateTo}
            showNotification={showNotification}
            openModal={openModal}
          />
        );
      case "surgeries":
        return (
          <SurgeriesPage
            navigateTo={navigateTo}
            showNotification={showNotification}
            openModal={openModal}
            surgeries={surgeries}
            setSurgeries={setSurgeries}
          />
        );
      case "surgery-staff":
        return (
          <SurgeryStaffPage
            surgery={currentSurgery}
            navigateTo={navigateTo}
            showNotification={showNotification}
            openModal={openModal}
          />
        );
      default:
        return <Dashboard navigateTo={navigateTo} showNotification={showNotification} openModal={openModal} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminBar showNotification={showNotification} />
      <Header navigateTo={navigateTo} showNotification={showNotification} />

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderCurrentPage()}</main>

      {/* Modals */}
      <AddClientModal
        isOpen={modals.addClient}
        onClose={() => closeModal("addClient")}
        showNotification={showNotification}
        {...modalProps.addClient}
      />
      <AddSurgeryModal
        isOpen={modals.addSurgery}
        onClose={() => closeModal("addSurgery")}
        showNotification={showNotification}
        onAddSurgery={modalProps.addSurgery?.onAddSurgery || addSurgery}
      />
      <AssignCPSStaffModal
        isOpen={modals.assignCPSStaff}
        onClose={() => closeModal("assignCPSStaff")}
        showNotification={showNotification}
        {...modalProps.assignCPSStaff}
      />
      <AddSurgeryEmployeeModal
        isOpen={modals.addSurgeryEmployee}
        onClose={() => closeModal("addSurgeryEmployee")}
        showNotification={showNotification}
        {...modalProps.addSurgeryEmployee}
      />

      {/* Notification */}
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </div>
  );
}

export default App;