"use client";

import React, { useState, useEffect, useRef } from 'react';
import "./donation.css"
// This is a self-contained Next.js page component for the Donation Page.
const DonationPage = () => {
    // State for UI elements
    const [theme, setTheme] = useState('light');
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    
    // State for the donation form
    const [donationAmount, setDonationAmount] = useState<number | string>('');
    const [selectedCause, setSelectedCause] = useState('');
    const [isCustomAmount, setIsCustomAmount] = useState(false);

    // Refs for handling clicks outside dropdowns
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const languageDropdownRef = useRef<HTMLDivElement>(null);

    // Effect for theme management
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        document.body.classList.remove('dark-mode');
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    // Effect for closing dropdowns on outside click
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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handlers for donation form interactivity
    const handleAmountClick = (amount: number | 'custom') => {
        if (amount === 'custom') {
            setIsCustomAmount(true);
            setDonationAmount(''); // Clear amount when switching to custom
        } else {
            setIsCustomAmount(false);
            setDonationAmount(amount);
        }
    };

    const handleDonateButtonClick = (cause: string) => {
        setSelectedCause(cause);
        // Scroll to the donation form
        document.getElementById('donationForm')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you for your donation of ₹${donationAmount} to ${selectedCause || 'the selected cause'}!`);
    };

    return (
        <>
            <header>
                <div className="header-content">
                    <div className="logo-container">
                        <img src="https://i.ibb.co/qZzvg53/Whats-App-Image-2025-09-09-at-08-13-15-f871567f-removebg-preview.png" alt="Samadhan Setu Logo" className="logo-img" />
                        <div className="logo">Samadhan Setu</div>
                    </div>
                    <div className="header-actions">
                        <div className="language-selector" ref={languageDropdownRef}>
                            <button className="language-btn" onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}>
                                <i className="fas fa-globe"></i> <span>English</span> <i className="fas fa-caret-down"></i>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="language-dropdown show">
                                    <a href="#" className="lang-option">English</a>
                                    <a href="#" className="lang-option">हिन्दी</a>
                                    <a href="#" className="lang-option">मराठी</a>
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
                    <div className="welcome-banner">
                        <div className="user-info">
                            <h1>Relief Fund & Donation</h1>
                            <p>Support natural causes and help communities in need through your contributions</p>
                        </div>
                        <div className="user-stats">
                            <div className="stat-item"><div className="stat-value">₹12,500</div><div className="stat-label">Total Donated</div></div>
                            <div className="stat-item"><div className="stat-value">8</div><div className="stat-label">Causes Supported</div></div>
                            <div className="stat-item"><div className="stat-value">350</div><div className="stat-label">Impact Points</div></div>
                        </div>
                    </div>
                    
                    <h2 className="section-title"><i className="fas fa-hand-holding-heart"></i> <span>Active Causes</span></h2>
                    <div className="causes-grid">
                        <div className="cause-card">
                            <div className="cause-image">
                                <img src="https://tse1.mm.bing.net/th/id/OIP.sYGNDLlXHQ5PwZITg3PTRAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Flood Relief" />
                                <div className="cause-progress"><div className="progress-bar" style={{ width: '65%' }}></div></div>
                            </div>
                            <div className="cause-content">
                                <h3 className="cause-title">Flood Relief in Assam</h3>
                                <p className="cause-description">Support communities affected by recent floods with essential supplies.</p>
                                <div className="cause-meta">
                                    <span className="cause-raised">₹3.2L <span>raised</span></span>
                                    <span className="cause-goal"><span>of</span> ₹5L <span>goal</span></span>
                                </div>
                                <button className="btn-donate" onClick={() => handleDonateButtonClick('Flood Relief in Assam')}>
                                    <i className="fas fa-donate"></i> <span>Donate Now</span>
                                </button>
                            </div>
                        </div>
                        <div className="cause-card">
                            <div className="cause-image">
                                <img src="https://th.bing.com/th/id/OIP.p4gUY7yxlDKYT_ezNPShaQHaEV?w=344&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="Wildfire Recovery" />
                                <div className="cause-progress"><div className="progress-bar" style={{ width: '40%' }}></div></div>
                            </div>
                            <div className="cause-content">
                                <h3 className="cause-title">Wildfire Recovery in Uttarakhand</h3>
                                <p className="cause-description">Help rebuild communities and restore forests affected by devastating wildfires.</p>
                                <div className="cause-meta">
                                    <span className="cause-raised">₹1.8L <span>raised</span></span>
                                    <span className="cause-goal"><span>of</span> ₹4.5L <span>goal</span></span>
                                </div>
                                <button className="btn-donate" onClick={() => handleDonateButtonClick('Wildfire Recovery in Uttarakhand')}>
                                    <i className="fas fa-donate"></i> <span>Donate Now</span>
                                </button>
                            </div>
                        </div>
                        <div className="cause-card">
                            <div className="cause-image">
                                <img src="data:image/webp;base64,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" alt="Drought Assistance" />
                                <div className="cause-progress"><div className="progress-bar" style={{ width: '25%' }}></div></div>
                            </div>
                            <div className="cause-content">
                                <h3 className="cause-title">Drought Assistance in Rajasthan</h3>
                                <p className="cause-description">Provide water resources and support to communities facing severe water scarcity.</p>
                                <div className="cause-meta">
                                    <span className="cause-raised">₹75k <span>raised</span></span>
                                    <span className="cause-goal"><span>of</span> ₹3L <span>goal</span></span>
                                </div>
                                <button className="btn-donate" onClick={() => handleDonateButtonClick('Drought Assistance in Rajasthan')}>
                                    <i className="fas fa-donate"></i> <span>Donate Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="donation-form" id="donationForm">
                        <h2 className="section-title"><i className="fas fa-credit-card"></i> <span>Make a Donation</span></h2>
                        
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="causeSelect">Select Cause</label>
                                <select id="causeSelect" required value={selectedCause} onChange={(e) => setSelectedCause(e.target.value)}>
                                    <option value="">-- Select a cause --</option>
                                    <option value="Flood Relief in Assam">Flood Relief in Assam</option>
                                    <option value="Wildfire Recovery in Uttarakhand">Wildfire Recovery in Uttarakhand</option>
                                    <option value="Drought Assistance in Rajasthan">Drought Assistance in Rajasthan</option>
                                    <option value="General Relief Fund">General Relief Fund</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Donation Amount (₹)</label>
                                <div className="amount-options">
                                    {[100, 500, 1000, 2000].map(amount => (
                                        <div key={amount} className={`amount-option ${donationAmount === amount && !isCustomAmount ? 'active bg-blue-400' : ''}`} onClick={() => handleAmountClick(amount)}>₹{amount}</div>
                                    ))}
                                    <div className={`amount-option ${isCustomAmount ? 'active bg-blue-400' : ''}`} onClick={() => handleAmountClick('custom')}>Custom</div>
                                </div>
                                {isCustomAmount && (
                                    <div className="custom-amount">
                                        <input type="number" placeholder="Enter amount" min="10" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} />
                                    </div>
                                )}
                            </div>
                            
                            <div className="form-group"><label htmlFor="donorName">Your Name</label><input type="text" id="donorName" required /></div>
                            <div className="form-group"><label htmlFor="donorEmail">Email Address</label><input type="email" id="donorEmail" required /></div>
                            
                            <div className="form-group">
                                <label htmlFor="paymentMethod">Payment Method</label>
                                <select id="paymentMethod" required>
                                    <option value="">-- Select payment method --</option>
                                    <option value="credit_card">Credit Card</option>
                                    <option value="debit_card">Debit Card</option>
                                    <option value="upi">UPI</option>
                                    <option value="net_banking">Net Banking</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="message">Message (Optional)</label>
                                <textarea id="message" rows={3} placeholder="Add a message of support"></textarea>
                            </div>
                            
                            <button type="submit" className="btn-submit"><i className="fas fa-check-circle"></i> <span>Confirm Donation</span></button>
                        </form>
                    </div>
                    
                    <div className="donation-history">
                        <h2 className="section-title"><i className="fas fa-history"></i> <span>Your Donation History</span></h2>
                        <ul className="history-list">
                            <li className="history-item"><div><div className="history-cause">Flood Relief in Assam</div><div className="history-date">August 15, 2023</div></div><div className="history-amount">₹2,000</div></li>
                            <li className="history-item"><div><div className="history-cause">Wildfire Recovery in Uttarakhand</div><div className="history-date">July 28, 2023</div></div><div className="history-amount">₹1,000</div></li>
                            <li className="history-item"><div><div className="history-cause">General Relief Fund</div><div className="history-date">June 10, 2023</div></div><div className="history-amount">₹500</div></li>
                            <li className="history-item"><div><div className="history-cause">Drought Assistance in Rajasthan</div><div className="history-date">May 5, 2023</div></div><div className="history-amount">₹2,500</div></li>
                        </ul>
                    </div>
                    
                    <div className="impact-section">
                       <h2 className="section-title"><i className="fas fa-chart-line"></i> <span>Your Impact</span></h2>
                       <div className="impact-stats">
                            <div className="impact-stat"><div className="impact-value">125</div><div className="impact-label">Meals Provided</div></div>
                            <div className="impact-stat"><div className="impact-value">35</div><div className="impact-label">Emergency Kits</div></div>
                            <div className="impact-stat"><div className="impact-value">8</div><div className="impact-label">Families Supported</div></div>
                            <div className="impact-stat"><div className="impact-value">5</div><div className="impact-label">Communities Helped</div></div>
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
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Home</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Report Issue</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Issues Map</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Dashboard</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>About Us</span></a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Resources</h3>
                            <ul>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Help Center</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>FAQ</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Community Guidelines</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Privacy Policy</span></a></li>
                                <li><a href="#"><i className="ri-arrow-right-line"></i> <span>Terms of Service</span></a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Contact Us</h3>
                            <ul>
                                <li><i className="fas fa-envelope"></i> support@samadhansetu.org</li>
                                <li><i className="fas fa-phone"></i> +91 98765 43210</li>
                                <li><i className="fas fa-map-marker-alt"></i> Bhopal, Madhya Pradesh</li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2025 Samadhan Setu. <span>All rights reserved.</span></p>
                    </div>
                </div>
            </footer>
            
            <style jsx global>{`
                /* Paste the full CSS for the Donation Page here */
            `}</style>
        </>
    );
};

export default DonationPage;