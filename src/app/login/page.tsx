'use client';
import React, { useState, useEffect } from 'react';
import './login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

//Change

// --- Translation Data and Types (Defined in correct order) ---

// STEP 1: Define the data object first.
const translations = {
    en: {
        app_name: "Samadhan Setu",
        sign_in_message: "Sign in to access your account",
        email_label: "Email Address",
        email_placeholder: "Enter your email",
        email_error: "Please enter a valid email address",
        password_label: "Password",
        password_placeholder: "Enter your password",
        password_error: "Password must be at least 8 characters",
        remember_me: "Remember me",
        forgot_password: "Forgot Password?",
        sign_in_button: "Sign In",
        or_separator: "Or continue with",
        no_account: "Don't have an account?",
        sign_up_link: "Sign up",
        login_success: "Login successful! Redirecting...",
        signing_in: "Signing In..."
    },
    hi: {
        app_name: "समाधान सेतु",
        sign_in_message: "अपने खाते तक पहुंचने के लिए साइन इन करें",
        email_label: "ईमेल पता",
        email_placeholder: "अपना ईमेल दर्ज करें",
        email_error: "कृपया एक वैध ईमेल पता दर्ज करें",
        password_label: "पासवर्ड",
        password_placeholder: "अपना पासवर्ड दर्ज करें",
        password_error: "पासवर्ड कम से कम 8 वर्णों का होना चाहिए",
        remember_me: "मुझे याद रखें",
        forgot_password: "पासवर्ड भूल गए?",
        sign_in_button: "साइन इन करें",
        or_separator: "या के साथ जारी रखें",
        no_account: "खाता नहीं है?",
        sign_up_link: "साइन अप करें",
        login_success: "लॉगिन सफल! रीडायरेक्ट किया जा रहा है...",
        signing_in: "साइन इन हो रहा है..."
    },
    te: {
        app_name: "సమాధానం సేతు",
        sign_in_message: "మీ ఖాతాకు ప్రవేశించడానికి సైన్ ఇన్ చేయండి",
        email_label: "ఇమెయిల్ చిరునామా",
        email_placeholder: "మీ ఇమెయిల్ నమోదు చేయండి",
        email_error: "దయచేసి సరైన ఇమెయిల్ చిరునామాను నమోదు చేయండి",
        password_label: "పాస్వర్డ్",
        password_placeholder: "మీ పాస్వర్డ్ నమోదు చేయండి",
        password_error: "పాస్వర్డ్ కనీసం 8 అక్షరాలుగా ఉండాలి",
        remember_me: "నన్ను గుర్తు ఉంచు",
        forgot_password: "పాస్వర్డ్ మర్చిపోయారా?",
        sign_in_button: "సైన్ ఇన్",
        or_separator: "లేదా కొనసాగించండి",
        no_account: "ఖాతా లేదా?",
        sign_up_link: "సైన్ అప్",
        login_success: "లాగిన్ విజయవంతమైంది! మళ్ళింపు...",
        signing_in: "సైన్ ఇన్ చేస్తోంది..."
    },
    ta: {
        app_name: "சமாதானம் சேது",
        sign_in_message: "உங்கள் கணக்கில் அணுக உள்நுழைக",
        email_label: "மின்னஞ்சல் முகவரி",
        email_placeholder: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
        email_error: "சரியான மின்னஞ்சల్ முகவரியை உள்ளிடவும்",
        password_label: "கடவுச்சொல்",
        password_placeholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
        password_error: "கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்",
        remember_me: "என்னை நினைவில் கொள்ளுங்கள்",
        forgot_password: "கடவுச்சொல் மறந்துவிட்டீர்களா?",
        sign_in_button: "உள்நுழைக",
        or_separator: "அல்லது தொடரவும்",
        no_account: "கணக்கு இல்லையா?",
        sign_up_link: "பதிவு செய்யவும்",
        login_success: "உள்நுழைவு வெற்றிகரமாக உள்ளது! திருப்பி விடப்படுகிறது...",
        signing_in: "உள்நுழைகிறது..."
    },
    ml: {
        app_name: "സമാധാനം സേതു",
        sign_in_message: "നിങ്ങളുടെ അക്കൗണ്ട് ആക്‌സസ് ചെയ്യാൻ സൈൻ ഇൻ ചെയ്യുക",
        email_label: "ഇമെയിൽ വിലാസം",
        email_placeholder: "നിങ്ങളുടെ ഇമെയിൽ നൽകുക",
        email_error: "ദയവായി ഒരു സാധുതയുള്ള ഇമെയിൽ വിലാസം നൽകുക",
        password_label: "പാസ്‌വേഡ്",
        password_placeholder: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
        password_error: "പാസ്‌വേഡ് കുറഞ്ഞത് 8 അക്ഷരങ്ങൾ ആയിരിക്കണം",
        remember_me: "എന്നെ ഓർക്കുക",
        forgot_password: "പാസ്‌വേഡ് മറന്നോ?",
        sign_in_button: "സൈൻ ഇൻ",
        or_separator: "അല്ലെങ്കിൽ തുടരുക",
        no_account: "അക്കൗണ്ട് ഇല്ലേ?",
        sign_up_link: "സൈൻ അപ്പ്",
        login_success: "ലോഗിൻ വിജയകരമാണ്! റീഡയറക്‌ടുചെയ്യുന്നു...",
        signing_in: "സൈൻ ഇൻ ചെയ്യുന്നു..."
    }
};

// STEP 2: Create the type from the `translations` object.
type LangKey = keyof typeof translations;

// STEP 3: Use the `LangKey` type for other definitions.
const languageNames: { [key in LangKey]: string } = {
    en: "English",
    hi: "हिन्दी",
    te: "తెలుగు",
    ta: "தமிழ்",
    ml: "മലയാളം"
};

// Type guard function to validate a string as a valid language key.
const isLangKey = (lang: string): lang is LangKey => {
    return lang in translations;
};


// --- The React Component ---
const LoginPage = () => {
    // --- State Management ---
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentLang, setCurrentLang] = useState<LangKey>('en');
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Alias for current language's translations
    const t = translations[currentLang];

    // --- Side Effects ---

    // Load theme and language from localStorage on initial render
    useEffect(() => {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && isLangKey(savedLang)) {
            setCurrentLang(savedLang);
        }

        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark');
    }, []);

    // Update body class and localStorage when theme changes
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Update document direction and localStorage when language changes
    useEffect(() => {
        const rtlLanguages: string[] = [];
        document.documentElement.setAttribute('dir', rtlLanguages.includes(currentLang) ? 'rtl' : 'ltr');
        localStorage.setItem('preferredLang', currentLang);
    }, [currentLang]);

    // --- Event Handlers ---

    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // 1️⃣ Get user row by email
    //     const { data: user, error } = await supabase
    //         .from("users")
    //         .select("id, email, password, full_name, username")
    //         .eq("email", email)
    //         .single();

    //     if (error || !user) {
    //         console.log("User not found!");
    //         return;
    //     }
    //     // hello

    //     // 2️⃣ Compare plain passwords
    //     if (user.password !== password) {
    //         console.log("Invalid password!");
    //         return;
    //     }

    //     // 3️⃣ Login success
    //     console.log("Login successful!", user);

    //     // ✅ Redirect after success
    //     setTimeout(() => {
    //         window.location.href = "/citizen"; // adjust path
    //     }, 1500);
    // };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await res.json();

        if (!res.ok) {
            console.log("Login failed:", result.error);
            return;
        }

        // ✅ Save to localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: result.id,
                name: result.name,
                loggedIn: true,
            })
        );

        console.log("Login successful!", result);

        // ✅ Redirect
        setTimeout(() => {
            window.location.href = "/citizen";
        }, 1500);
    };


    return (
        <>
            {/* The <Head> component has been removed to resolve the compilation error. */}
            {/* In a real Next.js project, you would ensure 'next' is installed. */}
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
                    <p>{t.sign_in_message}</p>
                </div>

                <form onSubmit={handleLogin} noValidate>
                    <div className="form-group">
                        <label htmlFor="email">{t.email_label}</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder={t.email_placeholder}
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                                required
                            />
                        </div>
                        {emailError && <div className="error-message" style={{ display: 'block' }}>{emailError}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">{t.password_label}</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                className="form-control"
                                placeholder={t.password_placeholder}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                                required
                            />
                            <span className="toggle-password" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <i className={`far ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                        {passwordError && <div className="error-message" style={{ display: 'block' }}>{passwordError}</div>}
                    </div>

                    <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">{t.remember_me}</label>
                        </div>
                        <a href="#" className="forgot-password">{t.forgot_password}</a>
                    </div>

                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? t.signing_in : t.sign_in_button}
                    </button>
                </form>

                <div className="separator">{t.or_separator}</div>

                <div className="social-login">
                    <div className="social-btn"><i className="fab fa-google"></i></div>
                    <div className="social-btn"><i className="fab fa-facebook-f"></i></div>
                    <div className="social-btn"><i className="fab fa-twitter"></i></div>
                </div>

                <div className="signup-link">
                    <span>{t.no_account} </span>
                    <a href="http://127.0.0.1:5500/sih-frontend/signup.html" target="_blank" rel="noopener noreferrer">
                        {t.sign_up_link}
                    </a>
                </div>
            </div>

            <style jsx global>{`
                /* --- ALL ORIGINAL CSS GOES HERE --- */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                :root {
                    --primary-color: #3498db;
                    --text-color: #333;
                    --bg-color: #f5f8ff;
                    --container-bg: #fff;
                    --border-color: #e0e0e0;
                    --shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    --input-focus: #4a6cf7;
                }
                .dark-mode {
                    --primary-color: #3498db;
                    --text-color: #f5f5f5;
                    --bg-color: #121212;
                    --container-bg: #1e1e1e;
                    --border-color: #444;
                    --shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    --input-focus: #6c87ff;
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
                    max-width: 420px;
                    padding: 35px;
                    transition: background-color 0.3s;
                }
                .logo { text-align: center; margin-bottom: 25px; }
                .logo h1 { font-weight: 700; color: var(--primary-color); font-size: 28px; }
                .logo p { color: #777; margin-top: 8px; font-size: 15px; }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px; }
                .input-with-icon { position: relative; }
                .input-with-icon i { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #999; }
                [dir="rtl"] .input-with-icon i { left: auto; right: 15px; }
                .input-with-icon input { padding-left: 45px; }
                [dir="rtl"] .input-with-icon input { padding-left: 15px; padding-right: 45px; }
                .form-control { width: 100%; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 15px; transition: border 0.3s; background-color: var(--container-bg); color: var(--text-color); }
                .form-control:focus { border-color: var(--input-focus); outline: none; }
                .toggle-password { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #999; }
                [dir="rtl"] .toggle-password { right: auto; left: 15px; }
                .options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 14px; }
                [dir="rtl"] .options { flex-direction: row-reverse; }
                .remember-me { display: flex; align-items: center; }
                [dir="rtl"] .remember-me { flex-direction: row-reverse; }
                .remember-me input { margin-right: 8px; }
                [dir="rtl"] .remember-me input { margin-right: 0; margin-left: 8px; }
                .forgot-password { color: var(--primary-color); text-decoration: none; }
                .forgot-password:hover { text-decoration: underline; }
                .btn { width: 100%; padding: 14px; background-color: var(--primary-color); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.3s, opacity 0.3s; }
                .btn:hover { background-color: #2982bd; }
                .btn:disabled { background-color: #999; cursor: not-allowed; opacity: 0.7; }
                .separator { display: flex; align-items: center; text-align: center; margin: 25px 0; color: #777; font-size: 14px; }
                .separator::before, .separator::after { content: ''; flex: 1; border-bottom: 1px solid var(--border-color); }
                .separator:not(:empty)::before { margin-right: .75em; }
                .separator:not(:empty)::after { margin-left: .75em; }
                .social-login { display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; }
                .social-btn { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--container-bg); border: 1px solid var(--border-color); cursor: pointer; transition: background-color 0.3s; }
                .social-btn:hover { background-color: #f5f5f5; }
                .dark-mode .social-btn:hover { background-color: #2a2a2a; }
                .signup-link { text-align: center; font-size: 15px; }
                .signup-link a { color: var(--primary-color); text-decoration: none; font-weight: 500; }
                .signup-link a:hover { text-decoration: underline; }
                .theme-toggle { position: absolute; top: 20px; right: 20px; background: var(--container-bg); border: 1px solid var(--border-color); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--shadow); z-index: 10; }
                .error-message { color: #e74c3c; font-size: 13px; margin-top: 5px; }
                .language-selector { position: absolute; top: 20px; left: 20px; z-index: 10; }
                .language-btn { display: flex; align-items: center; gap: 8px; padding: 10px 15px; background: var(--container-bg); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.3s; box-shadow: var(--shadow); font-size: 14px; font-weight: 500; }
                .language-btn:hover { background-color: rgba(52, 152, 219, 0.1); }
                .language-btn i.fa-chevron-down { font-size: 14px; transition: transform 0.3s; }
                .language-btn.active i.fa-chevron-down { transform: rotate(180deg); }
                .language-dropdown { position: absolute; top: 100%; left: 0; width: 200px; background: var(--container-bg); border: 1px solid var(--border-color); border-radius: 8px; margin-top: 5px; box-shadow: var(--shadow); opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s; z-index: 100; }
                .language-dropdown.active { opacity: 1; visibility: visible; transform: translateY(0); }
                .language-option { display: flex; align-items: center; gap: 12px; padding: 12px 15px; cursor: pointer; transition: background-color 0.2s; }
                .language-option:hover { background-color: rgba(52, 152, 219, 0.1); }
                .language-option.active { background-color: rgba(52, 152, 219, 0.15); font-weight: 600; }
                .language-flag { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
                .language-name { flex: 1; font-size: 14px; }
                .language-check { color: var(--primary-color); font-size: 14px; opacity: 0; transition: opacity 0.2s; }
                .language-option.active .language-check { opacity: 1; }
                @media (max-width: 480px) {
                    .container { padding: 25px; }
                    .options { flex-direction: column; align-items: flex-start; gap: 10px; }
                    [dir="rtl"] .options { align-items: flex-end; }
                    .theme-toggle { top: 10px; right: 10px; width: 40px; height: 40px; }
                    .language-selector { top: 10px; left: 10px; }
                    .language-btn { padding: 8px 12px; font-size: 12px; }
                    .language-dropdown { width: 180px; }
                }
            `}</style>
        </>
    );
};

export default LoginPage;

