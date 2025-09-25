// This directive is necessary to use React hooks for interactivity.
"use client";

import React, { useState, useEffect, useRef } from 'react';
import "./ecovoice.css"
import { redirect } from "next/navigation";

// This is a self-contained Next.js page component.
const EcoVoicePage = () => {
    // State for managing UI interactivity
    const [theme, setTheme] = useState('light');
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [reelData, setReelData] = useState({
        title: '',
        description: '',
    });
    const [video, setVideo] = useState<File | null>(null);

    const [name, setName] = useState<string | null>(null);
    const [id, setId] = useState("");

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
    }, [name, id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]); // this is your videoFile
    }
  };

    const handleSubmit = async () => {
        if (!video || !reelData.title || !reelData.description) return;

        const formData = new FormData();
        formData.append('title', reelData.title);
        formData.append('description', reelData.description);
        formData.append('by', id); // replace with your auth
        formData.append('video', video);

        const res = await fetch('/api/uploadReel', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log(data); // contains id and public video URL
        alert('Reel uploaded successfully!');
    };


    // Initial chat messages based on your HTML
    const [messages, setMessages] = useState([
        { id: 1, user: 'Amit Sharma', text: 'Has anyone noticed the new waste segregation bins installed near sector 7 market?', time: '10:24 AM', type: 'received' as const },
        { id: 2, user: 'Priya Patel', text: "Yes! They're part of the new municipal initiative. There's a meeting this Sunday to explain how to use them properly.", time: '10:27 AM', type: 'received' as const },
        { id: 3, user: 'You', text: "That's great! What time is the meeting? I'd like to attend.", time: '10:29 AM', type: 'sent' as const },
        { id: 4, user: 'Priya Patel', text: '10 AM at the community hall. Bring your neighbors!', time: '10:30 AM', type: 'received' as const },
        { id: 5, user: 'Rajesh Kumar', text: 'I\'ll be there. We should also discuss starting a community composting initiative.', time: '10:32 AM', type: 'received' as const },
    ]);

    // Refs for handling clicks outside dropdowns
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);

    // Effect for handling theme changes
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(`${theme}-mode`);
        if (theme === 'dark') {
            document.body.classList.add('dark-mode'); // For compatibility with original CSS
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect for closing dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                setLangDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSendMessage = () => {
        if (chatInput.trim() === '') return;
        const newMessage = {
            id: Date.now(),
            user: 'You',
            text: chatInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'sent' as const,
        };
        setMessages([...messages, newMessage]);
        setChatInput('');
    };

    return (
        <>
            <header>
                <div className="header-content">
                    <div className="logo-container">
                        <img src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png" alt="Samadhan Setu Logo" />
                        <div className="logo">Samadhan Setu</div>
                    </div>

                    <nav>
                        <ul></ul>
                    </nav>

                    <div className="header-actions">
                        <div className="language-selector" ref={languageDropdownRef}>
                            <button className="language-btn" onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}>
                                <i className="fas fa-globe"></i> <span>English</span> <i className="fas fa-caret-down"></i>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="language-dropdown show">
                                    <a href="#" className="lang-option" data-lang="en">English</a>
                                    <a href="#" className="lang-option" data-lang="hi">हिन्दी</a>
                                    <a href="#" className="lang-option" data-lang="mr">मराठी</a>
                                </div>
                            )}
                        </div>

                        <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
                        </button>

                        <div className="user-profile" ref={profileDropdownRef}>
                            <button className="profile-btn" onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}>
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="User" className="profile-img" />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="profile-dropdown show">
                                    <a href="#"><i className="fas fa-user"></i> Profile</a>
                                    <a href="#"><i className="fas fa-cog"></i> Settings</a>
                                    <a href="#"><i className="fas fa-award"></i> Achievements</a>
                                    <a href="#"><i className="fas fa-history"></i> Activity</a>
                                    <a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="dashboard">
                <div className="container">

                    <div className="eco-voice-header">
                        <img src="https://i.ibb.co/3yQZ5j98/Whats-App-Image-2025-09-16-at-13-14-21-8745e89b-removebg-preview.png" alt="" />
                        <h1>Eco Voice</h1>
                        <p>Connect with your community, share environmental updates, and engage with fellow citizens through reels and conversations. Together we can make our neighborhoods better!</p>
                    </div>

                    <div className="community-features">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-video"></i>
                            </div>
                            <h3 className="feature-title">Share Reels</h3>
                            <p className="feature-description">Upload short videos about environmental issues, community events, or positive changes in your neighborhood.</p>
                            <a href="#upload" className="feature-cta">Upload Now</a>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-comment-dots"></i>
                            </div>
                            <h3 className="feature-title">Community Chat</h3>
                            <p className="feature-description">Connect with neighbors, discuss local issues, and organize community initiatives through our chat platform.</p>
                            <a href="#chat" className="feature-cta">Join Conversation</a>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="feature-title">Community Groups</h3>
                            <p className="feature-description">Join or create groups based on your interests, locality, or specific environmental concerns.</p>
                            <a href="#" className="feature-cta">Explore Groups</a>
                        </div>
                    </div>

                    <div className="reels-container">
                        <h2 className="section-title"><i className="fas fa-film"></i> Community Reels</h2>
                        <p>See what&apos;s happening in your community through these shared videos</p>

                        <div className="reels-grid">
                            <div className="reel-card">
                                <div className="reel-video">
                                    <img src="data:image/webp;base64,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" alt="Community Clean Drive" />
                                    <div className="reel-play-btn">
                                        <i className="fas fa-play"></i>
                                    </div>
                                </div>
                                <div className="reel-content">
                                    <div className="reel-user">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="User" className="reel-user-avatar" />
                                        <span className="reel-user-name">Amit Sharma</span>
                                    </div>
                                    <p className="reel-description">Our neighborhood clean drive was a success! 50+ volunteers participated.</p>
                                    <div className="reel-stats">
                                        <div className="reel-stat"><i className="fas fa-heart"></i> 128</div>
                                        <div className="reel-stat"><i className="fas fa-comment"></i> 24</div>
                                        <div className="reel-stat"><i className="fas fa-share"></i> 8</div>
                                    </div>
                                </div>
                            </div>

                            <div className="reel-card">
                                <div className="reel-video">
                                    <img src="https://assets.telegraphindia.com/telegraph/11oriPark1_4C.jpg" alt="Park Renovation" />
                                    <div className="reel-play-btn">
                                        <i className="fas fa-play"></i>
                                    </div>
                                </div>
                                <div className="reel-content">
                                    <div className="reel-user">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="User" className="reel-user-avatar" />
                                        <span className="reel-user-name">Priya Patel</span>
                                    </div>
                                    <p className="reel-description">The new children&apos;s park in sector 5 is almost complete! What do you think?</p>
                                    <div className="reel-stats">
                                        <div className="reel-stat"><i className="fas fa-heart"></i> 89</div>
                                        <div className="reel-stat"><i className="fas fa-comment"></i> 17</div>
                                        <div className="reel-stat"><i className="fas fa-share"></i> 5</div>
                                    </div>
                                </div>
                            </div>

                            <div className="reel-card">
                                <div className="reel-video">
                                    <img src="https://drop.ndtv.com/albums/NEWS/tree-plantation-in-india/tree-plantation-in-india-green-yatra.jpg" alt="Tree Plantation Drive" />
                                    <div className="reel-play-btn">
                                        <i className="fas fa-play"></i>
                                    </div>
                                </div>
                                <div className="reel-content">
                                    <div className="reel-user">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2ZDlkZGYiLz4KPHBhdGggZD0iTTE2IDE3LjVDMTkuNTk4NiAxNy41IDIyLjUgMTQuNTk4NiAyMi41IDExQzIyLjUgNy40MDEzNyAxOS41OTg2IDQuNSAxNiA0LjVDMTIuNDAxNCA0LjUgOS41IDcuNDAxMzcgOS41IDExQzkuNSAxNC41OTg2IDEyLjQwMTQgMTcuNSAxNiAxNy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDIwLjVDOS42NjQgMjAuNSA0LjUgMjUuNjY0IDQuNSAzMkgyNy41QzI3LjUgMjUuNjY0IDIyLjMzNiAyMC41IDE2IDIwLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="User" className="reel-user-avatar" />
                                        <span className="reel-user-name">Rajesh Kumar</span>
                                    </div>
                                    <p className="reel-description">Planted 100+ saplings in the community park. Join us next weekend!</p>
                                    <div className="reel-stats">
                                        <div className="reel-stat"><i className="fas fa-heart"></i> 142</div>
                                        <div className="reel-stat"><i className="fas fa-comment"></i> 31</div>
                                        <div className="reel-stat"><i className="fas fa-share"></i> 12</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="upload" className="upload-section">
                        <h2 className="section-title"><i className="fas fa-upload"></i> Share Your Reel</h2>
                        <p>Upload a short video to share with your community</p>

                        <form className="upload-form">
                            <div className="form-group">
                                <label htmlFor="reel-title">Reel Title</label>
                                <input type="text" id="reel-title" placeholder="Give your reel a title" value={reelData.title} onChange={(e) => setReelData({ ...reelData, title: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reel-description">Description</label>
                                <textarea id="reel-description" rows={3} placeholder="Describe your reel..." value={reelData.description} onChange={(e) => setReelData({ ...reelData, description: e.target.value })}></textarea>
                            </div>

                            <div className="form-group">
                                <label>Upload Video</label>
                                <div className="file-upload" id="fileUpload">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <p>Click to upload or drag and drop</p>
                                    <p>MP4, MOV (max 60 seconds)</p>
                                    {/* <input type="file" accept="video/*" id="video-upload" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files?.[0] || null)}/> */}

                                </div>
                            </div>
                            <input type="file" id="photo" name="photo" accept="video/*" onChange={handleFileChange} />

                            <button type="button" className="btn-submit" onClick={handleSubmit}>Share with Community</button>
                        </form>
                    </div>

                    <div id="chat" className="community-chat">
                        <div className="chat-header">
                            <h2 className="section-title"><i className="fas fa-comments"></i> Community Chat</h2>
                            <span>Online: 124</span>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.type}`}>
                                    <div className="message-user">{msg.user}</div>
                                    <div className="message-text">{msg.text}</div>
                                    <div className="message-time">{msg.time}</div>
                                </div>
                            ))}
                        </div>

                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-column">
                            <h3>Samadhan Setu</h3>
                            <p>Empowering communities to work with local governments for better neighborhoods.</p>
                            <div className="social-links">
                                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>

                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Home</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Eco Voice</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Report Issue</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Issues Map</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> About Us</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Resources</h3>
                            <ul>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Help Center</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> FAQ</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Community Guidelines</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Privacy Policy</a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> Terms of Service</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><i className="fas fa-envelope"></i> support@samadhansetu.org</li>
                                <li><i className="fas fa-phone"></i> +91 98765 43210</li>
                                <li><i className="fas fa-map-marker-alt"></i> 123 Civic Center, Bhopal, MP</li>
                            </ul>
                        </div>
                    </div>

                    <div className="copyright">
                        <p>&copy; 2025 Samadhan Setu. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* This special Next.js tag applies all CSS globally, just like a traditional stylesheet. */}
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
                    --section-alt-bg:#eff6ff;
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
                    line-height: 1.6;
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
                
                .logo {
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
                
                nav a:hover, nav a.active {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .header-actions {
                    display: flex;
                    gap: 0.8rem;
                    align-items: center;
                    flex-shrink: 0;
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
                
                .profile-dropdown a i {
                    width: 20px;
                    text-align: center;
                }
                
                .dashboard {
                    padding: 2rem 0;
                    min-height: calc(100vh - 200px);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .eco-voice-header {
                    background:var(--header-bg);
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    text-align: center;
                    color: white;
                }
                 .eco-voice-header img{
                    height: 90px;
                    width: 90px;
                    
                } 
                
                .eco-voice-header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }
                
                .eco-voice-header p {
                    font-size: 1.1rem;
                    opacity: 0.9;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .community-features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }
                
                .feature-card {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                
                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }
                
                .feature-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 1.5rem;
                    color: white;
                }
                
                .feature-title {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    text-align: center;
                    color: var(--primary);
                }
                
                .feature-description {
                    color: var(--text-color);
                    margin-bottom: 1.5rem;
                }
                
                .feature-cta {
                    display: block;
                    text-align: center;
                    background: var(--primary);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 30px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                
                .feature-cta:hover {
                    background: #2980b9;
                    transform: translateY(-2px);
                }
                
                .section-title {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }
                
                .section-title i {
                    color: var(--primary);
                }

                .reels-container {
                    margin-bottom: 3rem;
                }
                
                .reels-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                
                .reel-card {
                    background: var(--card-bg);
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s;
                }
                
                .reel-video {
                    position: relative;
                    height: 250px;
                    overflow: hidden;
                }
                
                .reel-video img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .reel-play-btn {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .reel-play-btn:hover {
                    background: var(--primary);
                    color: white;
                }
                
                .reel-content {
                    padding: 1rem;
                }
                
                .reel-user {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                
                .reel-user-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .reel-user-name {
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                
                .reel-description {
                    font-size: 0.9rem;
                    color: var(--text-color);
                    margin-bottom: 0.5rem;
                }
                
                .reel-stats {
                    display: flex;
                    gap: 1rem;
                    color: var(--grey);
                    font-size: 0.8rem;
                }
                
                .reel-stat {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                
                .upload-section {
                    background: var(--section-alt-bg);
                    padding: 2rem;
                    border-radius: 12px;
                    margin-bottom: 3rem;
                }
                
                .upload-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
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
                .form-group textarea {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid var(--grey);
                    border-radius: 6px;
                    background: var(--card-bg);
                    color: var(--text-color);
                    font-size: 1rem;
                }
                
                .file-upload {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 2px dashed var(--grey);
                    border-radius: 8px;
                    padding: 2rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .file-upload:hover {
                    border-color: var(--primary);
                }
                
                .file-upload i {
                    font-size: 2rem;
                    color: var(--primary);
                    margin-bottom: 1rem;
                }
                
                .btn-submit {
                    background: var(--secondary);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    align-self: center;
                    margin-top: 1rem;
                }
                
                .btn-submit:hover {
                    background: #27ae60;
                    transform: translateY(-2px);
                }
                
                .community-chat {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    margin-bottom: 3rem;
                }
                
                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                
                .chat-messages {
                    height: 300px;
                    overflow-y: auto;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: var(--section-alt-bg);
                    border-radius: 8px;
                }
                
                .message {
                    margin-bottom: 1rem;
                    padding: 0.8rem;
                    border-radius: 8px;
                    max-width: 80%;
                }
                
                .message.received {
                    background: var(--bg-color);
                    align-self: flex-start;
                }
                
                .message.sent {
                    background: var(--primary);
                    color: white;
                    margin-left: auto;
                }
                
                .message-user {
                    font-weight: 600;
                    margin-bottom: 0.3rem;
                }
                
                .message-time {
                    font-size: 0.7rem;
                    opacity: 0.7;
                    text-align: right;
                }
                
                .chat-input {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .chat-input input {
                    flex-grow: 1;
                    padding: 0.8rem;
                    border: 1px solid var(--grey);
                    border-radius: 30px;
                    background: var(--section-alt-bg);
                    color: var(--text-color);
                }
                
                .chat-input button {
                    background: var(--primary);
                    color: white;
                    border: none;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .chat-input button:hover {
                    background: #2980b9;
                    transform: scale(1.05);
                }

                footer {
                  background: var(--footer-bg);
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
                }

                .footer-column p {
                  font-size: 0.95rem;
                  line-height: 1.6;
                  color: var(--light);
                  opacity: 0.8;
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
                  color: var(--light);
                  opacity: 0.8;
                  text-decoration: none;
                  transition: color 0.3s, padding-left 0.3s;
                }

                .footer-column a:hover {
                  color: white;
                  opacity: 1;
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
                  color: var(--light);
                  opacity: 0.7;
                  font-size: 0.9rem;
                }

                @media (max-width: 992px) {
                    .header-content { flex-wrap: wrap; gap: 1rem; }
                    nav { order: 3; width: 100%; justify-content: center; }
                }
                @media (max-width: 768px) {
                    .language-btn span { display: none; }
                }

            `}
            </style>
        </>
    );
};

export default EcoVoicePage;
