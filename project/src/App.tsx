import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Speakers, SpeakerDetail } from './pages/Speakers';
import { Sponsors } from './pages/Sponsors';
import { Tickets } from './pages/Tickets';
import { Venue } from './pages/Venue';
import { Volunteers } from './pages/Volunteers';
import { FAQPage } from './pages/FAQ';
import { Badge } from './pages/Badge';
import { Contact } from './pages/Contact';
import { Travel } from './pages/Travel';
import { CodeOfConduct, PrivacyPolicy, Accessibility } from './pages/Policies';
import { Admin } from './pages/Admin';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/speakers/:id" element={<SpeakerDetail />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/venue" element={<Venue />} />
              <Route path="/volunteers" element={<Volunteers />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/badge" element={<Badge />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/code-of-conduct" element={<CodeOfConduct />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
