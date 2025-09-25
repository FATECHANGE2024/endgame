'use client';

import Image from "next/image";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaChartLine,      // Dashboard
  FaEnvelope,       // Messages
  FaCog,            // Settings
  FaQuestionCircle, // Help & Support
  FaAward,
  FaHistory,
  FaSignOutAlt,
  FaMoon,
  FaGlobe,
  FaCaretDown,
  FaUsers,
  FaMapMarkerAlt,
  FaHandshake,
  FaPlus,
  FaFacebookF,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import "./nature.css";
import { useState } from "react";

export default function SamadhanSetu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLang = () => setIsLangOpen(!isLangOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={theme}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars /> Menu
      </button>

      {/* Sidebar */}
      <div className={`slidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </div>
        <h1>Samadhan Setu</h1>
        <ul className="Menu">
          <li className="active">
            <a href="#">
              <FaUser /> User Profile
            </a>
          </li>
          <li>
            <a href="#">
              <FaChartLine /> Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <FaEnvelope /> Messages
            </a>
          </li>
          <li>
            <a href="#">
              <FaCog /> Settings
            </a>
          </li>
          <li>
            <a href="#">
              <FaQuestionCircle /> Help & Support
            </a>
          </li>
        </ul>
        <div className="icons">
          <FaFacebookF />
          <FaGithub />
          <FaTwitter />
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Header */}
      <header className="header-content">
        <div className="logo-container">
          <Image
            src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png"
            alt="Samadhan Setu Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="logo">Samadhan Setu</div>
        </div>

        <nav>
          <ul>
            <li>
              <a href="#">
                <FaUser /> Profile
              </a>
            </li>
            <li>
              <a href="#">
                <FaCog /> Settings
              </a>
            </li>
            <li>
              <a href="#">
                <FaAward /> Achievements
              </a>
            </li>
            <li>
              <a href="#">
                <FaHistory /> Activity
              </a>
            </li>
            <li>
              <a href="#">
                <FaSignOutAlt /> Logout
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            <FaMoon />
          </button>

          <div className="language-selector">
            <button className="language-btn" onClick={toggleLang}>
              <FaGlobe /> <span>English</span> <FaCaretDown />
            </button>
            {isLangOpen && (
              <div className="language-dropdown">
                <button>English</button>
                <button>Hindi</button>
                <button>Marathi</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content">
        <section>
          <h2 className="section-title">
            <FaUsers /> Featured Nature Heroes
          </h2>

          <div className="hero-card">
            <Image
              src="https://via.placeholder.com/300x200"
              alt="Hero"
              width={300}
              height={200}
            />
            <h3>Anika Sharma</h3>
            <p>Environmental Activist</p>
            <div className="hero-location">
              <FaMapMarkerAlt />
              <span>Mumbai, Maharashtra</span>
            </div>
            <div className="hero-actions">
              <button className="btn-connect">
                <FaHandshake /> Connect
              </button>
              <button className="btn-follow">
                <FaPlus />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
