'use client';

import { useEffect, useRef } from 'react';
import NavBar from '../../components/cfbpredictor-rankings/NavBar';

export default function MethodologyPage() {
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
      <NavBar active="methodology" />

      <div className="page-wrap">

        {/* HERO */}
        <div className="page-hero anim-fade-up anim-in">
          <div className="page-eyebrow">Model Documentation</div>
          <h1 className="page-hero-title">
            How the Model<br /><span>Actually Works</span>
          </h1>
          <p className="page-hero-desc">
            A transparent breakdown of the CFPi+ methodology — what goes in,
            how it&apos;s weighted, and where we&apos;re taking it next.
          </p>
        </div>

        {/* 01 */}
        <div className="meth-section anim-fade-up" ref={ref(0)}>
          <div className="meth-section-header">
            <span className="meth-section-num">01</span>
            <span className="meth-section-title">What Is CFPi+?</span>
          </div>
          <div className="meth-prose">
            <p>
              The <strong>College Football Power Index (CFPi+)</strong> is expressed as a projected mean point
              differential above or below an average FBS team on a neutral field. A CFPi+ of <strong>+7.4</strong>,
              for example, means that team is projected to outperform the average FBS opponent by roughly a touchdown.
            </p>
            <p>
              Win probability is derived from this number using the inherent variance and standard deviation in
              college football outcomes. A large CFPi+ gap doesn&apos;t guarantee a win — it shifts the probability
              distribution in that team&apos;s favor.
            </p>
            <p>
              To estimate a matchup spread, subtract one team&apos;s CFPi+ from the other&apos;s. Raw CFPi+ values
              assume a true neutral field — but our <strong>dynamic HFA calculator</strong> adjusts for the real
              environment of each game, quantifying expected points added by a specific venue based on travel
              distance, weather conditions, traditional rivalries, and the intensity of the home fan base.
            </p>
          </div>
          <div className="meth-formula">
            CFPi+ = f(Advanced Stats, Opponent Strength, Team Talent, Power Ranking Composite)
          </div>
        </div>

        {/* 02 */}
        <div className="meth-section anim-fade-up" ref={ref(1)}>
          <div className="meth-section-header">
            <span className="meth-section-num">02</span>
            <span className="meth-section-title">What Goes Into the Model</span>
          </div>
          <div className="meth-cards">
            {[
              { icon: '⚡', title: 'Adjusted Efficiency',     desc: 'Points per drive adjusted for opponent quality. Offense and defense rated independently, then combined.' },
              { icon: '📈', title: 'Success Rate',            desc: 'The most predictive stat in college football. Measures how often a team gains positive expected value on a given down and distance.' },
              { icon: '🗓️', title: 'Strength of Schedule',   desc: 'Iterative opponent quality weighting. Games against stronger opponents carry more predictive weight.' },
              { icon: '🎓', title: 'Talent Composite',        desc: 'Recruiting rankings and portal activity blended into a roster quality score (TPi+).' },
              { icon: '🔬', title: 'Advanced Stats',          desc: 'Explosiveness, havoc rate, line yards, and finishing drives — granular metrics that surface what box scores miss.' },
              { icon: '⚖️', title: 'Power Ranking Composite', desc: 'A weighted average of ESPN FPI, Past SP+, Current SP+, SRS, and Kelly Ford Rankings. Normalizes outliers and softens data spikes.' },
            ].map(({ icon, title, desc }, i) => (
              <div className="meth-card anim-fade-up" key={title}
                style={{ animationDelay: `${i * 0.07}s` }}
                ref={ref(2 + i)}>
                <div className="meth-card-icon">{icon}</div>
                <div className="meth-card-title">{title}</div>
                <div className="meth-card-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 */}
        <div className="meth-section anim-fade-up" ref={ref(8)}>
          <div className="meth-section-header">
            <span className="meth-section-num">03</span>
            <span className="meth-section-title">How to Read the Numbers</span>
          </div>
          <div className="meth-prose">
            <p>
              The CFPi+ is expressed as a projected mean point differential above or below an average FBS team
              on a neutral field. A CFPi+ of <strong>+7.4</strong>, for example, means that team is projected
              to outperform the average FBS opponent by roughly a touchdown.
            </p>
            <p>
              Win probability is derived from the variance and standard deviation inherent in college football
              outcomes — a large gap shifts the distribution in that team&apos;s favor but doesn&apos;t
              guarantee a result.
            </p>
            <p>
              To estimate a spread for any matchup, subtract one CFPi+ from the other. The <strong>dynamic HFA
              calculator</strong> then applies venue-specific adjustments — accounting for travel distance,
              weather, rivalry intensity, and the raw decibel level of the home crowd.
            </p>
          </div>
        </div>

        {/* 04 — ROADMAP */}
        <div className="meth-section anim-fade-up" ref={ref(9)}>
          <div className="meth-section-header">
            <span className="meth-section-num">04</span>
            <span className="meth-section-title">What&apos;s Coming</span>
          </div>
          <div className="roadmap-items">
            {[
              { tag: 'tag-live',   label: 'Live',        title: '2025-26 Season Final CFPi+ Power Index',                        desc: '136 FBS teams ranked by our composite power metric — final end-of-season standings' },
              { tag: 'tag-live',   label: 'Live',        title: '2025-26 Season Final EPi+ Efficiency Index',                    desc: 'Offensive and defensive efficiency breakdowns for all 136 FBS teams' },
              { tag: 'tag-live',   label: 'Live',        title: '2025-26 Advanced Stats, Talent Composite & Strength of Record', desc: 'Deep-dive metrics covering success rate, explosiveness, recruiting, portal activity, and win quality' },
              { tag: 'tag-next',   label: 'Next',        title: 'CMBKi+ March Madness Predictor',                                desc: 'Bracket predictions powered by our college basketball efficiency model — pick your champion before tip-off' },
              { tag: 'tag-soon',   label: 'Soon',        title: 'Pre-Spring 2026 CFPi+ Power Rankings',                          desc: 'Way Too Early projections — first look at the 2026 season landscape. Dropping April 9th.' },
              { tag: 'tag-summer', label: 'Summer 2026', title: 'Pre-Season Power 4 Dashboard',                                  desc: 'Full season projections for every SEC, Big Ten, ACC, and Big 12 team. Coming July 2026.' },
              { tag: 'tag-summer', label: 'Summer 2026', title: 'Weekly In-Season CFPi+ Rankings',                               desc: 'Live power rankings updated after every game week. Coming August 2026.' },
              { tag: 'tag-summer', label: 'Summer 2026', title: 'Weekly Predictions — Top 10 Games + SEC Spotlight',             desc: 'Spread estimates and win probability for the 10 biggest games of the week. Coming August 2026.' },
            ].map(({ tag, label, title, desc }, i) => (
              <div className="roadmap-item anim-fade-up" key={title}
                style={{ animationDelay: `${i * 0.05}s` }}
                ref={ref(10 + i)}>
                <span className={`roadmap-tag ${tag}`}>{label}</span>
                <div>
                  <div className="roadmap-text-title">{title}</div>
                  <div className="roadmap-text-desc">{desc}</div>
                </div>
              </div>
            ))}
            <div className="roadmap-item anim-fade-up" ref={ref(18)}>
              <span className="roadmap-tag tag-summer">Summer 2026</span>
              <div>
                <div className="roadmap-text-title">Full Season Game Predictions <span className="premium-label">Premium Feature</span></div>
                <div className="roadmap-text-desc">Every FBS matchup, every week — complete game-by-game forecasts with spread estimates and win probability.</div>
              </div>
            </div>
            <div className="roadmap-item anim-fade-up" ref={ref(19)}>
              <span className="roadmap-tag tag-planned">Planned</span>
              <div>
                <div className="roadmap-text-title">Game Predictor Dashboard <span className="premium-label">Premium Feature</span></div>
                <div className="roadmap-text-desc">Head-to-head matchup simulator with spread estimates, win probability, and dynamic HFA adjustments.</div>
              </div>
            </div>
            <div className="roadmap-item anim-fade-up" ref={ref(20)}>
              <span className="roadmap-tag tag-planned">Planned</span>
              <div>
                <div className="roadmap-text-title">Real-Time Score Predictor</div>
                <div className="roadmap-text-desc">Continuously updating projected final score and win probability with every possession.</div>
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