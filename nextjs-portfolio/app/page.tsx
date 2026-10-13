"use client";

import { useEffect, useRef, useState } from "react";
import ThreeCharacter from "./three-character";

const technologies = [
  ["Microsoft Azure", "azure/azure-original.svg"],
  ["Node.js", "nodejs/nodejs-original.svg"],
  ["Socket.IO", "socketio/socketio-original.svg"],
  ["Firebase", "firebase/firebase-plain.svg"],
  ["Electron", "electron/electron-original.svg"],
  ["React", "react/react-original.svg"],
  ["Vue", "vuejs/vuejs-original.svg"],
  ["AWS", "amazonwebservices/amazonwebservices-original-wordmark.svg"],
  ["PHP", "php/php-original.svg"],
  ["Angular", "angular/angular-original.svg"],
  ["WordPress", "wordpress/wordpress-original.svg"],
];

const additionalTools = [
  "SQL & NoSQL databases",
  "Camunda BPM",
  "Alfresco",
  "Twilio",
  "OAuth 2.0",
];

type Project = {
  name: string;
  number: string;
  category: string;
  description: string;
  technologies: string[];
  url?: string;
  previewUrl?: string;
  visual: "simply-charge" | "qoplan" | "stza" | "descon";
};

const projects: Project[] = [
  {
    number: "01",
    name: "Simply Charge",
    category: "EV charging · Mobile product",
    description:
      "A product for EV users to find nearby or destination chargers, check live status, and control charging through a mobile app or RFID card.",
    technologies: ["Mobile Apps", "Maps & Location", "EV Charging"],
    url: "https://simplycharge.info",
    previewUrl: "https://simplycharge.info",
    visual: "simply-charge",
  },
  {
    number: "02",
    name: "QoPlan",
    category: "Productivity · Mobile apps",
    description:
      "A free calendar-sharing app by Vanilla Technology for organizing social events, combining schedules, and managing RSVPs.",
    technologies: ["iOS", "Android", "Calendar & RSVP"],
    url: "https://qoplan.app/Home",
    previewUrl: "https://qoplan.app/Home",
    visual: "qoplan",
  },
  {
    number: "03",
    name: "STZA One Window Portal",
    category: "Government · Regulatory platform",
    description:
      "A unified digital portal for technology-zone companies, startups, and developers to apply for licenses and manage regulatory compliance.",
    technologies: ["Government", "Licensing", "Compliance"],
    url: "https://www.stza.gov.pk/",
    visual: "stza",
  },
  {
    number: "04",
    name: "Descon Bidding",
    category: "Internal product · Project planning",
    description:
      "An internal application for estimating project timelines, budgets, and resources ahead of delivery to make project transitions smoother.",
    technologies: ["Project Estimation", "Planning", "Resource Management"],
    url: "https://www.descon.com/",
    visual: "descon",
  },
];

type Employer = {
  number: string;
  name: string;
  monogram: string;
  period: string;
  arrangement: string;
  roles: Array<[string, string]>;
  highlights: string[];
  url?: string;
};

const employers: Employer[] = [
  {
    number: "01",
    name: "Systems Limited",
    monogram: "SL",
    period: "2021 — PRESENT",
    arrangement: "Full-time · Hybrid",
    roles: [
      ["Principal Consultant", "Jan 2024 — Present"],
      ["Senior Software Consultant", "Jan 2023 — Dec 2023"],
      ["Development Consultant", "Oct 2021 — Dec 2022"],
      ["Internee", "Jun 2015 — Aug 2015"],
    ],
    highlights: [
      "Lead architecture and development of enterprise ERP and workflow platforms.",
      "Design microservices, database schemas, system integrations, and Azure infrastructure.",
      "Deliver Camunda BPM workflows, Alfresco document management, and emerging-technology POCs.",
      "Guide code reviews, engineering practices, CI/CD, technical estimates, and engineer mentorship.",
      "Integrate Twilio, Firebase, Google APIs, and OAuth2 SSO, including Apple, Google, and Outlook sign-in.",
    ],
    url: "https://www.linkedin.com/company/15350/",
  },
  {
    number: "02",
    name: "Daniotech",
    monogram: "D",
    period: "JUN 2020 — OCT 2021",
    arrangement: "Full-time · Pakistan",
    roles: [["Software Engineer", "Jun 2020 — Oct 2021"]],
    highlights: [
      "Built real-time collaboration features with Socket.IO.",
      "Implemented Firebase authentication, notifications, push messaging, and analytics.",
      "Developed Electron desktop apps for time and activity tracking.",
      "Contributed to QA, release validation, and cross-functional delivery.",
    ],
  },
  {
    number: "03",
    name: "Softnotechs",
    monogram: "S",
    period: "OCT 2019 — MAY 2020",
    arrangement: "Full-time · Hybrid",
    roles: [["Software Engineer", "Oct 2019 — May 2020"]],
    highlights: [
      "Customized and enhanced point-of-sale systems with PHP and AngularJS.",
      "Developed and published Android apps using Java, Firebase Cloud Messaging, and ad integrations.",
      "Built WordPress websites for business clients.",
      "Managed mobile app delivery from research through Play Store release.",
    ],
  },
  {
    number: "04",
    name: "Grab a Bite",
    monogram: "GB",
    period: "JAN 2018 — MAR 2020",
    arrangement: "Co-founder · Self-employed",
    roles: [["Co-Founder & Web Developer", "Jan 2018 — Mar 2020"]],
    highlights: [
      "Co-founded a startup and built its web platform from the ground up.",
      "Designed the system architecture and made hands-on product decisions.",
      "Handled client relationships and supported daily business operations.",
      "Gained end-to-end experience in product development, scaling, and operations.",
    ],
  },
  {
    number: "05",
    name: "Atlantic Software",
    monogram: "AS",
    period: "OCT 2016 — APR 2017",
    arrangement: "Full-time",
    roles: [["Software Developer", "Oct 2016 — Apr 2017"]],
    highlights: [
      "Developed games using ActionScript 3.",
      "Supported QA for PHP enterprise applications.",
      "Worked with cross-functional teams on software delivery and testing.",
    ],
  },
];

function EmployerCard({ employer }: { employer: Employer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isActive = !isDismissed && (isOpen || isHovered || isFocused);
  const detailsId = `employer-details-${employer.number}`;

  return (
    <article
      className={`employer-card${isActive ? " is-active" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        setIsDismissed(false);
        setIsHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        setIsHovered(false);
        setIsDismissed(false);
      }}
      onFocusCapture={() => {
        setIsDismissed(false);
        setIsFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <button
        className="employer-card-front"
        type="button"
        aria-expanded={isActive}
        aria-controls={detailsId}
        onClick={() => {
          setIsDismissed(false);
          setIsFocused(false);
          setIsOpen((open) => !open);
        }}
      >
        <span className="employer-index">{employer.number}</span>
        <span className="employer-monogram" aria-hidden="true">{employer.monogram}</span>
        <span className="employer-front-copy">
          <span className="employer-period">{employer.period}</span>
          <strong>{employer.name}</strong>
          <span>{employer.roles[0][0]}</span>
        </span>
        <span className="employer-open-indicator" aria-hidden="true">+</span>
        <span className="employer-hover-cue">HOVER, TAP OR SELECT TO EXPLORE</span>
      </button>
      <div className="employer-card-details" id={detailsId} aria-hidden={!isActive}>
        <button
          className="employer-close"
          type="button"
          aria-label={`Close ${employer.name} details`}
          onClick={() => {
            setIsDismissed(true);
            setIsFocused(false);
            setIsOpen(false);
          }}
        >
          ×
        </button>
        <div className="employer-details-heading">
          <span>{employer.arrangement}</span>
          <strong>{employer.name}</strong>
        </div>
        <div className="employer-roles">
          {employer.roles.map(([role, dates]) => (
            <span key={role}><strong>{role}</strong><small>{dates}</small></span>
          ))}
        </div>
        <ul>
          {employer.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        {employer.url && (
          <a href={employer.url} target="_blank" rel="noreferrer">
            Company profile <ExternalArrow />
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.previewUrl) {
    const previewHost = new URL(project.previewUrl).hostname;
    return (
      <div className="project-preview-frame">
        <div className="project-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <small>{previewHost}</small>
          <b>LIVE PREVIEW</b>
        </div>
        <iframe
          src={project.previewUrl}
          title={`${project.name} live website preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    );
  }

  if (project.visual === "simply-charge") {
    return (
      <div className="project-illustration project-illustration-simply-charge" aria-label="Illustrative Simply Charge app preview">
        <div className="project-illustration-top"><span>SIMPLY CHARGE / FIND A STATION</span><i /></div>
        <div className="project-map-art">
          <div className="project-map-roads" aria-hidden="true"><i /><i /><i /><i /></div>
          <span className="project-map-pin pin-one">⚡</span><span className="project-map-pin pin-two">⚡</span><span className="project-map-pin pin-three">⚡</span>
          <div className="project-map-info"><small>NEARBY CHARGER</small><strong>Available · 0.8 mi</strong><span>Fast charging · Open now</span></div>
        </div>
        <span className="project-preview-caption">ILLUSTRATIVE PREVIEW · APP REQUIRES SIGN-IN</span>
      </div>
    );
  }

  if (project.visual === "qoplan") {
    return (
      <div className="project-illustration project-illustration-qoplan" aria-label="Illustrative QoPlan calendar app preview">
        <div className="project-illustration-top"><span>QOPLAN / SHARED CALENDAR</span><i /></div>
        <div className="qoplan-calendar">
          <div className="qoplan-calendar-heading"><span>YOUR SCHEDULE</span><strong>October <b>2026</b></strong></div>
          <div className="qoplan-calendar-grid">
            {["M", "T", "W", "T", "F", "S", "S", "28", "29", "30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"].map((day, index) => (
              <span className={index === 16 ? "is-selected" : undefined} key={`${day}-${index}`}>{day}</span>
            ))}
          </div>
          <div className="qoplan-calendar-event"><i /><span><b>Team brunch</b><small>12:30 PM · 6 invited</small></span><strong>RSVP</strong></div>
        </div>
        <span className="project-preview-caption">ILLUSTRATIVE PREVIEW · APP REQUIRES SIGN-IN</span>
      </div>
    );
  }

  return (
    <div className={`project-illustration project-illustration-${project.visual}`} aria-label={`${project.name} illustrative preview`}>
      <div className="project-illustration-top"><span>{project.visual === "stza" ? "STZA / ONE WINDOW" : "PROJECT CONTROL"}</span><i /></div>
      <div className="project-illustration-body">
        <div className="project-illustration-rail"><b /><b /><b /></div>
        <div className="project-illustration-content">
          <span className="project-illustration-kicker">{project.visual === "stza" ? "LICENSING PORTAL" : "BIDDING WORKSPACE"}</span>
          <strong>{project.visual === "stza" ? "One Window Portal" : "Project estimate"}</strong>
          <div className="project-mock-metrics"><span /><span /><span /></div>
          <div className="project-mock-table"><i /><i /><i /><i /></div>
        </div>
      </div>
      <span className="project-preview-caption">
        {project.visual === "stza" ? "ILLUSTRATIVE PREVIEW · NO LIVE EMBED" : "LIVE SITE BLOCKS EMBED · USE LINK BELOW"}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-visual">
        <span className="project-card-index">{project.number}</span>
        <ProjectPreview project={project} />
      </div>
      <div className="project-card-copy">
        <p className="project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        {project.url && (
          <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
            Visit project <ExternalArrow />
          </a>
        )}
      </div>
    </article>
  );
}

const navigation = [
  ["Technologies", "#technologies"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const portfolioQuestions = [
  {
    id: "role",
    question: "What do you do?",
    answer:
      "I’m a Principal Engineer and Enterprise Systems Architect. I lead the architecture and delivery of enterprise platforms, ERP, and workflow applications, from early technical decisions through production.",
  },
  {
    id: "projects",
    question: "What kind of work have you led?",
    answer:
      "I’ve worked across enterprise platforms, ERP and workflow systems, real-time collaboration products, and a tender-bidding application. My work often brings together architecture, integrations, cloud infrastructure, and hands-on delivery.",
  },
  {
    id: "technology",
    question: "What technologies do you work with?",
    answer:
      "My toolkit includes Azure and AWS, Node.js, React, Vue, Angular, SQL and NoSQL databases, Camunda, Alfresco, Firebase, Socket.IO, and AI/LLM integrations, alongside PHP and Electron.",
  },
  {
    id: "leadership",
    question: "How do you lead a team?",
    answer:
      "I set a clear technical direction, stay close to implementation, and collaborate with product, DevOps, and stakeholders. I also mentor engineers and help teams build dependable delivery practices.",
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState(2026);
  const [selectedQuestion, setSelectedQuestion] = useState<(typeof portfolioQuestions)[number] | null>(null);
  const [interactionToken, setInteractionToken] = useState(0);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "speaking" | "error">("idle");
  const [conversationMessages, setConversationMessages] = useState<
    Array<{ role: "assistant" | "visitor"; text: string }>
  >([
    {
      role: "assistant",
      text: "Hey, welcome in. Choose a question and I’ll tell you a little about the work, tools, and teams behind my portfolio.",
    },
  ]);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const cards = document.querySelectorAll<HTMLElement>(".project-card, .employer-card");
    const handlePointerMove = (card: HTMLElement, event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      card.style.setProperty("--tilt-x", `${-y * 4}deg`);
      card.style.setProperty("--tilt-y", `${x * 5}deg`);
    };
    const resetTilt = (card: HTMLElement) => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const move = (event: PointerEvent) => handlePointerMove(card, event);
      const leave = () => resetTilt(card);
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (!transcript) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [conversationMessages]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    [],
  );

  const stopAnswer = () => {
    const audio = audioRef.current;
    audioRef.current = null;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    setVoiceStatus("idle");
  };

  const speakAnswer = (id: string) => {
    stopAnswer();
    const audio = new Audio(`/voice/${id}.wav`);
    audio.preload = "none";
    audio.onplay = () => {
      if (audioRef.current !== audio) return;
      setVoiceStatus("speaking");
    };
    audio.onended = () => {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setVoiceStatus("idle");
    };
    audio.onerror = () => {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setVoiceStatus("error");
    };
    audioRef.current = audio;
    void audio.play().catch(() => {
      if (audioRef.current !== audio) return;
      audioRef.current = null;
      setVoiceStatus("error");
    });
  };

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
          <div className="hero-copy hero-conversation">
            <p className="eyebrow reveal">
              <span className="eyebrow-dot" /> Usama’s digital twin · Ask me about my work
            </p>
            <h1 className="hero-title reveal">
              Let’s talk about
              <br />
              <span className="title-accent">what I <span className="serif-word">build.</span></span>
            </h1>
            <div className="twin-chat reveal" aria-label="Conversation with Usama’s digital twin">
              <div className="twin-messages" ref={transcriptRef} role="log" aria-live="polite" aria-relevant="additions">
                {conversationMessages.map((message, index) => (
                  <div
                    className={`twin-message${message.role === "visitor" ? " twin-message-visitor" : ""}`}
                    key={`${index}-${message.role}`}
                  >
                    {message.role === "assistant" && <span className="twin-avatar" aria-hidden="true">UA</span>}
                    <div className="twin-message-copy">
                      {message.role === "assistant" && <p className="twin-speaker">USAMA’S DIGITAL TWIN</p>}
                      <p className={message.role === "visitor" ? "twin-question" : "twin-response"}>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="twin-prompts" aria-label="Suggested questions">
                <p className="twin-prompt-label">PICK A QUESTION</p>
                {portfolioQuestions.map((item) => (
                  <button
                    className={`twin-prompt${selectedQuestion?.question === item.question ? " is-selected" : ""}`}
                    type="button"
                    key={item.id}
                    aria-pressed={selectedQuestion?.question === item.question}
                    onClick={() => {
                      setSelectedQuestion(item);
                      setVoiceStatus("idle");
                      setConversationMessages((messages) => [
                        ...messages,
                        { role: "visitor", text: item.question },
                        { role: "assistant", text: item.answer },
                      ]);
                      setInteractionToken((token) => token + 1);
                      speakAnswer(item.id);
                    }}
                  >
                    {item.question}<span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              <div className="twin-footer">
                <div className="twin-voice-controls">
                  <button
                    className="twin-voice-button"
                    type="button"
                    disabled={!selectedQuestion}
                    onClick={() => {
                      if (voiceStatus === "speaking") stopAnswer();
                      else if (selectedQuestion) speakAnswer(selectedQuestion.id);
                    }}
                  >
                    <span aria-hidden="true">{voiceStatus === "speaking" ? "Ⅱ" : "▶"}</span>
                    {voiceStatus === "speaking" ? "Stop voice" : "Replay answer"}
                  </button>
                  <span className="twin-voice-note" aria-live="polite">
                    {voiceStatus === "speaking"
                      ? "Playing consistent generated voice"
                      : voiceStatus === "error"
                        ? "Voice playback failed. Try again."
                        : "Consistent generated voice · not a voice clone"}
                  </span>
                </div>
                <a href="#projects">Browse the portfolio <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>

          <ThreeCharacter
            className="reveal"
            interactionToken={interactionToken}
            isSpeaking={voiceStatus === "speaking"}
          />

          <a className="scroll-cue" href="#projects">
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
            <span className="technology-tag-featured">LLM / AI</span>
          </div>
        </section>

        <section className="work section-wrap" id="employers">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">The Companies I Have Worked With</p>
              <h2>
                Companies <span className="serif-word">&amp; roles</span>
                <span className="heading-period">.</span>
              </h2>
            </div>
            <p className="section-note">
              Explore the teams I’ve worked with
              <br />
              and what I contributed.
            </p>
          </div>

          <div className="employer-grid">
            {employers.map((employer) => <EmployerCard employer={employer} key={employer.number} />)}
          </div>
          <p className="employer-hint">
            Hover, tap, or focus a card to explore the roles, teams, and contributions. Selected details stay open until closed.
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
              <a className="text-link text-link-light" href="#projects">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="about-bottom reveal">
              <span>TECHNICAL STRATEGY · HANDS-ON ENGINEERING · TEAM LEADERSHIP</span>
              <span>IDEA&nbsp; → &nbsp;ARCHITECTURE&nbsp; → &nbsp;PRODUCTION</span>
            </div>
          </div>
        </section>

          <section className="work section-wrap projects-section" id="projects">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Selected work · product delivery</p>
              <h2>
                Projects <span className="serif-word">&amp; case studies</span>
                <span className="heading-period">.</span>
              </h2>
            </div>
            <p className="section-note">
              A selection of products and platforms
              <br />
              I’ve helped bring to life.
            </p>
          </div>
          <div className="project-card-grid">
            {projects.map((project) => <ProjectCard project={project} key={project.number} />)}
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
