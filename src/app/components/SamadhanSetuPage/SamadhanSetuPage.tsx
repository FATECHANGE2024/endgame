'use client';
import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const translations: { [key: string]: { [key: string]: string } } = {
    en: {
        title: "Samadhan Setu",
        currentIssues: "Current Issues in Bhopal",
        bhopalLocation: "Bhopal, Madhya Pradesh",
        // Add all other English translations here...
    },
    hi: {
        title: "समाधान सेतु",
        currentIssues: "भोपाल में वर्तमान मुद्दे",
        bhopalLocation: "भोपाल, मध्य प्रदेश",
        // Add all other Hindi translations here...
    },
    // ... other languages
};


const SamadhanSetuPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Voice recording state
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [timer, setTimer] = useState('00:00');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const secondsRef = useRef(0);
    

    // --- Effects for initialization and state changes ---

    // Set theme on initial load and when isDarkMode changes
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // --- Handlers ---
    
    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const changeLanguage = (lang: string) => {
        setCurrentLang(lang);
        setIsLangDropdownOpen(false);
    };

    const handleOpenLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const toggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioURL(url);
                    stream.getTracks().forEach(track => track.stop()); // Stop microphone access
                    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                };

                mediaRecorder.start();
                setIsRecording(true);
                secondsRef.current = 0;
                setTimer('00:00');
                timerIntervalRef.current = setInterval(() => {
                    secondsRef.current++;
                    const mins = Math.floor(secondsRef.current / 60).toString().padStart(2, '0');
                    const secs = (secondsRef.current % 60).toString().padStart(2, '0');
                    setTimer(`${mins}:${secs}`);
                }, 1000);

            } catch (err) {
                console.error("Error accessing microphone:", err);
                alert("Could not access microphone. Please check your browser permissions.");
            }
        }
    };

    const deleteRecording = () => {
        setAudioURL('');
        setTimer('00:00');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your report! It has been submitted for review.');
        setIsModalOpen(false);
    };

    const t = translations[currentLang] || translations.en;

    return (
        <>
            <Head>
                <title>{t.title} - Report Local Issues</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
            </Head>

            <header>
                 {/* Header JSX */}
            </header>

            <main>
                <section className="hero">
                    {/* Hero Section JSX */}
                </section>

                <div className="curved-divider"></div>

                <section className="workflow-section" id="how-it-works">
                    {/* Workflow Section JSX */}
                </section>
                
                <section className="reporting-steps">
                    {/* Reporting Steps Section JSX */}
                </section>

                <section className="map-section" id="map">
                    <div className="container">
                        <div className="map-title">
                            <h2 className="section-title">{t.currentIssues}</h2>
                            <div className="location-badge">
                                <i className="fas fa-map-pin"></i> {t.bhopalLocation}
                            </div>
                        </div>
                        {/* <MapWithNoSSR /> */}
                    </div>
                </section>
                
                <section className="reports-container" id="reports">
                    {/* Reports Section JSX */}
                </section>

            </main>
            
            {isModalOpen && (
                 <div className="modal" style={{ display: 'flex' }}>
                    {/* Modal JSX */}
                 </div>
            )}

            <footer>
                {/* Footer JSX */}
            </footer>

            <style jsx global>{`
                /* --- ALL THE CSS FROM THE ORIGINAL FILE GOES HERE --- */
                :root {
                    --primary: #3498db;
                    /* ... rest of the CSS variables */
                }
                .dark-mode {
                    --bg-color: #1a1a1a;
                    /* ... rest of dark mode variables */
                }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    transition: background-color 0.3s, color 0.3s;
                }
                /* ... PASTE THE ENTIRE <style> CONTENT HERE ... */
                #map { /* Make sure map container has a defined height */
                    height: 500px;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </>
    );
};

export default SamadhanSetuPage;
