// components/Header.tsx
import React from 'react';
import '@/app/citizen/citizen.css';

interface HeaderProps {
  onNavLinkClick: (section: string) => void;
  onThemeToggle: () => void;
  currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ onNavLinkClick, onThemeToggle, currentTheme }) => {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
            <i className="fas fa-bars text-white"></i>
          </button>

          <a className="navbar-brand text-white" href="#">
            <img src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png" alt="Logo" />
            <span className="d-none d-md-inline">Samadhan Setu</span>
          </a>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><a href="#" className="nav-link active" onClick={() => onNavLinkClick('dashboard')}><i className="fas fa-home"></i> HOME</a></li>
              <li className="nav-item"><a href="#" className="nav-link" onClick={() => onNavLinkClick('reports')}><i className="fas fa-file-alt"></i> MY REPORTS</a></li>
              <li className="nav-item"><a href="#" className="nav-link" onClick={() => onNavLinkClick('map')}><i className="fas fa-map-marked-alt"></i> VIEW MAP</a></li>
              <li className="nav-item"><a href="#" className="nav-link" onClick={() => onNavLinkClick('leaderboard')}><i className="fas fa-trophy"></i> LEADERBOARD</a></li>
              <li className="nav-item"><a href="#" className="nav-link" onClick={() => onNavLinkClick('rewards')}><i className="fas fa-gift"></i> REWARDS</a></li>
            </ul>
          </div>

          <div className="header-actions">
            <button className="btn-report" data-bs-toggle="modal" data-bs-target="#reportModal">
              <i className="fas fa-plus-circle"></i> <span>Report Issue</span>
            </button>
            <div className="location-selector d-none d-lg-flex">
              <i className="fas fa-map-marker-alt"></i>
              <span>Bhopal, MP</span>
            </div>

            <div className="dropdown language-selector">
              <button className="btn dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="Indian Flag" className="language-flag" />
                <span>EN</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">हिन्दी</a></li>
                <li><a className="dropdown-item" href="#">मराठी</a></li>
              </ul>
            </div>

            <button className="theme-toggle" id="themeToggle" onClick={onThemeToggle}>
              <i className={currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>

            <div className="dropdown">
              <button className="btn border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="User" className="profile-img" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="fas fa-user fa-fw me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-cog fa-fw me-2"></i>Settings</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-award fa-fw me-2"></i>Achievements</a></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-history fa-fw me-2"></i>Activity</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
