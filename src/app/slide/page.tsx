"use client";
import { useState } from "react";
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaChartLine, 
  FaEnvelope, 
  FaCog,             // settings icon
  FaQuestionCircle,  // help & support icon
  FaFacebookF, 
  FaGithub, 
  FaTwitter 
} from "react-icons/fa";
import "./slide.css"


export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars /> Menu
      </button>

      {/* Sidebar */}
      <div className={`slidebar ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </div>
        <h1>Samadhan Setu</h1>
        <ul className="Menu">
          <li className="active">
            <a href="#"><FaUser /> User Profile</a>
          </li>
          <li>
            <a href="#"><FaChartLine /> Dashboard</a>
          </li>
          <li>
            <a href="#"><FaEnvelope /> Messages</a>
          </li>
          <li>
            <a href="#"><FaCog /> Settings</a>
          </li>
          <li>
            <a href="#"><FaQuestionCircle /> Help & Support
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
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="content">
        <h2>Left-Aligned Slide Menu</h2>
        <p>This menu is fixed to the left edge of the screen and slides in from the left. The toggle button is also positioned on the left side.</p>
        <p>Click the "Menu" button on the left to open the navigation panel, and click the X button or outside the menu to close it.</p>
        <p>The menu items and social icons are interactive with hover effects.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
    </div>
  );
}
