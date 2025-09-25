'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faFileAlt, faMapMarkedAlt, faTrophy, faGift, faPlusCircle, faMapMarkerAlt, faGlobe, faCaretDown, faMoon, faSun, faUser as faUserSolid, faCog, faAward, faHistory, faSignOutAlt, faBolt, faPlus, faList, faCircleQuestion, faEnvelope, faCheck, faBell, faGear, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './citizen.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createClient } from '@supabase/supabase-js'
import LeafletMap from '../components/LeafletMap/LeafletMap';
import Link from "next/link"
import { redirect } from "next/navigation";
import Card from '../components/Card/Card';

// const supabaseUrl = "https://crlwyhjstuzfkwtntrfp.supabase.co";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybHd5aGpzdHV6Zmt3dG50cmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODAwNTEsImV4cCI6MjA3Mjc1NjA1MX0._ATMJepBQSJJ1WFgjNO44fN2yYqn2jV8c4UkvvRFoGw";

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Card {
    id: string;
    title: string;
    description: string;
    status: string;
    latitude: number;
    longitude: number;
    created_at: string;
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function FixMapSize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100); // small delay ensures modal is visible
  }, [map]);
  return null;
}

export default function DashboardPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [report, setReport] = useState({
        title: "",
        description: "",
        latitude: 0,
        longitude: 0
    });
    const [image, setImage] = useState<File | null>(null);

    const [name, setName] = useState<string | null>(null);
    const [id, setId] = useState("");

    const [card, setCard] = useState<Card[]>([]);

    // Cookie

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            const parsed = JSON.parse(user);
            setName(parsed.name);
            setId(parsed.id);
            console.log('name', name);
            console.log('id', id);
        } else {
            redirect("/login")
        }

        const fetchReports = async () => {
            const { data, error } = await supabase
                .from("reports")
                .select("*")
                .eq("by", id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching reports:", error.message);
                return;
            }


            setCard(data as Card[]);
        };

        fetchReports();
        console.log(id);

    }, [name, id]);

    // Fetch reports

    // useEffect(() => {
    //     const fetchReports = async () => {
    //         const { data, error } = await supabase
    //             .from("reports")
    //             .select("*")
    //             .eq("by", id)
    //             .order("created_at", { ascending: false });

    //         if (error) {
    //             console.error("Error fetching reports:", error.message);
    //             return;
    //         }


    //         setCard(data as Card[]);
    //     };

    //     fetchReports();
    //     console.log(id);
    // }, []);

    const getImageUrl = (id: string) => {
        return supabase.storage
            .from("reports")
            .getPublicUrl(`${id}.jpg`).data.publicUrl;
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setReport((prev) => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                }));
            },
        });

        return report.latitude && report.longitude ? (
            <Marker position={[report.latitude, report.longitude]} />
        ) : null;
    };

    // const handleReport = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     try {
    //         // Insert into reports with geometry string
    //         const { data, error } = await supabase
    //             .from("reports")
    //             .insert([
    //                 {
    //                     title: report.title,
    //                     description: report.description,
    //                     location: `SRID=4326;POINT(${report.longitude} ${report.latitude})`,
    //                 },
    //             ])
    //             .select("id")
    //             .single();

    //         if (error) throw error;

    //         const reportId = data.id;

    //         // Upload image to storage
    //         if (image) {
    //             const { error: uploadError } = await supabase.storage
    //                 .from("reports")
    //                 .upload(`${reportId}.jpg`, image, {
    //                     cacheControl: "3600",
    //                     upsert: true,
    //                 });

    //             if (uploadError) throw uploadError;
    //         }

    //         alert("Report submitted successfully ✅");
    //         setReport({ title: "", description: "", latitude: 0, longitude: 0 });
    //         setImage(null);
    //     } catch (err: any) {
    //         console.error("Error submitting report:", err.message);
    //         alert("Failed to submit report ❌");
    //     }
    // };



    const handleReport = async () => {

        const formData = new FormData();
        formData.append("title", report.title);
        formData.append("description", report.description);
        formData.append("latitude", report.latitude.toString());
        formData.append("longitude", report.longitude.toString());
        formData.append("id", id);
        if (image) formData.append("image", image);

        const res = await fetch("/api/report", {
            method: "POST",
            body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
            alert(`❌ ${result.error}`);
            return;
        }

        alert("✅ Report submitted successfully!");
        setReport({ title: "", description: "", latitude: 0, longitude: 0 });
        setImage(null);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleLanguageDropdown = () => {
        setShowLanguageDropdown(!showLanguageDropdown);
        setShowProfileDropdown(false);
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
        setShowLanguageDropdown(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
        setShowSidebar(false);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        handleSectionChange(sectionId);
    };

    const handleCardClick = (sectionId: string) => {
        if (sectionId === 'report-issue-card') {
            openModal();
        } else {
            handleSectionChange(sectionId);
        }
    };

    return (
        <>
            <style jsx global>{`
                :root {
                    --primary: #3498db;
                    --secondary: #2ecc71;
                    --danger: #e74c3c;
                    --warning: #f39c12;
                    --dark: #2c3e50;
                    --light: #ecf0f1;
                    --grey: #7f8c8d;
                    --bg-color: #f5f7fa;
                    --text-color: #333;
                    --card-bg: white;
                    --header-bg: linear-gradient(135deg, #3498db, #2c3e50);
                    --footer-bg: #2c3e50;
                    --section-bg: white;
                    --section-alt-bg: #eff6ff;
                }

                .dark-mode {
                    --bg-color: #1a1a1a;
                    --text-color: #f0f0f0;
                    --card-bg: #2d2d2d;
                    --header-bg: linear-gradient(135deg, #2c3e50, #1a1a1a);
                    --footer-bg: #1a1a1a;
                    --section-bg: #2d2d2d;
                    --section-alt-bg: #252525;
                    --grey: #aaa;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    transition: background-color 0.3s, color 0.3s;
                }

                body {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                }

                .container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                }

                header {
                    background: var(--header-bg);
                    color: white;
                    padding: 0.8rem 15px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                }

                .logo-img {
                    height: 50px;
                    width: auto;
                }

                .logo h2 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    white-space: nowrap;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }

                nav {
                    flex-grow: 1;
                    display: flex;
                    justify-content: center;
                }

                nav ul {
                    display: flex;
                    list-style: none;
                    gap: 1rem;
                    align-items: center;
                }

                nav a {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    transition: opacity 0.3s;
                    font-size: 0.9rem;
                    white-space: nowrap;
                    padding: 0.5rem 0.8rem;
                    border-radius: 4px;
                }

                nav a:hover,
                nav a.active {
                    background: rgba(255, 255, 255, 0.2);
                }

                .header-actions {
                    display: flex;
                    gap: 0.8rem;
                    align-items: center;
                    flex-shrink: 0;
                }

                .btn-report {
                    background: var(--secondary);
                    color: white;
                    border: none;
                    padding: 0.6rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .btn-report:hover {
                    background: #27ae60;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }

                .location-selector {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .location-selector:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .location-selector i {
                    margin-right: 8px;
                }

                .language-selector {
                    position: relative;
                }

                .language-btn {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: none;
                    padding: 0.6rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 500;
                    transition: background 0.3s;
                }

                .language-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .language-btn .fa-caret-down {
                    transition: transform 0.3s;
                }

                .language-selector.open .language-btn .fa-caret-down {
                    transform: rotate(180deg);
                }

                .language-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: var(--card-bg);
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    width: 150px;
                    display: none;
                    z-index: 101;
                    margin-top: 0.8rem;
                    overflow: hidden;
                    animation: fadeIn 0.2s ease-out;
                }

                .language-dropdown.show {
                    display: block;
                }

                .language-dropdown a {
                    display: block;
                    padding: 0.8rem 1rem;
                    color: var(--text-color);
                    text-decoration: none;
                    transition: background 0.3s;
                }

                .language-dropdown a:hover {
                    background: var(--section-alt-bg);
                }

                .theme-toggle {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    flex-shrink: 0;
                }

                .theme-toggle:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .user-profile {
                    position: relative;
                }

                .profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .profile-img {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid white;
                }

                .profile-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: var(--card-bg);
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    width: 200px;
                    display: none;
                    z-index: 101;
                    margin-top: 0.8rem;
                    overflow: hidden;
                }

                .profile-dropdown.show {
                    display: block;
                    animation: fadeIn 0.2s ease-out;
                }

                .profile-dropdown a {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding: 0.8rem 1rem;
                    color: var(--text-color);
                    text-decoration: none;
                    transition: background 0.3s;
                }

                .profile-dropdown a:hover {
                    background: var(--section-alt-bg);
                }

                .profile-dropdown a svg {
                    width: 20px;
                    text-align: center;
                }

                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.6);
                    align-items: center;
                    justify-content: center;
                }

                .modal.show {
                    display: flex;
                }

                .modal-content {
                    background-color: var(--card-bg);
                    margin: auto;
                    padding: 2rem;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 500px;
                    position: relative;
                    animation: fadeIn 0.3s;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .close-btn {
                    color: var(--grey);
                    font-size: 1.5rem;
                    font-weight: bold;
                    cursor: pointer;
                }

                .close-btn:hover {
                    color: var(--danger);
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                .form-group input,
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid var(--grey);
                    border-radius: 6px;
                    background: var(--section-alt-bg);
                    color: var(--text-color);
                    font-size: 1rem;
                }

                .btn-submit {
                    width: 100%;
                    padding: 0.8rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .btn-submit:hover {
                    background: #2980b9;
                }

                .dashboard {
                    padding: 2rem 0;
                    min-height: calc(100vh - 200px);
                }

                .section {
                    display: none;
                    animation: fadeIn 0.5s ease;
                }

                .section.active {
                    display: block;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .welcome-banner {
                    background: linear-gradient(135deg, var(--primary), var(--dark));
                    color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .user-info h1 {
                    font-size: 1.8rem;
                    margin-bottom: 0.5rem;
                }

                .user-info p {
                    opacity: 0.9;
                }

                .user-stats {
                    display: flex;
                    gap: 1.5rem;
                }

                .stat-item {
                    text-align: center;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 1rem;
                    border-radius: 8px;
                    min-width: 100px;
                }

                .stat-value {
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-bottom: 0.3rem;
                }

                .stat-label {
                    font-size: 0.9rem;
                    opacity: 0.9;
                }

                .menu-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .menu-card {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 180px;
                }

                .menu-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .gamification-section {
                    background: var(--section-alt-bg);
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }

                .section-title svg {
                    color: var(--primary);
                }

                .badges-container {
                    display: flex;
                    gap: 1.5rem;
                    overflow-x: auto;
                    padding: 0.5rem;
                }

                .badge {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    text-align: center;
                    min-width: 150px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                }

                .badge-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, var(--warning), var(--danger));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 1.5rem;
                    color: white;
                }

                .badge.locked .badge-icon {
                    background: var(--grey);
                    filter: grayscale(1);
                }

                .badge-name {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .badge-desc {
                    font-size: 0.8rem;
                    color: var(--grey);
                }

                .recent-activity {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    margin-bottom: 2rem;
                }

                .activity-list {
                    list-style: none;
                }

                .activity-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem 0;
                    border-bottom: 1px solid var(--section-alt-bg);
                }

                .activity-item:last-child {
                    border-bottom: none;
                }

                .activity-icon {
                    width: 40px;
                    height: 40px;
                    background: var(--section-alt-bg);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    flex-shrink: 0;
                }

                .activity-content {
                    flex-grow: 1;
                }

                .activity-title {
                    font-weight: bold;
                    margin-bottom: 0.3rem;
                }

                .activity-desc {
                    font-size: 0.9rem;
                    color: var(--grey);
                    margin-bottom: 0.3rem;
                }

                .activity-time {
                    font-size: 0.8rem;
                    color: var(--grey);
                }

                .map-container {
                    height: 500px;
                    background: var(--section-alt-bg);
                    border-radius: 12px;
                    overflow: hidden;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }

                .map-placeholder {
                    text-align: center;
                    padding: 2rem;
                }

                .map-placeholder svg {
                    font-size: 3rem;
                    color: var(--primary);
                    margin-bottom: 1rem;
                }

                .reports-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .report-card {
                    background-color: var(--card-bg);
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s;
                }

                .report-card:hover {
                    transform: translateY(-5px);
                }

                .report-image {
                    height: 200px;
                    overflow: hidden;
                }

                .report-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .report-card:hover .report-image img {
                    transform: scale(1.05);
                }

                .report-content {
                    padding: 1.5rem;
                }

                .report-status {
                    display: inline-block;
                    padding: 0.3rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .status-new {
                    background-color: #ffeaa7;
                    color: #d35400;
                }

                .status-progress {
                    background-color: #81ecec;
                    color: #00cec9;
                }

                .status-resolved {
                    background-color: #55efc4;
                    color: #00b894;
                }

                .report-title {
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                    color: var(--text-color);
                }

                .report-meta {
                    display: flex;
                    justify-content: space-between;
                    color: var(--grey);
                    font-size: 0.9rem;
                    margin-top: 1rem;
                }

                .leaderboard-container {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    margin-bottom: 2rem;
                }

                .leaderboard-list {
                    list-style: none;
                }

                .leaderboard-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-bottom: 1px solid var(--section-alt-bg);
                }

                .leaderboard-item:last-child {
                    border-bottom: none;
                }

                .leaderboard-rank {
                    width: 30px;
                    height: 30px;
                    background: var(--section-alt-bg);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .leaderboard-item:first-child .leaderboard-rank {
                    background: gold;
                    color: var(--dark);
                }

                .leaderboard-item:nth-child(2) .leaderboard-rank {
                    background: silver;
                    color: var(--dark);
                }

                .leaderboard-item:nth-child(3) .leaderboard-rank {
                    background: #cd7f32;
                    color: white;
                }

                .leaderboard-user {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    flex-grow: 1;
                }

                .leaderboard-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .leaderboard-points {
                    font-weight: bold;
                    color: var(--primary);
                }

                .chatbot {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    background: var(--primary);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    z-index: 99;
                    transition: all 0.3s;
                }

                .chatbot:hover {
                    transform: scale(1.1);
                }

                footer {
                    background: var(--dark);
                    color: white;
                    padding: 60px 0 30px;
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 40px;
                    margin-bottom: 40px;
                }

                .footer-column h3 {
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                    color: var(--accent);
                }

                .footer-column p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--light-gray);
                }

                .footer-column ul {
                    list-style: none;
                    padding: 0;
                }

                .footer-column ul li {
                    margin-bottom: 10px;
                    font-size: 0.95rem;
                }

                .footer-column a {
                    color: var(--light-gray);
                    text-decoration: none;
                    transition: color 0.3s, padding-left 0.3s;
                }

                .footer-column a:hover {
                    color: white;
                    padding-left: 5px;
                }

                .social-links {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                }

                .social-links a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    transition: background 0.3s;
                    color: white;
                }

                .social-links a:hover {
                    background: var(--primary);
                }

                .copyright {
                    text-align: center;
                    padding-top: 30px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    color: var(--light-gray);
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 1100px) {
                    nav ul {
                        gap: 0.5rem;
                    }
                    nav a {
                        font-size: 0.85rem;
                        padding: 0.4rem 0.6rem;
                    }
                    .btn-report,
                    .language-btn {
                        padding: 0.5rem 0.8rem;
                        font-size: 0.85rem;
                    }
                }

                @media (max-width: 992px) {
                    .header-content {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }
                    nav {
                        order: 3;
                        width: 100%;
                        justify-content: center;
                    }
                    .logo h2 {
                        font-size: 1.2rem;
                    }
                    .welcome-banner {
                        flex-direction: column;
                        text-align: center;
                        gap: 1.5rem;
                    }
                    .user-stats {
                        justify-content: center;
                    }
                }

                .logo-container img {
                    height: 60px;
                    width: 60px;
                }

                @media (max-width: 768px) {
                    .btn-report span,
                    .language-btn span,
                    .location-selector span {
                        display: none;
                    }
                    .language-btn {
                        padding: 0.6rem 0.8rem;
                    }
                    .btn-report {
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        padding: 0;
                        justify-content: center;
                    }
                    .user-stats {
                        flex-wrap: wrap;
                    }
                    .menu-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .logo h2 {
                        display: none;
                    }
                    .logo-img {
                        height: 40px;
                    }
                    .location-selector {
                        padding: 0.5rem;
                    }
                }

                .slidebar {
                    background: linear-gradient(135deg, #1a2a6c, #b21f1f);
                    color: white;
                    height: 100vh;
                    width: 280px;
                    padding: 30px 0;
                    position: fixed;
                    top: 0;
                    left: -280px;
                    overflow-y: auto;
                    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.5);
                    transition: left 0.4s ease-in-out;
                    z-index: 99;
                }

                .slidebar.active {
                    left: 0;
                }

                .dark-mode .slidebar {
                    background: linear-gradient(135deg, #2c3e50, #1a1a1a);
                    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.7);
                }

                .slidebar h1 {
                    color: white;
                    text-align: center;
                    margin: 30px 0 40px;
                    font-size: 28px;
                    padding: 0 20px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    position: relative;
                }

                .slidebar h1::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50px;
                    height: 3px;
                    background: linear-gradient(to right, #1a2a6c, #b21f1f);
                    border-radius: 3px;
                }

                .Menu {
                    margin-bottom: 60px;
                }

                .Menu li {
                    list-style: none;
                    padding: 15px 30px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    border-left: 4px solid transparent;
                }

                .Menu li::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(26, 42, 108, 0.3), transparent);
                    transition: all 0.5s ease;
                }

                .Menu li:hover::before {
                    left: 100%;
                }

                .Menu li:hover,
                .Menu li.active {
                    background: rgba(255, 255, 255, 0.1);
                    border-left: 4px solid #fdbb2d;
                }

                .dark-mode .Menu li:hover,
                .dark-mode .Menu li.active {
                    background: rgba(243, 104, 104, 0.05);
                }

                .Menu a {
                    color: white;
                    text-decoration: none;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                }

                .Menu li:hover a {
                    transform: translateX(5px);
                }

                .fa-solid,
                .fa-brands {
                    width: 30px;
                    font-size: 20px;
                    margin-right: 15px;
                    transition: all 0.3s ease;
                }

                .Menu li:hover .fa-solid {
                    color: #fdbb2d;
                }

                .icons {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    padding: 0 20px;
                    position: absolute;
                    bottom: 30px;
                    left: 0;
                }

                .icons a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 45px;
                    font-size: 22px;
                    margin: 0 15px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                .icons a:hover {
                    transform: translateY(-5px);
                    background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%);
                    box-shadow: 0 5px 15px rgba(178, 31, 31, 0.4);
                }

                .dark-mode .icons a:hover {
                    background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
                    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
                }

                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 98;
                    display: none;
                }

                .overlay.active {
                    display: block;
                }

                .toggle-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 0 50px 50px 0;
                    padding: 15px 25px;
                    font-size: 18px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    position: fixed;
                    top: 20px;
                    left: 0;
                    z-index: 98;
                }

                .dark-mode .toggle-btn {
                    background: var(--dark);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
                }

                .toggle-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }

                .toggle-btn svg {
                    margin-right: 10px;
                    font-size: 20px;
                }

                .menu-icon svg {
                    width: 80px;
                    height: 80px;
                }
            `}</style>
            <header>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} /> Menu
                </button>
                <div className={`slidebar ${showSidebar ? 'active' : ''}`}>
                    <div className="close-btn" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <h1>Samadhan Setu</h1>
                    <ul className="Menu">
                        <li className={activeSection === 'emergency' ? 'active' : ''} onClick={() => handleSectionChange('emergency')}><a href="#"><FontAwesomeIcon icon={faUserSolid} />Emergency/Scheduled Alerts</a></li>
                        <li className={activeSection === 'notifications' ? 'active' : ''} onClick={() => handleSectionChange('notifications')}><a href="#"><FontAwesomeIcon icon={faBell} />Notifications</a></li>
                        <li className={activeSection === 'verified' ? 'active' : ''} onClick={() => handleSectionChange('verified')}><a href="#"><FontAwesomeIcon icon={faCheck} />Verified NGOs Partner</a></li>
                        <li className={activeSection === 'settings' ? 'active' : ''} onClick={() => handleSectionChange('settings')}><a href="#"><FontAwesomeIcon icon={faGear} />Settings</a></li>
                        <li className={activeSection === 'email' ? 'active' : ''} onClick={() => handleSectionChange('email')}><a href="#"><FontAwesomeIcon icon={faEnvelope} />Email & SMS Support</a></li>
                        <li className={activeSection === 'help' ? 'active' : ''} onClick={() => handleSectionChange('help')}><a href="#"><FontAwesomeIcon icon={faCircleQuestion} />Help & Support</a></li>
                    </ul>
                    <div className="icons">
                        <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                    </div>
                </div>
                {showSidebar && <div className="overlay active" onClick={toggleSidebar}></div>}

                <div className="header-content">
                    <div className="logo-container">
                        <img src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png" alt="Samadhan Setu" className="logo-img" />
                        <div className="Logo"><h2>Samadhan Setu</h2></div>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="#" className={activeSection === 'dashboard' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'dashboard')}><FontAwesomeIcon icon={faHome} /> HOME</a></li>
                            <li><a href="#" className={activeSection === 'reports' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'reports')}><FontAwesomeIcon icon={faFileAlt} /> MY REPORTS</a></li>
                            <li><a href="#" className={activeSection === 'map' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'map')}><FontAwesomeIcon icon={faMapMarkedAlt} /> VIEW MAP</a></li>
                            <li><a href="#" className={activeSection === 'leaderboard' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'leaderboard')}><FontAwesomeIcon icon={faTrophy} /> LEADERBOARD</a></li>
                            <li><a href="#" className={activeSection === 'rewards' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'rewards')}><FontAwesomeIcon icon={faGift} /> REWARDS</a></li>
                        </ul>
                    </nav>
                    <div className="header-actions">
                        <button className="btn-report" onClick={openModal}>
                            <FontAwesomeIcon icon={faPlusCircle} /> <span>Report Issue</span>
                        </button>
                        <div className="location-selector">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> <span>Bhopal, MP</span>
                        </div>
                        <div className={`language-selector ${showLanguageDropdown ? 'open' : ''}`}>
                            <button className="language-btn" onClick={toggleLanguageDropdown}>
                                <FontAwesomeIcon icon={faGlobe} /> <span>English</span> <FontAwesomeIcon icon={faCaretDown} className="fa-caret-down" />
                            </button>
                            <div className={`language-dropdown ${showLanguageDropdown ? 'show' : ''}`}>
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
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="User" className="profile-img" />
                            </button>
                            <div className={`profile-dropdown ${showProfileDropdown ? 'show' : ''}`}>
                                <a href="#"><FontAwesomeIcon icon={faUserSolid} /> Profile</a>
                                <a href="#"><FontAwesomeIcon icon={faCog} /> Settings</a>
                                <a href="#"><FontAwesomeIcon icon={faAward} /> Achievements</a>
                                <a href="#"><FontAwesomeIcon icon={faHistory} /> Activity</a>
                                <a href="#"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="dashboard">
                <div className="container">
                    {/* Dashboard Section */}
                    {activeSection === 'dashboard' && (
                        <section id="dashboard" className="section active">
                            <div className="welcome-banner">
                                <div className="user-info">
                                    <h1>Welcome back, {(name) ? name : 'User'}!</h1>
                                    <p>You&apos;ve made a positive impact in your community with 12 resolved issues</p>
                                </div>
                                <div className="user-stats">
                                    <div className="stat-item">
                                        <div className="stat-value">8</div>
                                        <div className="stat-label">Active Reports</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">12</div>
                                        <div className="stat-label">Resolved</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">350</div>
                                        <div className="stat-label">Points</div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="section-title"><FontAwesomeIcon icon={faBolt} /> Quick Actions</h2>
                            <div className="menu-grid">
                                <div className="menu-card" onClick={() => handleCardClick('report-issue-card')}>
                                    <div className="menu-icon">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                    <h3>Report New Issue</h3>
                                    <p>Submit a new civic issue in your area</p>
                                </div>
                                <div className="menu-card" onClick={() => handleCardClick('reports')}>
                                    <div className="menu-icon">
                                        <FontAwesomeIcon icon={faList} />
                                    </div>
                                    <h3>My Reports</h3>
                                    <p>View and track your submitted reports</p>
                                </div>
                                <div className="menu-card" onClick={() => handleCardClick('map')}>
                                    <div className="menu-icon">
                                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                                    </div>
                                    <h3>View Map</h3>
                                    <p>See issues reported in your community</p>
                                </div>
                                <div className="menu-card" onClick={() => handleCardClick('rewards')}>
                                    <div className="menu-icon">
                                        <FontAwesomeIcon icon={faGift} />
                                    </div>
                                    <h3>Rewards</h3>
                                    <p>Check out your achievements and points</p>
                                </div>
                            </div>
                            <div className="gamification-section">
                                <h2 className="section-title"><FontAwesomeIcon icon={faTrophy} /> My Badges</h2>
                                <div className="badges-container">
                                    <div className="badge">
                                        <div className="badge-icon">
                                            <FontAwesomeIcon icon={faBolt} />
                                        </div>
                                        <div className="badge-name">First Responder</div>
                                        <div className="badge-desc">Report your first issue</div>
                                    </div>
                                    <div className="badge">
                                        <div className="badge-icon">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="badge-name">Community Builder</div>
                                        <div className="badge-desc">Get 5 issues resolved</div>
                                    </div>
                                    <div className="badge locked">
                                        <div className="badge-icon">
                                            <FontAwesomeIcon icon={faTrophy} />
                                        </div>
                                        <div className="badge-name">Local Hero</div>
                                        <div className="badge-desc">Be on the top of the leaderboard</div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="section-title">
                                <i className="fa-regular fa-square-plus"></i>Civic Connect
                            </h2>
                            <div className="menu-grid">
                                <div className="menu-card">
                                    <div className="menu-icon">
                                        <a href="#">
                                            <img
                                                src="https://i.ibb.co/3yQZ5j98/Whats-App-Image-2025-09-16-at-13-14-21-8745e89b-removebg-preview.png"
                                                alt="Eco voice"
                                            />
                                        </a>
                                    </div>
                                    <h2>Eco voice</h2>
                                    <Link href="/ecovoice"><button
                                        className="glassy-button"

                                    >
                                        ➟
                                    </button></Link>
                                </div>

                                <div className="menu-card">
                                    <div className="menu-icon">
                                        <a href="https://imgbb.com/">
                                            <img
                                                src="https://i.ibb.co/nNpdRP6v/Whats-App-Image-2025-09-16-at-13-22-17-5aef518f-removebg-preview.png"
                                                alt="Nature Heroes"
                                            />
                                        </a>
                                    </div>
                                    <h2>Nature Heroes</h2>
                                    <Link href="/natureheroes" ><button className="glassy-button">➟</button></Link>
                                </div>

                                <div className="menu-card">
                                    <div className="menu-icon">
                                        <a href="https://imgbb.com/">
                                            <img
                                                src="https://i.ibb.co/LXm82Bh2/Whats-App-Image-2025-09-16-at-13-24-30-4af26fe5-removebg-preview.png"
                                                alt="Relief fund & Donation"
                                            />
                                        </a>
                                    </div>
                                    <h2>Relief fund & Donation</h2>
                                    <Link href="/donation"><button className="glassy-button">➟</button></Link>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h2 className="section-title"><FontAwesomeIcon icon={faHistory} /> Recent Activity</h2>
                                <ul className="activity-list">
                                    <li className="activity-item">
                                        <div className="activity-icon">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="activity-content">
                                            <div className="activity-title">Report Resolved</div>
                                            <div className="activity-desc">Your report "Pothole on Main St" has been resolved by municipal authorities.</div>
                                            <div className="activity-time">2 hours ago</div>
                                        </div>
                                    </li>
                                    <li className="activity-item">
                                        <div className="activity-icon">
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                        <div className="activity-content">
                                            <div className="activity-title">New Report Submitted</div>
                                            <div className="activity-desc">You submitted a new report for "Garbage overflow near park."</div>
                                            <div className="activity-time">5 hours ago</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* My Reports Section */}
                    {activeSection === 'reports' && (
                        <section id="reports" className="section active">
                            <h2 className="section-title"><FontAwesomeIcon icon={faFileAlt} /> My Reports</h2>
                            <div className="reports-grid">

                                {card.map((report) => (
                                    <Card
                                        key={report.id}
                                        title={report.title}
                                        description={report.description}
                                        coordinates={{ latitude: report.latitude, longitude: report.longitude }}
                                        status={report.status || "New"} // default if no status
                                        timeAgo={new Date(report.created_at).toLocaleDateString()}
                                        imageUrl={getImageUrl(report.id)}
                                    />
                                ))}

                            </div>
                        </section>
                    )}

                    {/* View Map Section */}
                    {activeSection === 'map' && (
                        <section id="map" className="section active">
                            <h2 className="section-title"><FontAwesomeIcon icon={faMapMarkedAlt} /> Issues Map</h2>
                            <div className="map-container">

                                <div className='h-[70vh] w-[80vw]'>1
                                    <LeafletMap />
                                </div>

                            </div>
                        </section>
                    )}

                    {/* Leaderboard Section */}
                    {activeSection === 'leaderboard' && (
                        <section id="leaderboard" className="section active">
                            <h2 className="section-title"><FontAwesomeIcon icon={faTrophy} /> Leaderboard</h2>
                            <div className="leaderboard-container">
                                <ul className="leaderboard-list">
                                    <li className="leaderboard-item">
                                        <div className="leaderboard-rank">1</div>
                                        <div className="leaderboard-user">
                                            <img src="https://i.ibb.co/L9H8b4h/395679905-2469492473467417-3801262948627376751-n.jpg" alt="User 1" className="leaderboard-avatar" />
                                            <span>Aarav Kumar</span>
                                        </div>
                                        <div className="leaderboard-points">850 points</div>
                                    </li>
                                    <li className="leaderboard-item">
                                        <div className="leaderboard-rank">2</div>
                                        <div className="leaderboard-user">
                                            <img src="https://i.ibb.co/3s6xW1F/unhygiene-in-India-500x375.jpg" alt="User 2" className="leaderboard-avatar" />
                                            <span>Priya Sharma</span>
                                        </div>
                                        <div className="leaderboard-points">620 points</div>
                                    </li>
                                    <li className="leaderboard-item">
                                        <div className="leaderboard-rank">3</div>
                                        <div className="leaderboard-user">
                                            <img src="https://i.ibb.co/2c3vR2n/423521250-760368819389230-6715014902100803513-n.jpg" alt="User 3" className="leaderboard-avatar" />
                                            <span>Ayush Dubey</span>
                                        </div>
                                        <div className="leaderboard-points">350 points</div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* Rewards Section */}
                    {activeSection === 'rewards' && (
                        <section id="rewards" className="section active">
                            <h2 className="section-title"><FontAwesomeIcon icon={faGift} /> My Rewards</h2>
                            <p>Content for the rewards section will go here.</p>
                        </section>
                    )}
                </div>
            </main>

            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-column">
                            <h3>About Us</h3>
                            <p>Samadhan Setu is a platform empowering citizens to report civic issues and contribute to community development.</p>
                        </div>
                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">My Reports</a></li>
                                <li><a href="#">View Map</a></li>
                                <li><a href="#">Leaderboard</a></li>
                                <li><a href="#">Rewards</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>Email: <a href="mailto:contact@samadhansetu.com">contact@samadhansetu.com</a></li>
                                <li>Phone: +91 12345 67890</li>
                                <li>Address: 123 Civic Center, Bhopal, MP, India</li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Follow Us</h3>
                            <div className="social-links">
                                <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                                <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2024 Samadhan Setu. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Modal */}
            <div id="reportModal" className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Report a New Issue</h2>
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Issue Title</label>
                            <input type="text" id="title" name="title" required value={report.title} onChange={(e) => setReport({ ...report, title: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" rows={4} required value={report.description} onChange={(e) => setReport({ ...report, description: e.target.value })}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>

                            <div className='h-100 w-110'>
                                <MapContainer
                                    center={[20.5937, 78.9629]} // India center
                                    zoom={5}
                                    style={{ height: "400px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="© OpenStreetMap contributors"
                                    />
                                    <LocationMarker />
                                    <FixMapSize />
                                </MapContainer>
                            </div>

                            <div>Latitude: {report.latitude} Longitude: {report.longitude}</div>

                        </div>
                        <div className="form-group">
                            <label htmlFor="photo">Attach Photo</label>
                            <input type="file" id="photo" name="photo" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                        </div>
                        <button type="button" className="btn-submit" onClick={handleReport}>Submit Report</button>
                    </form>
                </div>
            </div>
        </>
    );
}
