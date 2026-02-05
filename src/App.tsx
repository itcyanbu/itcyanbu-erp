import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ContactsPage from './components/ContactsPage';
import { ContactProvider } from './context/ContactContext';
import { CalendarProvider } from './context/CalendarContext';
import { EventProvider } from './context/EventContext';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import AuthCallback from './pages/auth/AuthCallback';
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
import ReputationPage from './pages/ReputationPage';
import ReportingPage from './pages/ReportingPage';
import AppMarketplacePage from './pages/AppMarketplacePage';
import AffiliatePortalPage from './pages/AffiliatePortalPage';
import AgencyAnalyticsPage from './pages/AgencyAnalyticsPage';
import MediaLibraryPage from './pages/MediaLibraryPage';
import FacebookGroupPage from './pages/FacebookGroupPage';
import { X } from 'lucide-react';

function App() {
  const [activeModule, setActiveModule] = useState('Contacts');
  const [showAuthPrompt, setShowAuthPrompt] = useState(true);
  const { user, signOut, isSupabaseEnabled } = useAuth();

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
      case 'AI Solutions':
        return <AiSolutionsPage />;
      case 'Marketing':
        return <MarketingPage />;
      case 'Automation':
        return <AutomationPage />;
      case 'Memberships':
        return <MembershipsPage />;
      case 'Reputation':
        return <ReputationPage />;
      case 'Reporting':
        return <ReportingPage />;
      case 'App Marketplace':
        return <AppMarketplacePage />;
      case 'Affiliate Portal':
        return <AffiliatePortalPage />;
      case 'Agency Analytics':
        return <AgencyAnalyticsPage />;
      case 'Media library':
        return <MediaLibraryPage />;
      case 'Facebook Group':
        return <FacebookGroupPage />;
      case 'Suppliers Services':
        return <SuppliersServicesPage />;
      case 'Webinar':
        return <WebinarPage />;
      default:
        return <ContactsPage />;
    }
  };

  // Routes for auth pages
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/*"
        element={
          <ContactProvider>
            <CalendarProvider>
              <EventProvider>
                <div className="flex h-screen bg-ghl-bg font-sans text-ghl-text overflow-hidden">
                  <Sidebar
                    activeModule={activeModule}
                    onModuleChange={setActiveModule}
                  />
                  <div className="flex-1 flex flex-col min-w-0 overflow-hidden min-h-0 relative">
                    <Header />

                    {/* Gradual Migration: Show prompt if using localStorage AND Supabase is configured */}
                    {isSupabaseEnabled && !user && showAuthPrompt && (
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl shadow-2xl max-w-2xl mx-auto flex items-center gap-4 animate-in slide-in-from-top">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">🚀 Save Your Data to the Cloud!</h3>
                          <p className="text-sm text-blue-100">
                            Sign in to sync your contacts and data across all your devices. Continue without signing in to use local storage only.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.location.href = '/login'}
                            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                          >
                            Sign In
                          </button>
                          <button
                            onClick={() => setShowAuthPrompt(false)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Close"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* User info if signed in */}
                    {user && (
                      <div className="absolute top-16 right-4 z-50 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-3">
                        <span className="text-sm">✅ Signed in as <strong>{user.email}</strong></span>
                        <button
                          onClick={signOut}
                          className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}

                    {renderModule()}
                  </div>
                </div>
              </EventProvider>
            </CalendarProvider>
          </ContactProvider>
        }
      />
    </Routes>
  );
}

export default App;
