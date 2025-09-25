'use client';
// pages/index.tsx (or any other appropriate path in your Next.js project)
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import SamadhanSetuPage from '../components/SamadhanSetuPage/SamadhanSetuPage';
// To use Leaflet in Next.js, we need to import it dynamically to avoid issues with Server-Side Rendering (SSR).
import dynamic from 'next/dynamic';
import './home.css';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
// const MapWithNoSSR = dynamic(() => import('../components/Map'), {
//   ssr: false,
// });

// Component for the map (to be placed in a file like components/Map.tsx)
// I'm including it here for a single-file answer, but it's better to separate it.
const Map = () => {
    const mapRef = useRef<HTMLElement | null>(null);
    const mapInstance = useRef<any>(null); // To hold the map instance

    useEffect(() => {
        // This check ensures the map is only initialized once.
        if (mapInstance.current) return;
        
        // const L = require('leaflet'); // Import Leaflet inside useEffect
        // require('leaflet/dist/leaflet.css');

        // Fix for default marker icon issue with webpack
        // const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png');
        // const iconUrl = require('leaflet/dist/images/marker-icon.png');
        // const shadowUrl = require('leaflet/dist/images/shadow.png');

        // const DefaultIcon = L.icon({
        //     iconRetinaUrl,
        //     iconUrl,
        //     shadowUrl,
        //     iconSize: [25, 41],
        //     iconAnchor: [12, 41],
        //     popupAnchor: [1, -34],
        //     tooltipAnchor: [16, -28],
        //     shadowSize: [41, 41],
        // });
        // L.Marker.prototype.options.icon = DefaultIcon;
        
        // Initialize map
        // const map = L.map('map').setView([23.2599, 77.4126], 12);
        // mapInstance.current = map;

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        // Add sample markers
        // L.marker([23.2456, 77.4004]).addTo(map).bindPopup('<strong>Pothole on Hoshangabad Road</strong><br>Status: New');
        // L.marker([23.2432, 77.4320]).addTo(map).bindPopup('<strong>Graffiti in TT Nagar Park</strong><br>Status: In Progress');
        // L.marker([23.2350, 77.4315]).addTo(map).bindPopup('<strong>Broken Streetlight in MP Nagar</strong><br>Status: Resolved');
    }, []);

    return <div id="map" style={{ height: '500px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}></div>;
};


// Main Page Component

// --- Translations Object ---
const translations: { [key: string]: { [key: string]: string } } = {
    en: {
        title: "Samadhan Setu",
        // ... all other English translations
    },
    hi: {
        title: "समाधान सेतु",
        // ... all other Hindi translations
    },
    // ... other languages
};
export default function Home() {
  return (
    <div>

      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              {/* <!-- Replace with your logo image --> */}
              <img src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png" alt="Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview" />
                <span className="translate" data-key="title">Samadhan Setu</span>
            </div>
            <nav>
              <ul>
                <li><a href="#" className="translate" data-key="home">HOME</a></li>
                <li><a href="#how-it-works" className="translate" data-key="reports">REPORTS</a></li>
                <li><a href="#map" className="translate" data-key="viewMap">VIEW MAP</a></li>
                <li><a href="#" className="translate" data-key="dashboard">DASHBOARD</a></li>
                <li><a href="http://127.0.0.1:5500/sih-frontend/loginforcityo.html" target="blank" className="translate" data-key="cityOfficials">FOR CITY OFFICIALS</a></li>
              </ul>
            </nav>
            <div className="header-actions">
              <div className="language-selector">
                <button className="language-btn">
                  <div className="indian-flag"></div> <span className="translate" data-key="language">English</span>
                </button>
                <div className="language-dropdown" id="languageDropdown">
                  <div className="language-option active" data-lang="en">
                    <i className="fas fa-check"></i> English
                  </div>
                  <div className="language-option" data-lang="hi">
                    <span>हिन्दी (Hindi)</span>
                  </div>
                  <div className="language-option" data-lang="ta">
                    <span>தமிழ் (Tamil)</span>
                  </div>
                  <div className="language-option" data-lang="te">
                    <span>తెలుగు (Telugu)</span>
                  </div>
                  <div className="language-option" data-lang="ml">
                    <span>മലയാളം (Malayalam)</span>
                  </div>
                </div>
              </div>
              <Link href = "./signup" ><button className="header-report-btn">
                <i className="fas fa-bullhorn"></i> <span className="translate" data-key="reportCivicIssue">Report Civic Issue</span>
              </button></Link>
              <div className="auth-buttons">
                <Link href='/citizen'><button className="btn btn-outline translate" data-key="login">Login</button></Link>
                <Link href='/citizen'><button className="btn btn-primary translate" data-key="signUp">Sign Up</button></Link>
              </div>
              <button className="theme-toggle" id="themeToggle">
                <i className="fas fa-moon"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
  <div className="container">
    <div className="hero-content">
      <h1 className="translate" data-key="heroTitle">
        Your Voice For A Better Change{" "}
      </h1>
      <p className="translate" data-key="heroText">
        See an issue? Report local issues like potholes, broken streetlights,
        and graffiti directly to your local government.Track its progress fron
        submission to resolution. Let's build a smarter city together.
      </p>
      <button className="report-btn-large" id="reportIssueBtn">
        <i className="fas fa-plus-circle" />{" "}
        <span className="translate" data-key="reportCivicIssueHere">
          Report Civic Issues Here
        </span>
      </button>
    </div>
  </div>
</section>

<>
  <div className="curved-divider" />
  {/* How the System Works */}
  <section className="workflow-section" id="how-it-works">
    <div className="container">
      <h2 className="section-title translate" data-key="howItWorks">
        How Samadhan Setu Works
      </h2>
      <p className="section-subtitle translate" data-key="howItWorksSubtitle">
        Our simple three-step process makes reporting civic issues quick and
        effective
      </p>
      <div className="workflow-cards">
        <div className="workflow-card">
          <div className="workflow-card-header translate" data-key="step1">
            <div className="step-icon">
              <i className="fas fa-camera" />
            </div>
            1. See &amp; Snap
          </div>
          <div className="workflow-card-body">
            <p className="translate" data-key="step1Desc">
              Spot an issue in your community that needs attention from local
              authorities.
            </p>
            <ul>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step1Point1">
                  Take a clear photo of the issue
                </span>
              </li>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step1Point2">
                  Note the exact location
                </span>
              </li>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step1Point3">
                  Provide a brief description
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="workflow-card">
          <div className="workflow-card-header translate" data-key="step2">
            <div className="step-icon">
              <i className="fas fa-route" />
            </div>
            2. We Route
          </div>
          <div className="workflow-card-body">
            <p className="translate" data-key="step2Desc">
              Our system automatically directs your report to the appropriate
              department.
            </p>
            <ul>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step2Point1">
                  AI-powered categorization
                </span>
              </li>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step2Point2">
                  Geographic routing to local teams
                </span>
              </li>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step2Point3">
                  Priority assignment based on severity
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="workflow-card">
          <div className="workflow-card-header translate" data-key="step3">
            <div className="step-icon">
              <i className="fas fa-chart-line" />
            </div>
            3. You Track
          </div>
          <div className="workflow-card-body">
            <p className="translate" data-key="step3Desc">
              Follow your report's progress from submission to resolution.
            </p>
            <ul>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step3Point1">
                  Real-time status updates
                </span>
              </li>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step3Point2">
                  Estimated resolution times
                </span>
              </li>
              <li>
                <i className="fas fa-check-circle" />{" "}
                <span className="translate" data-key="step3Point3">
                  Notifications when resolved
                </span>
              </li>
            </ul>
          </div>
          <div className="workflow-card-footer">
            <button
              className="btn btn-primary translate"
              data-key="trackReports"
            >
              Track Your Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* How to Report Section */}
  <section className="reporting-steps">
    <div className="container">
      <h2 className="section-title translate" data-key="howToReport">
        How to Report an Issue
      </h2>
      <p className="section-subtitle translate" data-key="howToReportSubtitle">
        Follow these simple steps to report civic issues in your area
      </p>
      <div className="steps-container">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-icon-small">
            <i className="fas fa-user-plus" />
          </div>
          <h3 className="translate" data-key="reportStep1">
            Login / Sign Up
          </h3>
          <p className="translate" data-key="reportStep1Desc">
            Create an account or login to your existing Samadhan Setu account to
            get started.
          </p>
        </div>
        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-icon-small">
            <i className="fas fa-map-marker-alt" />
          </div>
          <h3 className="translate" data-key="reportStep2">
            Locate Your Issue
          </h3>
          <p className="translate" data-key="reportStep2Desc">
            Find the exact location on our map or allow us to automatically
            detect your location.
          </p>
        </div>
        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-icon-small">
            <i className="fas fa-edit" />
          </div>
          <h3 className="translate" data-key="reportStep3">
            Describe the Problem
          </h3>
          <p className="translate" data-key="reportStep3Desc">
            Provide details about the issue, add photos, and categorize it
            properly.
          </p>
        </div>
        <div className="step-card">
          <div className="step-number">4</div>
          <div className="step-icon-small">
            <i className="fas fa-paper-plane" />
          </div>
          <h3 className="translate" data-key="reportStep4">
            Submit Your Report
          </h3>
          <p className="translate" data-key="reportStep4Desc">
            Review and submit your report. You'll receive a tracking number for
            follow-up.
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button className="report-btn-large" id="reportIssueBtn2">
          <i className="fas fa-plus-circle" />{" "}
          <span className="translate" data-key="reportIssueNow">
            Report an Issue Now
          </span>
        </button>
      </div>
    </div>
  </section>
  {/* Map Section */}
  <section className="map-section" id="map">
    <div className="container">
      <div className="map-title">
        <h2 className="section-title translate" data-key="currentIssues">
          Current Issues in Bhopal
        </h2>
        <div className="location-badge">
          <i className="fas fa-map-pin" />{" "}
          <span className="translate" data-key="bhopalLocation">
            Bhopal, Madhya Pradesh
          </span>
        </div>
      </div>
      <div id="map" />
    </div>
  </section>
  {/* Reports Section */}
  <section className="reports-container" id="reports">
    <div className="container">
      <h2 className="section-title translate" data-key="recentIssues">
        Recently Reported Issues in Bhopal
      </h2>
      <p className="section-subtitle translate" data-key="recentIssuesSubtitle">
        These are some of the recent issues reported by citizens in your area
      </p>
      <div className="filters">
        <select className="filter-select">
          <option className="translate" data-key="allCategories">
            All Categories
          </option>
          <option className="translate" data-key="potholes">
            Potholes
          </option>
          <option className="translate" data-key="streetlights">
            Streetlights
          </option>
          <option className="translate" data-key="graffiti">
            Graffiti
          </option>
          <option className="translate" data-key="trash">
            Trash
          </option>
          <option className="translate" data-key="waterSupply">
            Water Supply
          </option>
        </select>
        <select className="filter-select">
          <option className="translate" data-key="allStatuses">
            All Statuses
          </option>
          <option className="translate" data-key="new">
            New
          </option>
          <option className="translate" data-key="inProgress">
            In Progress
          </option>
          <option className="translate" data-key="resolved">
            Resolved
          </option>
        </select>
        <select className="filter-select">
          <option className="translate" data-key="sortNewest">
            Sort by Newest
          </option>
          <option className="translate" data-key="sortOldest">
            Sort by Oldest
          </option>
          <option className="translate" data-key="sortPriority">
            Sort by Priority
          </option>
        </select>
      </div>
      <div className="reports-grid">
        {/* Sample Report Cards */}
        <div className="report-card">
          <div className="report-image">
            <img
              src="data:image/jpeg;base64,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"
              alt="Pothole report"
            />
          </div>
          <div className="report-content">
            <span className="report-status status-new translate" data-key="new">
              New
            </span>
            <h3 className="report-title translate" data-key="potholeTitle">
              Large Pothole on Hoshangabad Road
            </h3>
            <p className="translate" data-key="potholeDesc">
              Deep pothole near Habibganj area, causing traffic issues during
              peak hours.
            </p>
            <div className="report-meta">
              <span>
                <i className="fas fa-user" />{" "}
                <span className="translate" data-key="reporter1">
                  Rajesh K.
                </span>
              </span>
              <span>
                <i className="fas fa-clock" />{" "}
                <span className="translate" data-key="time1">
                  2 hours ago
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="report-card">
          <div className="report-image">
            <img
              src=" https://thfvnext.bing.com/th/id/OIP.-Edu2LivIFOGAdcZoTqBnQHaE3?w=250&h=180&c=7&r=0&o=5&cb=thfvnext&pid=1.7"
              alt="Graffiti report"
            />
          </div>
          <div className="report-content">
            <span
              className="report-status status-progress translate"
              data-key="inProgress"
            >
              In Progress
            </span>
            <h3 className="report-title translate" data-key="graffitiTitle">
              Graffiti in TT Nagar Park
            </h3>
            <p className="translate" data-key="graffitiDesc">
              Extensive graffiti on walls and playground equipment in TT Nagar
              Park.
            </p>
            <div className="report-meta">
              <span>
                <i className="fas fa-user" />{" "}
                <span className="translate" data-key="reporter2">
                  Priya M.
                </span>
              </span>
              <span>
                <i className="fas fa-clock" />{" "}
                <span className="translate" data-key="time2">
                  1 day ago
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="report-card">
          <div className="report-image">
            <img
              src="data:image/jpeg;base64,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"
              alt="Streetlight report"
            />
          </div>
          <div className="report-content">
            <span
              className="report-status status-resolved translate"
              data-key="resolved"
            >
              Resolved
            </span>
            <h3 className="report-title translate" data-key="streetlightTitle">
              Broken Streetlight in MP Nagar
            </h3>
            <p className="translate" data-key="streetlightDesc">
              Streetlight has been out for three days, making the area dark and
              unsafe at night.
            </p>
            <div className="report-meta">
              <span>
                <i className="fas fa-user" />{" "}
                <span className="translate" data-key="reporter3">
                  Amit S.
                </span>
              </span>
              <span>
                <i className="fas fa-clock" />{" "}
                <span className="translate" data-key="time3">
                  5 days ago
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="reportCards" />
    </div>
  </section>
  {/* Report Modal */}
  <div className="modal" id="reportModal">
    <div className="modal-content">
      <span className="close-modal">×</span>
      <h2 className="translate" data-key="reportNewIssue">
        Report a New Issue
      </h2>
      <form id="reportForm">
        <div className="form-group">
          <label htmlFor="issueType" className="translate" data-key="issueType">
            Issue Type
          </label>
          <select className="form-control" id="issueType" required>
            <option value="" className="translate" data-key="selectIssueType">
              Select an issue type
            </option>
            <option
              value="pothole"
              className="translate"
              data-key="potholeOption"
            >
              Pothole
            </option>
            <option
              value="streetlight"
              className="translate"
              data-key="streetlightOption"
            >
              Streetlight
            </option>
            <option
              value="graffiti"
              className="translate"
              data-key="graffitiOption"
            >
              Graffiti
            </option>
            <option value="trash" className="translate" data-key="trashOption">
              Trash Accumulation
            </option>
            <option value="water" className="translate" data-key="waterOption">
              Water Supply Issue
            </option>
            <option value="other" className="translate" data-key="otherOption">
              Other
            </option>
          </select>
          <div className="other-issue-type" id="otherIssueType">
            <input
              type="text"
              className="form-control"
              placeholder="Please specify the issue type"
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="issueLocation"
            className="translate"
            data-key="issueLocation"
          >
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="issueLocation"
            placeholder="Enter address or drag the map marker"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="issueDescription"
            className="translate"
            data-key="issueDescription"
          >
            Description
          </label>
          <textarea
            className="form-control"
            id="issueDescription"
            placeholder="Please describe the issue in detail"
            defaultValue={""}
          />
          <div className="voice-note-container">
            <label className="translate" data-key="addVoiceNote">
              Add Voice Note (Optional)
            </label>
            <button
              type="button"
              className="voice-record-btn"
              id="voiceRecordBtn"
            >
              <i className="fas fa-microphone" />{" "}
              <span className="translate" data-key="startRecording">
                Start Recording
              </span>
            </button>
            <div className="voice-playback" id="voicePlayback">
              <audio />
              <span className="voice-timer">00:00</span>
              <button
                type="button"
                className="btn btn-danger"
                id="deleteRecording"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="issuePhoto"
            className="translate"
            data-key="uploadPhoto"
          >
            Upload Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="issuePhoto"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ width: "100%", padding: "1rem" }}
          data-key="submitReport"
        >
          Submit Report
        </button>
      </form>
    </div>
  </div>
</>



    </div>
  );
}
