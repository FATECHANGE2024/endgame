"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faFileAlt, faMapMarkedAlt, faTrophy, faGift, faPlusCircle, faMapMarkerAlt, faGlobe, faCaretDown, faMoon, faSun, faUser, faCheck, faBell, faGear, faEnvelope, faCircleQuestion, faBolt, faPlus, faList, faHistory, faCog, faAward, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

// Dynamic imports for Leaflet (SSR safe)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

// Dummy data for reports
const dummyReports = [
  { id: 1, title: "Pothole on Main St", description: "Huge pothole", latitude: 23.25, longitude: 77.45, status: "Resolved", created_at: new Date().toISOString() },
  { id: 2, title: "Garbage Overflow", description: "Overflow near park", latitude: 23.20, longitude: 77.40, status: "New", created_at: new Date().toISOString() },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [report, setReport] = useState({ title: "", description: "", latitude: 20.5937, longitude: 78.9629 });
  const [image, setImage] = useState<File | null>(null);
  const [card, setCard] = useState(dummyReports);
  const name = "Raj"; // Replace with dynamic user name

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleLanguageDropdown = () => setShowLanguageDropdown(!showLanguageDropdown);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setShowSidebar(false);
  };

  const handleLinkClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    handleSectionChange(section);
  };

  const handleReport = () => {
    // For demo, just add to card array
    setCard([...card, { ...report, id: card.length + 1, created_at: new Date().toISOString(), status: "New" }]);
    closeModal();
  };

  const handleCardClick = (section: string) => {
    handleSectionChange(section);
  };

  const getImageUrl = (id: number) => `https://picsum.photos/300/200?random=${id}`;

  // Client-only effects for window/document
  useEffect(() => {
    if (isDarkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [isDarkMode]);

  return (
    <>
      <style>{/* Paste all your CSS here from your previous code */}</style>

      <header>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} /> Menu
        </button>

        <div className={`slidebar ${showSidebar ? "active" : ""}`}>
          <div className="close-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <h1>Samadhan Setu</h1>
          <ul className="Menu">
            <li className={activeSection === "emergency" ? "active" : ""} onClick={() => handleSectionChange("emergency")}>
              <a href="#"><FontAwesomeIcon icon={faUser} />Emergency/Scheduled Alerts</a>
            </li>
            <li className={activeSection === "notifications" ? "active" : ""} onClick={() => handleSectionChange("notifications")}>
              <a href="#"><FontAwesomeIcon icon={faBell} />Notifications</a>
            </li>
            <li className={activeSection === "verified" ? "active" : ""} onClick={() => handleSectionChange("verified")}>
              <a href="#"><FontAwesomeIcon icon={faCheck} />Verified NGOs Partner</a>
            </li>
            <li className={activeSection === "settings" ? "active" : ""} onClick={() => handleSectionChange("settings")}>
              <a href="#"><FontAwesomeIcon icon={faGear} />Settings</a>
            </li>
            <li className={activeSection === "email" ? "active" : ""} onClick={() => handleSectionChange("email")}>
              <a href="#"><FontAwesomeIcon icon={faEnvelope} />Email & SMS Support</a>
            </li>
            <li className={activeSection === "help" ? "active" : ""} onClick={() => handleSectionChange("help")}>
              <a href="#"><FontAwesomeIcon icon={faCircleQuestion} />Help & Support</a>
            </li>
          </ul>
          <div className="icons">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
        </div>

        {showSidebar && <div className="overlay active" onClick={toggleSidebar}></div>}

        {/* Header Content */}
        <div className="header-content">
          <div className="logo-container">
            <img src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png" alt="Samadhan Setu" className="logo-img" />
            <div className="Logo"><h2>Samadhan Setu</h2></div>
          </div>
          <nav>
            <ul>
              <li><a href="#" className={activeSection === "dashboard" ? "active" : ""} onClick={(e) => handleLinkClick(e, "dashboard")}><FontAwesomeIcon icon={faHome} /> HOME</a></li>
              <li><a href="#" className={activeSection === "reports" ? "active" : ""} onClick={(e) => handleLinkClick(e, "reports")}><FontAwesomeIcon icon={faFileAlt} /> MY REPORTS</a></li>
              <li><a href="#" className={activeSection === "map" ? "active" : ""} onClick={(e) => handleLinkClick(e, "map")}><FontAwesomeIcon icon={faMapMarkedAlt} /> VIEW MAP</a></li>
              <li><a href="#" className={activeSection === "leaderboard" ? "active" : ""} onClick={(e) => handleLinkClick(e, "leaderboard")}><FontAwesomeIcon icon={faTrophy} /> LEADERBOARD</a></li>
              <li><a href="#" className={activeSection === "rewards" ? "active" : ""} onClick={(e) => handleLinkClick(e, "rewards")}><FontAwesomeIcon icon={faGift} /> REWARDS</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn-report" onClick={openModal}>
              <FontAwesomeIcon icon={faPlusCircle} /> <span>Report Issue</span>
            </button>
            <div className="location-selector">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> <span>Bhopal, MP</span>
            </div>
            <div className={`language-selector ${showLanguageDropdown ? "open" : ""}`}>
              <button className="language-btn" onClick={toggleLanguageDropdown}>
                <FontAwesomeIcon icon={faGlobe} /> <span>English</span> <FontAwesomeIcon icon={faCaretDown} className="fa-caret-down" />
              </button>
              <div className={`language-dropdown ${showLanguageDropdown ? "show" : ""}`}>
                <a href="#" className="lang-option" data-lang="en">English</a>
                <a href="#" className="lang-option" data-lang="hi">हिन्दी</a>
                <a href="#" className="lang-option" data-lang="mr">मराठी</a>
              </div>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <div className="user-profile">
              <button className="profile-btn" onClick={toggleProfileDropdown}>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDExIDE5LjU5ODYgNC41IDE2IDQuNUMxMi40MDEzIDQuNSAxMC41IDcuNDAxMSAxMC41IDExQzEwLjUgMTQuNTk4NiAxMi40MDEzIDE3LjUgMTYgMTcuNVoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+" alt="Profile" />
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <a href="#">Profile</a>
                  <a href="#">Settings</a>
                  <a href="#">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
            <h2>Report Issue</h2>
            <input type="text" placeholder="Title" value={report.title} onChange={(e) => setReport({ ...report, title: e.target.value })} />
            <textarea placeholder="Description" value={report.description} onChange={(e) => setReport({ ...report, description: e.target.value })}></textarea>
            <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
            
            <div style={{ height: "300px", width: "100%", marginTop: "10px" }}>
              <MapContainer center={[report.latitude, report.longitude]} zoom={5} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
              </MapContainer>
            </div>

            <button onClick={handleReport} className="submit-btn">Submit Report</button>
          </div>
        </div>
      )}

      {/* Main Sections */}
      <main>
        {activeSection === "dashboard" && <h1>Welcome, {name}</h1>}
        {activeSection === "reports" && (
          <div className="reports-section">
            {card.map((c) => (
              <div key={c.id} className="report-card" onClick={() => handleCardClick("map")}>
                <img src={getImageUrl(c.id)} alt={c.title} />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <p>Status: {c.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeSection === "map" && (
          <div className="map-section" style={{ height: "500px" }}>
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
            </MapContainer>
          </div>
        )}
        {activeSection === "leaderboard" && <h2>Leaderboard Section</h2>}
        {activeSection === "rewards" && <h2>Rewards Section</h2>}
      </main>
    </>
  );
}
