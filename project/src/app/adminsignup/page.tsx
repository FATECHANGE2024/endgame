"use client";
import { useState } from "react";
import "./admin.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function SignupForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="container">
      {/* Language Selector */}
      <div className="language-selector" id="languageSelector">
        <div className="language-btn" id="languageBtn">
          <i className="fas fa-globe"></i>
          <span id="currentLanguage">English</span>
          <i className="fas fa-chevron-down"></i>
        </div>
        <div className="language-dropdown" id="languageDropdown">
          <div className="language-option active" data-lang="en">
            <img
              src="https://flagcdn.com/w40/gb.png"
              srcSet="https://flagcdn.com/w80/gb.png 2x"
              width="40"
              alt="English"
              className="language-flag"
            />
            <span className="language-name">English</span>
            <i className="fas fa-check language-check"></i>
          </div>
          <div className="language-option" data-lang="hi">
            <img
              src="https://flagcdn.com/w40/in.png"
              srcSet="https://flagcdn.com/w80/in.png 2x"
              width="40"
              alt="Hindi"
              className="language-flag"
            />
            <span className="language-name">हिन्दी (Hindi)</span>
            <i className="fas fa-check language-check"></i>
          </div>
          <div className="language-option" data-lang="te">
            <img
              src="https://flagcdn.com/w40/in.png"
              srcSet="https://flagcdn.com/w80/in.png 2x"
              width="40"
              alt="Telugu"
              className="language-flag"
            />
            <span className="language-name">తెలుగు (Telugu)</span>
            <i className="fas fa-check language-check"></i>
          </div>
          <div className="language-option" data-lang="ta">
            <img
              src="https://flagcdn.com/w40/in.png"
              srcSet="https://flagcdn.com/w80/in.png 2x"
              width="40"
              alt="Tamil"
              className="language-flag"
            />
            <span className="language-name">தமிழ் (Tamil)</span>
            <i className="fas fa-check language-check"></i>
          </div>
          <div className="language-option" data-lang="ml">
            <img
              src="https://flagcdn.com/w40/in.png"
              srcSet="https://flagcdn.com/w80/in.png 2x"
              width="40"
              alt="Malayalam"
              className="language-flag"
            />
            <span className="language-name">മലയാളം (Malayalam)</span>
            <i className="fas fa-check language-check"></i>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="theme-toggle" id="themeToggle">
        <i className="fas fa-moon"></i>
      </div>

      {/* Logo Section */}
      <div className="logo">
        <h1 data-translate="app_name">Samadhan Setu</h1>
        <p data-translate="sign_up_message">Create your account in a few simple steps</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className={`step ${step === 1 ? "active" : ""}`} id="step1">
          1
          <span className="step-label" data-translate="step1_label">
            Account
          </span>
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`} id="step2">
          2
          <span className="step-label" data-translate="step2_label">
            Profile
          </span>
        </div>
        <div className={`step ${step === 3 ? "active" : ""}`} id="step3">
          3
          <span className="step-label" data-translate="step3_label">
            Finish
          </span>
        </div>
      </div>

      {/* Form */}
      <form id="signupForm">
        {/* Step 1 */}
        {step === 1 && (
          <div className="form-step active" id="step1-form">
            <div className="form-group">
              <label htmlFor="email" data-translate="email_label">
                Email Address
              </label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  data-translate-placeholder="email_placeholder"
                />
              </div>
              <div className="error-message" id="emailError" data-translate="email_error">
                Please enter a valid email address
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" data-translate="password_label">
                Password
              </label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Create a password"
                  data-translate-placeholder="password_placeholder"
                />
                <span className="toggle-password" id="togglePassword">
                  <i className="far fa-eye"></i>
                </span>
              </div>
              <div className="password-strength">
                <div className="password-strength-bar" id="passwordStrengthBar"></div>
              </div>
              <div
                className="error-message"
                id="passwordError"
                data-translate="password_error"
              >
                Password must be at least 8 characters with letters and numbers
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" data-translate="confirm_password_label">
                Confirm Password
              </label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  data-translate-placeholder="confirm_password_placeholder"
                />
              </div>
              <div
                className="error-message"
                id="confirmPasswordError"
                data-translate="confirm_password_error"
              >
                Passwords do not match
              </div>
            </div>

            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => setStep(2)}
                data-translate="next_button"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="form-step" id="step2-form">
            <div className="form-group">
              <label htmlFor="fullName" data-translate="fullname_label">
                Full Name
              </label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  data-translate-placeholder="fullname_placeholder"
                />
              </div>
              <div className="error-message" id="nameError" data-translate="name_error">
                Please enter your name
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username" data-translate="username_label">
                Username
              </label>
              <div className="input-with-icon">
                <i className="fas fa-at"></i>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Choose a username"
                  data-translate-placeholder="username_placeholder"
                />
              </div>
              <div
                className="error-message"
                id="usernameError"
                data-translate="username_error"
              >
                Username must be at least 3 characters
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="post" data-translate="post_label">
                Post/Position
              </label>
              <div className="input-with-icon">
                <i className="fas fa-briefcase"></i>
                <select id="post" className="form-control">
                  <option value="" data-translate="select_post">
                    Select your post
                  </option>
                  <option value="officer" data-translate="post_officer">
                    Officer
                  </option>
                  <option value="manager" data-translate="post_manager">
                    Manager
                  </option>
                  <option value="engineer" data-translate="post_engineer">
                    Engineer
                  </option>
                  <option value="analyst" data-translate="post_analyst">
                    Analyst
                  </option>
                  <option value="other" data-translate="post_other">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" data-translate="phone_label">
                Phone Number (Optional)
              </label>
              <div className="input-with-icon">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  data-translate-placeholder="phone_placeholder"
                />
              </div>
            </div>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStep(1)}
                data-translate="back_button"
              >
                Back
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setStep(3)}
                data-translate="next_button"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="form-step" id="step3-form">
            <div className="form-group">
              <label htmlFor="birthdate" data-translate="birthdate_label">
                Date of Birth
              </label>
              <div className="input-with-icon">
                <i className="fas fa-calendar"></i>
                <input type="date" id="birthdate" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="howHeard" data-translate="how_heard_label">
                How did you hear about us?
              </label>
              <div className="input-with-icon">
                <i className="fas fa-bullhorn"></i>
                <select id="howHeard" className="form-control">
                  <option value="" data-translate="select_option">
                    Select an option
                  </option>
                  <option value="search" data-translate="search_engine">
                    Search Engine
                  </option>
                  <option value="social" data-translate="social_media">
                    Social Media
                  </option>
                  <option value="friend" data-translate="friend">
                    Friend or Colleague
                  </option>
                  <option value="ad" data-translate="advertisement">
                    Advertisement
                  </option>
                  <option value="other" data-translate="other">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" data-translate="terms_text">
                I agree to the{" "}
                <a href="#" data-translate="terms_link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" data-translate="privacy_link">
                  Privacy Policy
                </a>
              </label>
            </div>
            <div
              className="error-message"
              id="termsError"
              data-translate="terms_error"
            >
              You must accept the terms and conditions
            </div>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStep(2)}
                data-translate="back_button"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn"
                id="submitForm"
                data-translate="create_account_button"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Success Message */}
      <div className="success-message" id="successMessage">
        <i className="fas fa-check-circle"></i>{" "}
        <span data-translate="success_message">
          Your account has been created successfully!
        </span>
      </div>

      <div className="separator" data-translate="or_separator">
        Or sign up with
      </div>

      {/* Social Login */}
      <div className="social-login">
        <div className="social-btn">
          <i className="fab fa-google"></i>
        </div>
        <div className="social-btn">
          <i className="fab fa-facebook-f"></i>
        </div>
        <div className="social-btn">
          <i className="fab fa-twitter"></i>
        </div>
      </div>

      <div className="login-link">
        <span data-translate="has_account">Already have an account?</span>{" "}
        <a
          href="/loginforcityo"
          target="_blank"
          rel="noopener noreferrer"
          data-translate="login_link"
        >
          Log in
        </a>
      </div>
    </div>
  );
}
