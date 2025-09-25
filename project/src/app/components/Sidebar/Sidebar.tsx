// components/Sidebar.tsx
import React, { useEffect } from 'react';
import { Offcanvas } from 'bootstrap';
import '@/app/citizen/citizen.css';

interface SidebarProps {
  onNavLinkClick: (section: string) => void;
  onThemeToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavLinkClick, onThemeToggle }) => {
  useEffect(() => {
    // Initialize Offcanvas if not already
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement && !Offcanvas.getInstance(sidebarElement)) {
      new Offcanvas(sidebarElement);
    }
  }, []);

  const handleReportIssueClick = () => {
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      const sidebar = Offcanvas.getInstance(sidebarElement);
      if (sidebar) sidebar.hide();
    }
  };

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebar" aria-labelledby="sidebarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarLabel">Samadhan Setu</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column p-0">
        <ul className="slide-menu flex-grow-1">
          <li><a href="#" className="nav-link active" onClick={() => onNavLinkClick('dashboard')}><i className="fas fa-home fa-fw"></i> HOME</a></li>
          <li><a href="#" className="nav-link" onClick={() => onNavLinkClick('reports')}><i className="fas fa-file-alt fa-fw"></i> MY REPORTS</a></li>
          <li><a href="#" className="nav-link" onClick={() => onNavLinkClick('map')}><i className="fas fa-map-marked-alt fa-fw"></i> VIEW MAP</a></li>
          <li><a href="#" className="nav-link" onClick={() => onNavLinkClick('leaderboard')}><i className="fas fa-trophy fa-fw"></i> LEADERBOARD</a></li>
          <li><a href="#" className="nav-link" onClick={() => onNavLinkClick('rewards')}><i className="fas fa-gift fa-fw"></i> REWARDS</a></li>
          <li><a href="#" className="nav-link" onClick={() => onNavLinkClick('blogs')}><i className="fas fa-blog fa-fw"></i> BLOGS</a></li>
          <li><a href="#" className="nav-link" onClick={() => onNavLinkClick('ngos')}><i className="fas fa-hand-holding-heart fa-fw"></i> NGOs</a></li>

          <li><hr className="text-white-50 mx-3" /></li>

          <li><a href="#" data-bs-toggle="modal" data-bs-target="#reportModal" onClick={handleReportIssueClick}><i className="fas fa-plus-circle fa-fw"></i> REPORT ISSUE</a></li>
          <li><a href="#" id="sidebarThemeToggle" onClick={(e) => { e.preventDefault(); onThemeToggle(); }}><i className="fas fa-moon fa-fw"></i> TOGGLE THEME</a></li>

          <li><hr className="text-white-50 mx-3" /></li>

          <li><a href="#"><i className="fa-solid fa-user fa-fw"></i>Emergency Alerts</a></li>
          <li><a href="#"><i className="fa-solid fa-bell fa-fw"></i>Notifications</a></li>
          <li><a href="#"><i className="fa-solid fa-check fa-fw"></i>Verified NGOs Partner</a></li>
          <li><a href="#"><i className="fa-solid fa-gear fa-fw"></i>Settings</a></li>
          <li><a href="#"><i className="fa-solid fa-envelope fa-fw"></i>Email & SMS Support</a></li>
          <li><a href="#"><i className="fa-solid fa-circle-question fa-fw"></i>Help & Support</a></li>
        </ul>
        <div className="sidebar-socials p-4">
          <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i className="fa-brands fa-github"></i></a>
          <a href="#"><i className="fa-brands fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
