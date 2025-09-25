"use client";
import { useState } from "react";
import Image from "next/image";
import "./cityofficial.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function OfficialPortal() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <header className="official-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo d-flex align-items-center">
              <img
                src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png"
                alt="Samadhan Setu Logo"
                width={60}
                height={60}
              />
              <span data-translate="portal_title" className="ms-2">
                Samadhan Setu - City Officials Portal
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="language-selector">
                <button className="selector-button">
                  <i className="fas fa-globe"></i>{" "}
                  <span data-translate="language">Language</span>
                </button>
                <div className="language-list">
                  <a href="#" data-lang="en">
                    English
                  </a>
                  <a href="#" data-lang="hi">
                    हिन्दी (Hindi)
                  </a>
                  <a href="#" data-lang="ml">
                    മലയാളം (Malayalam)
                  </a>
                  <a href="#" data-lang="te">
                    తెలుగు (Telugu)
                  </a>
                  <a href="#" data-lang="ta">
                    தமிழ் (Tamil)
                  </a>
                </div>
              </div>
              <button className="theme-toggle" id="themeToggle">
                <i className="fas fa-moon"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-4">
        {/* Dashboard Stats */}
        <div className="row mb-4">
          {[
            {
              icon: "fas fa-exclamation-circle text-primary",
              count: 142,
              label: "total_reports",
            },
            {
              icon: "fas fa-clock text-warning",
              count: 38,
              label: "pending_resolution",
            },
            {
              icon: "fas fa-flag text-danger",
              count: 12,
              label: "high_priority",
            },
            {
              icon: "fas fa-check-circle text-success",
              count: 94,
              label: "resolved_issues",
            },
          ].map((stat, i) => (
            <div className="col-md-3" key={i}>
              <div className="stats-card text-center">
                <div className="icon">
                  <i className={stat.icon}></i>
                </div>
                <div className="count">{stat.count}</div>
                <div className="label" data-translate={stat.label}>
                  {stat.label.replace("_", " ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4" id="officialTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="issues-tab"
              data-bs-toggle="tab"
              data-bs-target="#issues"
              type="button"
              role="tab"
              aria-controls="issues"
              aria-selected="true"
            >
              <i className="fas fa-list me-2"></i>
              <span data-translate="all_issues">All Issues</span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="map-tab"
              data-bs-toggle="tab"
              data-bs-target="#map"
              type="button"
              role="tab"
              aria-controls="map"
              aria-selected="false"
            >
              <i className="fas fa-map-marked-alt me-2"></i>
              <span data-translate="map_view">Map View</span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="analytics-tab"
              data-bs-toggle="tab"
              data-bs-target="#analytics"
              type="button"
              role="tab"
              aria-controls="analytics"
              aria-selected="false"
            >
              <i className="fas fa-chart-bar me-2"></i>
              <span data-translate="analytics">Analytics</span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="departments-tab"
              data-bs-toggle="tab"
              data-bs-target="#departments"
              type="button"
              role="tab"
              aria-controls="departments"
              aria-selected="false"
            >
              <i className="fas fa-building me-2"></i>
              <span data-translate="departments">Departments</span>
            </button>
          </li>
        </ul>

        {/* Tabs Content */}
        <div className="tab-content" id="officialTabsContent">
          {/* Issues Tab (shortened example) */}
          <div
            className="tab-pane fade show active"
            id="issues"
            role="tabpanel"
            aria-labelledby="issues-tab"
          >
            <div className="dashboard-section">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="section-title" data-translate="report_management">
                  Report Management
                </h3>
                {/* Filters and Sort */}
                <div className="d-flex">
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      id="filterDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-filter me-1"></i>
                      <span data-translate="filter">Filter</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                      <li>
                        <a className="dropdown-item" href="#">
                          All Issues
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          High Priority
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Pending Resolution
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Resolved
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="sortDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-sort me-1"></i>
                      <span data-translate="sort">Sort</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                      <li>
                        <a className="dropdown-item" href="#">
                          Newest First
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Oldest First
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Priority
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Issues Table */}
              <div className="table-responsive issues-table">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Issue Type</th>
                      <th>Location</th>
                      <th>Reported On</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1247</td>
                      <td>Pothole</td>
                      <td>Hoshangabad Road</td>
                      <td>2 hours ago</td>
                      <td>
                        <span className="badge priority-high">High</span>
                      </td>
                      <td>
                        <span className="badge status-new">New</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-1">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-success">
                          <i className="fas fa-user-check"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Map / Analytics / Departments Tabs go here (similar JSX conversion) */}
        </div>
      </div>

      {/* Sidebar */}
      <button
        className="toggle-btn"
        onClick={() => setSidebarOpen(true)}
      >
        <i className="fas fa-bars"></i> <span>Menu</span>
      </button>

      <div className={`slidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
        <div className="close-btn" onClick={() => setSidebarOpen(false)}>
          <i className="fas fa-times"></i>
        </div>
        <h1>Samadhan Setu</h1>
        <ul className="Menu">
          <li className="active">
            <a href="#">
              <i className="fa-solid fa-user"></i> User Profile
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-envelope"></i> Messages
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-exclamation-circle"></i> Reports
            </a>
          </li>
        </ul>
      </div>

      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Footer */}
      <footer className="official-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>
                &copy; 2025 Samadhan Setu - City Grievance Portal. All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-light me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-light me-3">
                Terms of Service
              </a>
              <a href="#" className="text-light">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
