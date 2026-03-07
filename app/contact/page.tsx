'use client';

import { useEffect, useRef } from 'react';
import NavBar from '../../components/cfbpredictor-rankings/NavBar';

export default function ContactPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  function ref(i: number) {
    return (el: HTMLDivElement | null) => { sectionRefs.current[i] = el; };
  }

  return (
    <>
      <NavBar active="contact" />

      <div className="page-wrap">

        {/* HERO */}
        <div className="page-hero anim-fade-up anim-in">
          <div className="page-eyebrow">Get In Touch</div>
          <h1 className="page-hero-title">Let&apos;s <span>Talk</span></h1>
          <p className="page-hero-desc">
            Questions about the model, data partnerships, feedback, or just want to
            talk college football — we&apos;re all ears.
          </p>
        </div>

        <div className="contact-grid">
          {/* FORM */}
          <div className="anim-fade-up" ref={ref(0)}>
            <form className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="What's on your mind?" />
              </div>
              <button type="submit" className="form-submit">
                <span>Send Message</span>
                <span>→</span>
              </button>
            </form>
          </div>

          {/* ASIDE */}
          <div className="contact-aside">
            <div className="anim-fade-up" ref={ref(1)} style={{ animationDelay: '0.1s' }}>
              <a href="https://x.com/CFBPredictor" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon" style={{ background: 'rgba(255,255,255,0.06)' }}>𝕏</div>
                <div>
                  <div className="contact-card-label">Follow on X</div>
                  <div className="contact-card-value">@CFBPredictor</div>
                </div>
              </a>
            </div>
            <div className="anim-fade-up" ref={ref(2)} style={{ animationDelay: '0.18s' }}>
              <a href="mailto:hello@cfbpredictor.com" className="contact-card">
                <div className="contact-card-icon" style={{ background: 'rgba(74,163,255,0.08)' }}>✉</div>
                <div>
                  <div className="contact-card-label">Email Us</div>
                  <div className="contact-card-value">hello@cfbpredictor.com</div>
                </div>
              </a>
            </div>
            <div className="anim-fade-up" ref={ref(3)} style={{ animationDelay: '0.26s' }}>
              <div className="contact-note">
                <strong>Response time:</strong> We typically reply within 24–48 hours.
                For data or partnership inquiries, please include as much detail as possible.
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">CFBPredictor<span>.com</span></div>
          <p className="footer-disclaimer">
            CFPi+ Power Rankings are designed to be predictive, forward-looking indexes for analyzing potential
            outcomes of college football games. These are not official CFP rankings.
          </p>
          <div className="footer-links">
            <a href="/cfbpredictor">Rankings</a>
            <a href="/methodology">Methodology</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}