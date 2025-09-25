'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import '@fortawesome/fontawesome-free/css/all.min.css';


// --- Translation Data and Types (Defined before the component) ---

const translations = {
    en: {
        app_name: "Samadhan Setu",
        sign_up_message: "Create your account in a few simple steps",
        step1_label: "Account",
        step2_label: "Profile",
        step3_label: "Finish",
        email_label: "Email Address",
        email_placeholder: "Enter your email",
        email_error: "Please enter a valid email address",
        password_label: "Password",
        password_placeholder: "Create a password",
        password_error: "Password must be >= 8 chars, with letters and numbers",
        confirm_password_label: "Confirm Password",
        confirm_password_placeholder: "Confirm your password",
        confirm_password_error: "Passwords do not match",
        fullname_label: "Full Name",
        fullname_placeholder: "Enter your full name",
        name_error: "Please enter your name",
        username_label: "Username",
        username_placeholder: "Choose a username",
        username_error: "Username must be at least 3 characters",
        phone_label: "Phone Number (Optional)",
        phone_placeholder: "Enter your phone number",
        birthdate_label: "Date of Birth",
        how_heard_label: "How did you hear about us?",
        select_option: "Select an option",
        search_engine: "Search Engine",
        social_media: "Social Media",
        friend: "Friend or Colleague",
        advertisement: "Advertisement",
        other: "Other",
        terms_text: "I agree to the",
        terms_link: "Terms of Service",
        privacy_link: "and Privacy Policy",
        terms_error: "You must accept the terms and conditions",
        next_button: "Next",
        back_button: "Back",
        create_account_button: "Create Account",
        creating_account: "Creating...",
        success_message: "Your account has been created successfully!",
        or_separator: "Or sign up with",
        has_account: "Already have an account?",
        login_link: "Log in"
    },
    hi: {
        app_name: "समाधान सेतु",
        sign_up_message: "कुछ सरल चरणों में अपना खाता बनाएं",
        step1_label: "खाता",
        step2_label: "प्रोफाइल",
        step3_label: "समाप्त",
        email_label: "ईमेल पता",
        email_placeholder: "अपना ईमेल दर्ज करें",
        email_error: "कृपया एक वैध ईमेल पता दर्ज करें",
        password_label: "पासवर्ड",
        password_placeholder: "एक पासवर्ड बनाएं",
        password_error: "पासवर्ड में अक्षर और संख्याओं के साथ कम से कम 8 वर्ण होने चाहिए",
        confirm_password_label: "पासवर्ड की पुष्टि करें",
        confirm_password_placeholder: "अपने पासवर्ड की पुष्टि करें",
        confirm_password_error: "पासवर्ड मेल नहीं खाते",
        fullname_label: "पूरा नाम",
        fullname_placeholder: "अपना पूरा नाम दर्ज करें",
        name_error: "कृपया अपना नाम दर्ज करें",
        username_label: "उपयोगकर्ता नाम",
        username_placeholder: "एक उपयोगकर्ता नाम चुनें",
        username_error: "उपयोगकर्ता नाम कम से कम 3 वर्णों का होना चाहिए",
        phone_label: "फोन नंबर (वैकल्पिक)",
        phone_placeholder: "अपना फोन नंबर दर्ज करें",
        birthdate_label: "जन्म तिथि",
        how_heard_label: "आपने हमारे बारे में कैसे सुना?",
        select_option: "एक विकल्प चुनें",
        search_engine: "सर्च इंजन",
        social_media: "सोशल मीडिया",
        friend: "मित्र या सहयोगी",
        advertisement: "विज्ञापन",
        other: "अन्य",
        terms_text: "मैं",
        terms_link: "सेवा की शर्तों",
        privacy_link: "और गोपनीयता नीति",
        terms_error: "आपको नियम और शर्तों को स्वीकार करना होगा",
        next_button: "अगला",
        back_button: "पिछला",
        create_account_button: "खाता बनाएं",
        creating_account: "बनाया जा रहा है...",
        success_message: "आपका खाता सफलतापूर्वक बनाया गया है!",
        or_separator: "या इसके साथ साइन अप करें",
        has_account: "क्या आपके पास पहले से एक खाता है?",
        login_link: "लॉग इन करें"
    },
    te: {
        app_name: "Samadhan Setu", // Placeholder
        sign_up_message: "Create your account in a few simple steps",
        step1_label: "Account",
        step2_label: "Profile",
        step3_label: "Finish",
        email_label: "Email Address",
        email_placeholder: "Enter your email",
        email_error: "Please enter a valid email address",
        password_label: "Password",
        password_placeholder: "Create a password",
        password_error: "Password must be >= 8 chars, with letters and numbers",
        confirm_password_label: "Confirm Password",
        confirm_password_placeholder: "Confirm your password",
        confirm_password_error: "Passwords do not match",
        fullname_label: "Full Name",
        fullname_placeholder: "Enter your full name",
        name_error: "Please enter your name",
        username_label: "Username",
        username_placeholder: "Choose a username",
        username_error: "Username must be at least 3 characters",
        phone_label: "Phone Number (Optional)",
        phone_placeholder: "Enter your phone number",
        birthdate_label: "Date of Birth",
        how_heard_label: "How did you hear about us?",
        select_option: "Select an option",
        search_engine: "Search Engine",
        social_media: "Social Media",
        friend: "Friend or Colleague",
        advertisement: "Advertisement",
        other: "Other",
        terms_text: "I agree to the",
        terms_link: "Terms of Service",
        privacy_link: "and Privacy Policy",
        terms_error: "You must accept the terms and conditions",
        next_button: "Next",
        back_button: "Back",
        create_account_button: "Create Account",
        creating_account: "Creating...",
        success_message: "Your account has been created successfully!",
        or_separator: "Or sign up with",
        has_account: "Already have an account?",
        login_link: "Log in"
    },
    ta: {
        app_name: "Samadhan Setu", // Placeholder
        sign_up_message: "Create your account in a few simple steps",
        step1_label: "Account",
        step2_label: "Profile",
        step3_label: "Finish",
        email_label: "Email Address",
        email_placeholder: "Enter your email",
        email_error: "Please enter a valid email address",
        password_label: "Password",
        password_placeholder: "Create a password",
        password_error: "Password must be >= 8 chars, with letters and numbers",
        confirm_password_label: "Confirm Password",
        confirm_password_placeholder: "Confirm your password",
        confirm_password_error: "Passwords do not match",
        fullname_label: "Full Name",
        fullname_placeholder: "Enter your full name",
        name_error: "Please enter your name",
        username_label: "Username",
        username_placeholder: "Choose a username",
        username_error: "Username must be at least 3 characters",
        phone_label: "Phone Number (Optional)",
        phone_placeholder: "Enter your phone number",
        birthdate_label: "Date of Birth",
        how_heard_label: "How did you hear about us?",
        select_option: "Select an option",
        search_engine: "Search Engine",
        social_media: "Social Media",
        friend: "Friend or Colleague",
        advertisement: "Advertisement",
        other: "Other",
        terms_text: "I agree to the",
        terms_link: "Terms of Service",
        privacy_link: "and Privacy Policy",
        terms_error: "You must accept the terms and conditions",
        next_button: "Next",
        back_button: "Back",
        create_account_button: "Create Account",
        creating_account: "Creating...",
        success_message: "Your account has been created successfully!",
        or_separator: "Or sign up with",
        has_account: "Already have an account?",
        login_link: "Log in"
    },
    ml: {
        app_name: "Samadhan Setu", // Placeholder
        sign_up_message: "Create your account in a few simple steps",
        step1_label: "Account",
        step2_label: "Profile",
        step3_label: "Finish",
        email_label: "Email Address",
        email_placeholder: "Enter your email",
        email_error: "Please enter a valid email address",
        password_label: "Password",
        password_placeholder: "Create a password",
        password_error: "Password must be >= 8 chars, with letters and numbers",
        confirm_password_label: "Confirm Password",
        confirm_password_placeholder: "Confirm your password",
        confirm_password_error: "Passwords do not match",
        fullname_label: "Full Name",
        fullname_placeholder: "Enter your full name",
        name_error: "Please enter your name",
        username_label: "Username",
        username_placeholder: "Choose a username",
        username_error: "Username must be at least 3 characters",
        phone_label: "Phone Number (Optional)",
        phone_placeholder: "Enter your phone number",
        birthdate_label: "Date of Birth",
        how_heard_label: "How did you hear about us?",
        select_option: "Select an option",
        search_engine: "Search Engine",
        social_media: "Social Media",
        friend: "Friend or Colleague",
        advertisement: "Advertisement",
        other: "Other",
        terms_text: "I agree to the",
        terms_link: "Terms of Service",
        privacy_link: "and Privacy Policy",
        terms_error: "You must accept the terms and conditions",
        next_button: "Next",
        back_button: "Back",
        create_account_button: "Create Account",
        creating_account: "Creating...",
        success_message: "Your account has been created successfully!",
        or_separator: "Or sign up with",
        has_account: "Already have an account?",
        login_link: "Log in"
    },
};

type LangKey = keyof typeof translations;

const languageNames: { [key in LangKey]: string } = {
    en: "English",
    hi: "हिन्दी",
    te: "తెలుగు",
    ta: "தமிழ்",
    ml: "മലയാളം"
};

const isLangKey = (lang: string): lang is LangKey => {
    return lang in translations;
};

// --- The React Component ---
const SignupPage = () => {
    // --- State Management ---
    const [currentStep, setCurrentStep] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentLang, setCurrentLang] = useState<LangKey>('en');
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ width: '0%', color: '#eee' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        username: '',
        phone: '',
        birthdate: '',
        howHeard: '',
        terms: false,
    });

    // Form errors state
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        username: '',
        terms: '',
    });

    const t = translations[currentLang] || translations.en;

    // --- Side Effects ---
    useEffect(() => {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && isLangKey(savedLang)) {
            setCurrentLang(savedLang);
        }
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark');
    }, []);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const rtlLanguages: string[] = [];
        document.documentElement.setAttribute('dir', rtlLanguages.includes(currentLang) ? 'rtl' : 'ltr');
        localStorage.setItem('preferredLang', currentLang);
    }, [currentLang]);


    // --- Logic & Handlers ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checkedValue = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [id]: isCheckbox ? checkedValue : value,
        }));

        // Clear related error on input change
        if (errors[id as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }

        if (id === 'password') {
            updatePasswordStrength(value);
        }
    };

    const updatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        let color = '#e74c3c'; // Weak
        if (strength >= 75) {
            color = '#2ecc71'; // Strong
        } else if (strength >= 50) {
            color = '#f39c12'; // Medium
        }
        setPasswordStrength({ width: `${strength}%`, color });
    };

    const validateStep1 = () => {
        let isValid = true;
        const newErrors = { email: '', password: '', confirmPassword: '', fullName: '', username: '', terms: '' };

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t.email_error;
            isValid = false;
        }
        if (formData.password.length < 8 || !/[0-9]/.test(formData.password) || !/[A-Za-z]/.test(formData.password)) {
            newErrors.password = t.password_error;
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t.confirm_password_error;
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const validateStep2 = () => {
        let isValid = true;
        const newErrors = { email: '', password: '', confirmPassword: '', fullName: '', username: '', terms: '' };

        if (formData.fullName.trim().length < 2) {
            newErrors.fullName = t.name_error;
            isValid = false;
        }
        if (formData.username.length < 3) {
            newErrors.username = t.username_error;
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        }
        if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault(); // ✅ prevent page reload

    //     const { error: dbError } = await supabase.from("users").insert([
    //         {
    //             email: formData.email,
    //             full_name: formData.fullName,
    //             username: formData.username,
    //             phone: formData.phone,
    //             birthdate: formData.birthdate,
    //             how_heard: formData.howHeard,
    //             terms_accepted: formData.terms,
    //             password: formData.password
    //         },
    //     ]);

    //     if (dbError) {
    //         console.log("Insert failed:", dbError.message);
    //         // setMessage(`Insert failed: ${dbError.message}`);
    //         return;
    //     }

    //     console.log("User saved successfully! Redirecting...");

    //     // ✅ Redirect after success
    //     setTimeout(() => {
    //         window.location.href = "/citizen"; // adjust path
    //     }, 3000);
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (!res.ok) {
            console.log("Insert failed:", result.error);
            return;
        }

        // ✅ Save in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({ id: result.id, name: result.name, loggedIn: true })
        );

        console.log("User saved successfully! Redirecting...");

        setTimeout(() => {
            window.location.href = "/citizen";
        }, 1000);
    };




    const getProgressWidth = () => {
        if (currentStep === 1) return '0%';
        if (currentStep === 2) return '50%';
        if (currentStep === 3) return '100%';
        return '0%';
    };

    return (
        <>
            {/* The <Head> component is removed to prevent build errors in this environment */}
            <div className="language-selector">
                <div
                    className={`language-btn ${isLangDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                >
                    <i className="fas fa-globe"></i>
                    <span>{languageNames[currentLang]}</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className={`language-dropdown ${isLangDropdownOpen ? 'active' : ''}`}>
                    {(Object.keys(languageNames) as LangKey[]).map(lang => (
                        <div
                            key={lang}
                            className={`language-option ${currentLang === lang ? 'active' : ''}`}
                            onClick={() => { setCurrentLang(lang); setIsLangDropdownOpen(false); }}
                        >
                            <img src={`https://flagcdn.com/w40/${lang === 'en' ? 'gb' : 'in'}.png`} alt={languageNames[lang]} className="language-flag" />
                            <span className="language-name">{languageNames[lang]}</span>
                            <i className="fas fa-check language-check"></i>
                        </div>
                    ))}
                </div>
            </div>

            <div className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </div>

            <div className="container">
                <div className="logo">
                    <h1>{t.app_name}</h1>
                    <p>{t.sign_up_message}</p>
                </div>

                <div className="progress-bar" style={{ '--progress-width': getProgressWidth() } as React.CSSProperties}>
                    <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1<span className="step-label">{t.step1_label}</span></div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2<span className="step-label">{t.step2_label}</span></div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3<span className="step-label">{t.step3_label}</span></div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {currentStep === 1 && (
                        <div className="form-step active">
                            <div className="form-group">
                                <label htmlFor="email">{t.email_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" id="email" className="form-control" placeholder={t.email_placeholder} value={formData.email} onChange={handleInputChange} />
                                </div>
                                {errors.email && <div className="error-message" style={{ display: 'block' }}>{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">{t.password_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-lock"></i>
                                    <input type={isPasswordVisible ? "text" : "password"} id="password" className="form-control" placeholder={t.password_placeholder} value={formData.password} onChange={handleInputChange} />
                                    <span className="toggle-password" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                        <i className={`far ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </span>
                                </div>
                                <div className="password-strength">
                                    <div className="password-strength-bar" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}></div>
                                </div>
                                {errors.password && <div className="error-message" style={{ display: 'block' }}>{errors.password}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">{t.confirm_password_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" id="confirmPassword" className="form-control" placeholder={t.confirm_password_placeholder} value={formData.confirmPassword} onChange={handleInputChange} />
                                </div>
                                {errors.confirmPassword && <div className="error-message" style={{ display: 'block' }}>{errors.confirmPassword}</div>}
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn" onClick={handleNext}>{t.next_button}</button>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="form-step active">
                            <div className="form-group">
                                <label htmlFor="fullName">{t.fullname_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-user"></i>
                                    <input type="text" id="fullName" className="form-control" placeholder={t.fullname_placeholder} value={formData.fullName} onChange={handleInputChange} />
                                </div>
                                {errors.fullName && <div className="error-message" style={{ display: 'block' }}>{errors.fullName}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">{t.username_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-at"></i>
                                    <input type="text" id="username" className="form-control" placeholder={t.username_placeholder} value={formData.username} onChange={handleInputChange} />
                                </div>
                                {errors.username && <div className="error-message" style={{ display: 'block' }}>{errors.username}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">{t.phone_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-phone"></i>
                                    <input type="tel" id="phone" className="form-control" placeholder={t.phone_placeholder} value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-outline" onClick={handleBack}>{t.back_button}</button>
                                <button type="button" className="btn" onClick={handleNext}>{t.next_button}</button>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="form-step active">
                            <div className="form-group">
                                <label htmlFor="birthdate">{t.birthdate_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-calendar"></i>
                                    <input type="date" id="birthdate" className="form-control" value={formData.birthdate} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="howHeard">{t.how_heard_label}</label>
                                <div className="input-with-icon">
                                    <i className="fas fa-bullhorn"></i>
                                    <select id="howHeard" className="form-control" value={formData.howHeard} onChange={handleInputChange}>
                                        <option value="">{t.select_option}</option>
                                        <option value="search">{t.search_engine}</option>
                                        <option value="social">{t.social_media}</option>
                                        <option value="friend">{t.friend}</option>
                                        <option value="ad">{t.advertisement}</option>
                                        <option value="other">{t.other}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="terms">
                                <input type="checkbox" id="terms" checked={formData.terms} onChange={handleInputChange} />
                                <label htmlFor="terms">
                                    {t.terms_text}{' '}
                                    <a href="#">{t.terms_link}</a>{' '}
                                    <a href="#">{t.privacy_link}</a>
                                </label>
                            </div>
                            {errors.terms && <div className="error-message" style={{ display: 'block' }}>{errors.terms}</div>}
                            <div className="btn-group">
                                <button type="button" className="btn btn-outline" onClick={handleBack}>{t.back_button}</button>
                                <button type="submit" className="btn" disabled={formSubmitted}>
                                    {formSubmitted ? t.creating_account : t.create_account_button}
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {formSubmitted && (
                    <div className="success-message" style={{ display: 'block' }}>
                        <i className="fas fa-check-circle"></i> <span>{t.success_message}</span>
                    </div>
                )}

                <div className="separator">{t.or_separator}</div>

                <div className="social-login">
                    <div className="social-btn"><i className="fab fa-google"></i></div>
                    <div className="social-btn"><i className="fab fa-facebook-f"></i></div>
                    <div className="social-btn"><i className="fab fa-twitter"></i></div>
                </div>

                <div className="login-link">
                    <span>{t.has_account} </span>
                    <a href="http://127.0.0.1:5500/sih-frontend/login.html" target="_blank" rel="noopener noreferrer">{t.login_link}</a>
                </div>
            </div>

            <style jsx global>{`
                /* --- ALL ORIGINAL CSS GOES HERE --- */
                :root {
                    --primary-color: #3498db;
                    --secondary-color: #6c87ff;
                    --text-color: #333;
                    --bg-color: #f5f8ff;
                    --container-bg: #fff;
                    --border-color: #e0e0e0;
                    --shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    --input-focus: #4a6cf7;
                    --success-color: #2ecc71;
                    --error-color: #e74c3c;
                }
                .dark-mode {
                    --primary-color: #3498db;
                    --secondary-color: #8aa4ff;
                    --text-color: #f5f5f5;
                    --bg-color: #121212;
                    --container-bg: #1e1e1e;
                    --border-color: #444;
                    --shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    --input-focus: #6c87ff;
                }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                body {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    transition: background-color 0.3s, color 0.3s;
                    padding: 20px;
                }
                .container {
                    background-color: var(--container-bg);
                    border-radius: 12px;
                    box-shadow: var(--shadow);
                    width: 100%;
                    max-width: 480px;
                    padding: 35px;
                    transition: background-color 0.3s;
                }
                .logo { text-align: center; margin-bottom: 25px; }
                .logo h1 { font-weight: 700; color: var(--primary-color); font-size: 28px; }
                .logo p { color: #777; margin-top: 8px; font-size: 15px; }
                .progress-bar {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    margin-bottom: 30px;
                    max-width: 360px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .progress-bar::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    height: 4px;
                    width: 100%;
                    background-color: var(--border-color);
                    z-index: 1;
                }
                .progress-bar::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    height: 4px;
                    width: var(--progress-width, 0%);
                    background-color: var(--primary-color);
                    z-index: 1;
                    transition: width 0.5s ease;
                }
                .step {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    color: #777;
                    position: relative;
                    z-index: 2;
                    transition: background-color 0.3s, color 0.3s;
                }
                .step.active {
                    background-color: var(--primary-color);
                    color: white;
                }
                .step-label {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-top: 8px;
                    font-size: 12px;
                    color: #777;
                    white-space: nowrap;
                }
                .form-step {
                    display: none;
                }
                .form-step.active {
                    display: block;
                    animation: fadeIn 0.5s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    font-size: 14px;
                }
                .input-with-icon {
                    position: relative;
                }
                .input-with-icon i {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #999;
                }
                .input-with-icon input, .input-with-icon select {
                    padding-left: 45px;
                }
                .form-control {
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    font-size: 15px;
                    transition: border 0.3s;
                    background-color: var(--container-bg);
                    color: var(--text-color);
                }
                .form-control:focus {
                    border-color: var(--input-focus);
                    outline: none;
                }
                .toggle-password {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #999;
                }
                .password-strength {
                    height: 5px;
                    margin-top: 8px;
                    border-radius: 3px;
                    background-color: #eee;
                    overflow: hidden;
                }
                .password-strength-bar {
                    height: 100%;
                    width: 0%;
                    transition: width 0.3s, background-color 0.3s;
                }
                .terms {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    font-size: 14px;
                }
                .terms input {
                    margin-top: 3px;
                    margin-right: 10px;
                }
                .terms a {
                    color: var(--primary-color);
                    text-decoration: none;
                }
                .terms a:hover {
                    text-decoration: underline;
                }
                .btn-group {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                    margin-top: 10px;
                }
                .btn {
                    padding: 14px 20px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s, opacity 0.3s;
                    flex: 1;
                }
                .btn:hover {
                    background-color: #2982bd;
                }
                .btn:disabled {
                    background-color: #95a5a6;
                    cursor: not-allowed;
                }
                .btn-outline {
                    background-color: transparent;
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                }
                .btn-outline:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }
                .dark-mode .btn-outline:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                }
                .separator {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    margin: 25px 0;
                    color: #777;
                    font-size: 14px;
                }
                .separator::before,
                .separator::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid var(--border-color);
                }
                .separator:not(:empty)::before {
                    margin-right: .75em;
                }
                .separator:not(:empty)::after {
                    margin-left: .75em;
                }
                .social-login {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 25px;
                }
                .social-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--container-bg);
                    border: 1px solid var(--border-color);
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .social-btn:hover {
                    background-color: #f5f5f5;
                }
                .dark-mode .social-btn:hover {
                    background-color: #2a2a2a;
                }
                .login-link {
                    text-align: center;
                    font-size: 15px;
                }
                .login-link a {
                    color: var(--primary-color);
                    text-decoration: none;
                    font-weight: 500;
                }
                .login-link a:hover {
                    text-decoration: underline;
                }
                .theme-toggle {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: var(--container-bg);
                    border: 1px solid var(--border-color);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: var(--shadow);
                    z-index: 10;
                }
                .error-message {
                    color: var(--error-color);
                    font-size: 13px;
                    margin-top: 5px;
                }
                .success-message {
                    color: var(--success-color);
                    font-size: 14px;
                    margin-top: 15px;
                    text-align: center;
                }
                .language-selector {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    z-index: 10;
                }
                .language-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 15px;
                    background: var(--container-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: var(--shadow);
                    font-size: 14px;
                    font-weight: 500;
                }
                .language-btn:hover {
                    background-color: rgba(52, 152, 219, 0.1);
                }
                .language-btn i.fa-chevron-down {
                    font-size: 12px;
                    transition: transform 0.3s;
                }
                .language-btn.active i.fa-chevron-down {
                    transform: rotate(180deg);
                }
                .language-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 200px;
                    background: var(--container-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    margin-top: 5px;
                    box-shadow: var(--shadow);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s;
                    z-index: 100;
                }
                .language-dropdown.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .language-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 15px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .language-option:hover {
                    background-color: rgba(52, 152, 219, 0.1);
                }
                .language-option.active {
                    background-color: rgba(52, 152, 219, 0.15);
                    font-weight: 600;
                }
                .language-flag {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .language-name {
                    flex: 1;
                    font-size: 14px;
                }
                .language-check {
                    color: var(--primary-color);
                    font-size: 14px;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .language-option.active .language-check {
                    opacity: 1;
                }
            `}</style>
        </>
    );
};

export default SignupPage;

