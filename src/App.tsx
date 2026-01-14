import { useState } from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ContactsPage from './components/ContactsPage';
import { ContactProvider } from './context/ContactContext';
import LoginPage from './pages/LoginPage';
import LaunchpadPage from './pages/LaunchpadPage';
import DashboardPage from './pages/DashboardPage';
import ConversationsPage from './pages/ConversationsPage';
import CalendarsPage from './pages/CalendarsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import PaymentsPage from './pages/PaymentsPage';
import SettingsPage from './pages/SettingsPage';

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
      default:
        return <ContactsPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <ContactProvider>
      <div className="flex h-screen bg-ghl-bg font-sans text-ghl-text overflow-hidden">
        <Sidebar
          onLogout={handleLogout}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          {renderModule()}
        </div>
      </div>
    </ContactProvider>
  );
}

export default App;
