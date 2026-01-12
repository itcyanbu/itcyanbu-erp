import { useState } from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ContactsPage from './components/ContactsPage';
import { ContactProvider } from './context/ContactContext';
import LoginPage from './pages/LoginPage';
import ModulePlaceholder from './components/ModulePlaceholder';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState('Contacts');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          {activeModule === 'Contacts' ? (
            <ContactsPage />
          ) : (
            <ModulePlaceholder name={activeModule} />
          )}
        </div>
      </div>
    </ContactProvider>
  );
}

export default App;
