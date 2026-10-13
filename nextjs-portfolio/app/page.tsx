"use client";

import { useEffect, useState } from "react";

const technologies = [
  ["Microsoft Azure", "azure/azure-original.svg"],
  ["Node.js", "nodejs/nodejs-original.svg"],
  ["Socket.IO", "socketio/socketio-original.svg"],
  ["Firebase", "firebase/firebase-plain.svg"],
  ["Electron", "electron/electron-original.svg"],
  ["PHP", "php/php-original.svg"],
  ["AngularJS", "angularjs/angularjs-original.svg"],
  ["Java", "java/java-original.svg"],
  ["WordPress", "wordpress/wordpress-original.svg"],
];

const additionalTools = [
  "Camunda BPM",
  "Alfresco",
  "Microsoft Dynamics CRM",
  "Twilio",
  "OAuth 2.0",
  "AI / LLM integrations",
];

const experiences = [
  {
    date: "JAN 2024 — PRESENT",
    role: "Principal Consultant",
    company: "Systems Limited",
    description:
      "Lead architecture and delivery for enterprise platforms, ERP, and workflow applications. Drive emerging-technology POCs; define microservices, data schemas, and integrations; own Azure infrastructure; and lead engineering practices and CI/CD with DevOps.",
    tags: "AZURE · ERP · MICROSERVICES · CAMUNDA · ALFRESCO",
  },
  {
    date: "JAN 2023 — DEC 2023",
    role: "Senior Software Consultant",
    company: "Systems Limited",
    description:
      "Delivered enterprise features across distributed systems, mentored engineers, and contributed to architectural decisions, sprint planning, and technical estimates.",
  },
  {
    date: "OCT 2021 — DEC 2022",
    role: "Development Consultant",
    company: "Systems Limited",
    description:
      "Designed backend services and scalable APIs with Node.js and microservices patterns, collaborating with QA and DevOps on performance and production stability.",
  },
  {
    date: "JUN 2020 — OCT 2021",
    role: "Software Engineer",
    company: "Daniotech",
    description:
      "Built real-time collaboration with Socket.IO, Firebase authentication and notifications, analytics, and Electron desktop applications.",
  },
  {
    date: "OCT 2019 — MAY 2020",
    role: "Software Engineer",
    company: "Softnotechs",
    description:
      "Customized POS software, built PHP and AngularJS applications, published Android apps, and delivered WordPress websites.",
  },
  {
    date: "JAN 2018 — MAR 2020",
    role: "Co-Founder & Web Developer",
    company: "Grab a Bite",
    description:
      "Co-founded a startup, built its web platform from scratch, and contributed to architecture, customer relationships, and daily operations.",
  },
  {
    date: "OCT 2016 — APR 2017",
    role: "Software Developer",
    company: "Atlantic Software",
    description:
      "Developed ActionScript 3 games and supported QA for PHP enterprise applications.",
  },
  {
    date: "JUN 2015 — AUG 2015",
    role: "Internee",
    company: "Systems Limited",
    description:
      "Worked with Microsoft Dynamics CRM to map campus management software in collaboration with the Dynamics team.",
  },
];

const projects = [
  {
    number: "01",
    name: "SimplyCharge",
    description: "Project website.",
    url: "https://simplycharge.info/",
    action: "Visit project",
    category: "SIMPLYCHARGE.INFO",
    kind: "orbit",
  },
  {
    number: "02",
    name: "FashionPedia Dashboard",
    description: "Dashboard project.",
    url: "https://dashboard.fashionspedia.com",
    action: "Visit dashboard",
    category: "DASHBOARD.FASHIONSPEDIA.COM",
    kind: "fashion",
  },
  {
    number: "03",
    name: "Descon tender bidding app",
    description: "Bidding and tender web app built for Descon.",
    url: "https://www.descon.com/",
    action: "Visit Descon",
    category: "TENDER · BIDDING",
    kind: "descon",
  },
];

const navigation = [
  ["Technologies", "#technologies"],
  ["Projects", "#work"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
    document.documentElement.classList.add("has-js");

    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    const heroElements = document.querySelectorAll<HTMLElement>(".hero .reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("has-js");
    }

    heroElements.forEach((element) => element.classList.add("is-visible"));
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-js");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Usama Ahmed, home">
          UA<span>.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-availability" href="#contact" onClick={() => setMenuOpen(false)}>
            <span />
            Punjab, Pakistan
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow reveal">
              <span className="eyebrow-dot" /> Principal Engineer · Punjab, Pakistan
            </p>
            <h1 className="hero-title reveal">
              Building the
              <br />
              systems behind
              <br />
              <span className="title-accent">
                what’s <span className="serif-word">next.</span>
              </span>
            </h1>
            <p className="hero-description reveal">
              I’m <strong>Usama Ahmed</strong>, a Principal Engineer and Enterprise Systems Architect with 9+ years
              of experience taking complex platforms from idea to production.
            </p>
            <p className="hero-description hero-description-secondary reveal">
              Azure cloud · Microservices · ERP · Workflow automation · AI integrations
            </p>
            <div className="hero-actions reveal">
              <a className="button button-dark" href="#experience">
                Explore my experience <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href="#contact">
                Get in touch <ExternalArrow />
              </a>
            </div>
          </div>

          <div
            className="hero-art reveal"
            aria-label="Abstract blue illustration representing connected systems"
            role="img"
          >
            <div className="art-grid" />
            <div className="art-sun" />
            <div className="art-orbit art-orbit-one" />
            <div className="art-orbit art-orbit-two" />
            <div className="art-asterisk" aria-hidden="true">
              ✳
            </div>
            <div className="art-caption">
              <span>ARCHITECTURE · DELIVERY</span>
              <span>✳ 01 / 03</span>
            </div>
            <div className="art-sticker">
              <span>
                Ideas to
                <br />
                production.
              </span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>

          <a className="scroll-cue" href="#work">
            <span /> Scroll to explore
          </a>
          <span className="hero-index" aria-hidden="true">
            PORTFOLIO&nbsp; — &nbsp;{year}
          </span>
        </section>

        <section className="technologies section-wrap" id="technologies">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Tools I’ve worked with</p>
              <h2>
                Technology, <span className="serif-word">in practice</span>
                <span className="heading-period">.</span>
              </h2>
            </div>
            <p className="section-note">
              A hands-on toolkit shaped by building
              <br />
              and supporting real products.
            </p>
          </div>
          <div className="technology-grid">
            {technologies.map(([name, icon]) => (
              <div className="technology-card reveal" key={name}>
                <span className="technology-icon">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="technology-tags reveal" aria-label="Additional tools and platforms">
            {additionalTools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Where I create the most impact</p>
              <h2>
                Selected <span className="serif-word">projects</span>
                <span className="heading-period">.</span>
              </h2>
            </div>
            <p className="section-note">
              A few platforms I’ve worked on
              <br />
              across different industries.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card reveal transition-transform duration-300 hover:-translate-y-1${index === 0 ? " project-card-wide" : ""}`}
                key={project.number}
              >
                <div className={`project-visual visual-${project.kind}`}>
                  <span className="project-number">{project.number}</span>
                  {project.kind === "orbit" && (
                    <>
                      <div className="orbit-mark" aria-hidden="true">
                        <span />
                        <i />
                      </div>
                      <span className="visual-label">SimplyCharge</span>
                    </>
                  )}
                  {project.kind === "fashion" && (
                    <>
                      <div className="coral-type">
                        Fashions
                        <br />
                        <span>pedia</span>
                      </div>
                      <span className="coral-circle" aria-hidden="true">
                        project
                        <br />
                        dashboard
                      </span>
                    </>
                  )}
                  {project.kind === "descon" && (
                    <div className="lime-window">
                      <div className="window-top">
                        <span />
                        <span />
                        <span />
                        <b>descon · tenders</b>
                      </div>
                      <div className="window-content">
                        <span>
                          TENDER
                          <br />
                          BIDDING
                          <br />
                          <i>PLATFORM.</i>
                        </span>
                        <b aria-hidden="true">✳</b>
                      </div>
                    </div>
                  )}
                  <a
                    className="project-arrow"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${project.name}`}
                  >
                    <ExternalArrow />
                  </a>
                </div>
                <div className="project-meta">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a className="project-visit" href={project.url} target="_blank" rel="noreferrer">
                      {project.action} <ExternalArrow />
                    </a>
                  </div>
                  <span className="project-category">{project.category}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="project-disclaimer">
            The Descon link opens the company website; the tender app does not have a separate public link.
          </p>
        </section>

        <section className="about" id="about">
          <div className="about-inner section-wrap">
            <div className="about-kicker reveal">
              <span className="about-star" aria-hidden="true">
                ✳
              </span>
              <p>How I work</p>
            </div>
            <div className="about-copy reveal">
              <h2>
                I turn complex requirements into systems that are{" "}
                <span className="serif-word">scalable,</span> dependable, and ready for what’s next.
              </h2>
              <p>
                As a Principal Consultant, I drive technical strategy, lead R&amp;D and proof-of-concept initiatives,
                and mentor engineers. I partner with product, DevOps, and stakeholders from architecture and database
                design through CI/CD, cloud infrastructure, and production support.
              </p>
              <a className="text-link text-link-light" href="#experience">
                Explore my career <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="about-bottom reveal">
              <span>TECHNICAL STRATEGY · HANDS-ON ENGINEERING · TEAM LEADERSHIP</span>
              <span>IDEA&nbsp; → &nbsp;ARCHITECTURE&nbsp; → &nbsp;PRODUCTION</span>
            </div>
          </div>
        </section>

        <section className="experience section-wrap" id="experience">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">A career in building what’s next</p>
              <h2>
                Experience &amp; <span className="serif-word">education</span>
                <span className="heading-period">.</span>
              </h2>
            </div>
            <p className="section-note">
              More than nine years across enterprise
              <br />
              software, products, and platforms.
            </p>
          </div>
          <div className="experience-layout">
            <div className="timeline">
              {experiences.map((experience) => (
                <article className="timeline-entry reveal" key={experience.date}>
                  <span className="timeline-date">{experience.date}</span>
                  <div>
                    <h3>
                      {experience.role} <span>· {experience.company}</span>
                    </h3>
                    <p>{experience.description}</p>
                    {experience.tags && <span className="timeline-tags">{experience.tags}</span>}
                  </div>
                </article>
              ))}
            </div>
            <aside className="credentials reveal">
              <div className="credential-block">
                <p className="eyebrow">Education</p>
                <h3>BS, Computer Science</h3>
                <p>
                  Sir Syed CASE Institute of Technology
                  <br />
                  2012 — 2016
                </p>
              </div>
              <div className="credential-block">
                <p className="eyebrow">Certification</p>
                <h3>Big Data Certified</h3>
              </div>
              <div className="credential-block">
                <p className="eyebrow">Top skills</p>
                <div className="skill-pills">
                  {["System Architecture", "Microservices", "ERP Software", "Azure", "AI / LLM", "Technical Leadership"].map(
                    (skill) => (
                      <span key={skill}>{skill}</span>
                    ),
                  )}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-top reveal">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> Open to a conversation?
            </p>
            <span className="contact-index">05 — SAY HELLO</span>
          </div>
          <div className="contact-main reveal">
            <h2>
              Let’s build
              <br />
              something <span className="serif-word">lasting.</span>
            </h2>
            <a className="contact-link" href="mailto:usama.ahmed41@gmail.com" aria-label="Email Usama Ahmed">
              <span>usama.ahmed41@gmail.com</span>
              <span className="contact-link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <footer className="site-footer">
            <a className="wordmark footer-mark" href="#home">
              UA<span>.</span>
            </a>
            <p>Usama Ahmed · Principal Engineer</p>
            <div className="footer-links" aria-label="Social profiles">
              <a
                className="social-icon-link"
                href="https://www.linkedin.com/in/usamaahmed-aa3931100"
                target="_blank"
                rel="noreferrer"
                aria-label="Usama Ahmed on LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" />
                </svg>
              </a>
              <a
                className="social-icon-link"
                href="https://github.com/usamabutt4504780"
                target="_blank"
                rel="noreferrer"
                aria-label="Usama Ahmed on GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.63 10.63 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.62 5.23-5.11 5.5.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>
            </div>
            <span className="copyright">© {year} USAMA AHMED</span>
          </footer>
        </section>
      </main>
    </>
  );
}
