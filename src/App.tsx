import { useState } from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ContactsPage from './components/ContactsPage';
import { ContactProvider } from './context/ContactContext';
import { CalendarProvider } from './context/CalendarContext';
import LoginPage from './pages/LoginPage';
import LaunchpadPage from './pages/LaunchpadPage';
import DashboardPage from './pages/DashboardPage';
import ConversationsPage from './pages/ConversationsPage';
import CalendarsPage from './pages/CalendarsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import PaymentsPage from './pages/PaymentsPage';
import SettingsPage from './pages/SettingsPage';
import SitesPage from './pages/SitesPage';
import AiSolutionsPage from './pages/AiSolutionsPage';
import SuppliersServicesPage from './pages/SuppliersServicesPage';
import WebinarPage from './pages/WebinarPage';
import MarketingPage from './pages/MarketingPage';
import AutomationPage from './pages/AutomationPage';
import MembershipsPage from './pages/MembershipsPage';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState('Contacts');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderModule = () => {
    console.log('App: activeModule is:', activeModule);
    switch (activeModule) {
      case 'Launchpad':
        return <LaunchpadPage />;
      case 'Dashboard':
        return <DashboardPage />;
      case 'Conversations':
        return <ConversationsPage />;
      case 'Calendars':
        return <CalendarsPage />;
      case 'Contacts':
        return <ContactsPage />;
      case 'Opportunities':
        return <OpportunitiesPage />;
      case 'Payments':
        return <PaymentsPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Sites':
        return <SitesPage />;
      case 'Ai Solutions':
        return <AiSolutionsPage />;
      case 'Marketing':
        return <MarketingPage />;
      case 'Automation':
        return <AutomationPage />;
      case 'Memberships':
        return <MembershipsPage />;
      case 'Suppliers Services':
        return <SuppliersServicesPage />;
      case 'Webinar':
        return <WebinarPage />;
      default:
        return <ContactsPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <ContactProvider>
      <CalendarProvider>
        <div className="flex h-screen bg-ghl-bg font-sans text-ghl-text overflow-hidden">
          <Sidebar
            onLogout={handleLogout}
            activeModule={activeModule}
            onModuleChange={setActiveModule}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden min-h-0">
            <Header />
            {renderModule()}
          </div>
        </div>
      </CalendarProvider>
    </ContactProvider>
  );
}

export default App;
