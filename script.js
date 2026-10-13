const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (!(menuToggle instanceof HTMLButtonElement) || !(siteNav instanceof HTMLElement)) {
  throw new Error("The navigation menu could not be initialized.");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (!(event.target instanceof Element) || !event.target.closest("a")) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  siteNav.classList.remove("is-open");
});

const year = document.querySelector("#year");
const currentYear = String(new Date().getFullYear());
if (year) year.textContent = currentYear;

const portfolioYear = document.querySelector("#portfolio-year");
if (portfolioYear) portfolioYear.textContent = currentYear;

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroRevealElements = document.querySelectorAll(".hero .reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  heroRevealElements.forEach((element) => element.classList.add("is-visible"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("is-visible")) revealObserver.observe(element);
  });
}

const employerGrid = document.querySelector(".employer-grid");
if (employerGrid instanceof HTMLElement) {
  employerGrid.addEventListener("pointerover", (event) => {
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest(".employer-card");
    if (!(card instanceof HTMLElement) || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
    const toggle = card.querySelector(".employer-card-front");
    const details = card.querySelector(".employer-card-details");
    if (!(toggle instanceof HTMLButtonElement) || !(details instanceof HTMLElement)) return;
    card.classList.remove("is-dismissed");
    card.classList.add("is-hovered", "is-active");
    toggle.setAttribute("aria-expanded", "true");
    details.setAttribute("aria-hidden", "false");
  });

  employerGrid.addEventListener("pointerout", (event) => {
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest(".employer-card");
    if (!(card instanceof HTMLElement) || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
    const toggle = card.querySelector(".employer-card-front");
    const details = card.querySelector(".employer-card-details");
    if (!(toggle instanceof HTMLButtonElement) || !(details instanceof HTMLElement)) return;
    card.classList.remove("is-hovered");
    card.classList.remove("is-dismissed");
    const isActive = card.classList.contains("is-open") || card.classList.contains("is-focused");
    card.classList.toggle("is-active", isActive);
    toggle.setAttribute("aria-expanded", String(isActive));
    details.setAttribute("aria-hidden", String(!isActive));
  });

  employerGrid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const closeButton = event.target.closest(".employer-close");
    if (closeButton instanceof HTMLButtonElement) {
      const card = closeButton.closest(".employer-card");
      const toggle = card?.querySelector(".employer-card-front");
      const details = card?.querySelector(".employer-card-details");
      if (!(card instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement) || !(details instanceof HTMLElement)) return;
      card.classList.remove("is-open", "is-focused");
      card.classList.add("is-dismissed");
      const isActive = false;
      card.classList.toggle("is-active", isActive);
      toggle.setAttribute("aria-expanded", String(isActive));
      details.setAttribute("aria-hidden", String(!isActive));
      return;
    }
    const toggle = event.target.closest(".employer-card-front");
    if (!(toggle instanceof HTMLButtonElement)) return;
    const card = toggle.closest(".employer-card");
    const details = card?.querySelector(".employer-card-details");
    if (!(card instanceof HTMLElement) || !(details instanceof HTMLElement)) return;
    card.classList.remove("is-dismissed");
    const isOpen = card.classList.toggle("is-open");
    card.classList.remove("is-focused");
    const isActive = isOpen || card.classList.contains("is-hovered");
    card.classList.toggle("is-active", isActive);
    toggle.setAttribute("aria-expanded", String(isActive));
    details.setAttribute("aria-hidden", String(!isActive));
  });

  employerGrid.addEventListener("focusin", (event) => {
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest(".employer-card");
    const toggle = card?.querySelector(".employer-card-front");
    const details = card?.querySelector(".employer-card-details");
    if (!(card instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement) || !(details instanceof HTMLElement)) return;
    card.classList.remove("is-dismissed");
    card.classList.add("is-focused", "is-active");
    toggle.setAttribute("aria-expanded", "true");
    details.setAttribute("aria-hidden", "false");
  });

  employerGrid.addEventListener("focusout", (event) => {
    if (!(event.target instanceof Element) || !(event.target.closest(".employer-card") instanceof HTMLElement)) return;
    const card = event.target.closest(".employer-card");
    if (!(card instanceof HTMLElement) || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
    const toggle = card.querySelector(".employer-card-front");
    const details = card.querySelector(".employer-card-details");
    if (!(toggle instanceof HTMLButtonElement) || !(details instanceof HTMLElement)) return;
    card.classList.remove("is-focused");
    const isOpen = card.classList.contains("is-open");
    card.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    details.setAttribute("aria-hidden", String(!isOpen));
  });
}

const characterStage = document.querySelector(".character-scene");
const characterCanvas = characterStage?.querySelector(".character-canvas");
const twinChat = document.querySelector(".twin-chat");
const characterFallback = characterStage?.querySelector(".character-fallback");

if (
  characterStage instanceof HTMLElement &&
  characterCanvas instanceof HTMLElement &&
  twinChat instanceof HTMLElement
) {
  const questionAnswers = {
    role: {
      question: "What do you do?",
      answer: "I’m a Principal Engineer and Enterprise Systems Architect. I lead the architecture and delivery of enterprise platforms, ERP, and workflow applications, from early technical decisions through production.",
    },
    projects: {
      question: "What kind of work have you led?",
      answer: "I’ve worked across enterprise platforms, ERP and workflow systems, real-time collaboration products, and a tender-bidding application. My work often brings together architecture, integrations, cloud infrastructure, and hands-on delivery.",
    },
    technology: {
      question: "What technologies do you work with?",
      answer: "My toolkit includes Azure and AWS, Node.js, React, Vue, Angular, SQL and NoSQL databases, Camunda, Alfresco, Firebase, Socket.IO, and AI/LLM integrations, alongside PHP and Electron.",
    },
    leadership: {
      question: "How do you lead a team?",
      answer: "I set a clear technical direction, stay close to implementation, and collaborate with product, DevOps, and stakeholders. I also mentor engineers and help teams build dependable delivery practices.",
    },
  };
  const transcript = twinChat.querySelector("#twin-messages");
  const voiceControl = twinChat.querySelector("#twin-voice-control");
  const voiceStatus = twinChat.querySelector("#twin-voice-status");
  let characterWaveUntil = 0;
  let selectedAnswer = "";
  let activeUtterance = null;

  const stopAnswer = () => {
    activeUtterance = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (voiceControl instanceof HTMLButtonElement) {
      voiceControl.disabled = !selectedAnswer;
      voiceControl.innerHTML = '<span aria-hidden="true">▶</span> Replay answer';
    }
    if (voiceStatus instanceof HTMLElement) voiceStatus.textContent = "Browser voice · not a voice clone";
  };

  const speakAnswer = (text) => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      if (voiceStatus instanceof HTMLElement) voiceStatus.textContent = "Voice playback isn’t available in this browser";
      if (voiceControl instanceof HTMLButtonElement) voiceControl.disabled = true;
      return;
    }

    activeUtterance = null;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.96;
    utterance.pitch = 1.02;
    const englishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("en"));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.onstart = () => {
      if (activeUtterance !== utterance) return;
      if (voiceControl instanceof HTMLButtonElement) {
        voiceControl.disabled = false;
        voiceControl.innerHTML = '<span aria-hidden="true">Ⅱ</span> Stop voice';
      }
      if (voiceStatus instanceof HTMLElement) voiceStatus.textContent = "Speaking with your browser’s voice";
    };
    utterance.onend = () => {
      if (activeUtterance !== utterance) return;
      activeUtterance = null;
      if (voiceControl instanceof HTMLButtonElement) {
        voiceControl.disabled = false;
        voiceControl.innerHTML = '<span aria-hidden="true">▶</span> Replay answer';
      }
      if (voiceStatus instanceof HTMLElement) voiceStatus.textContent = "Browser voice · not a voice clone";
    };
    utterance.onerror = (event) => {
      if (activeUtterance !== utterance || event.error === "canceled" || event.error === "interrupted") return;
      activeUtterance = null;
      if (voiceControl instanceof HTMLButtonElement) {
        voiceControl.disabled = false;
        voiceControl.innerHTML = '<span aria-hidden="true">▶</span> Replay answer';
      }
      if (voiceStatus instanceof HTMLElement) voiceStatus.textContent = "Voice playback failed. Try again.";
    };
    activeUtterance = utterance;
    if (voiceControl instanceof HTMLButtonElement) voiceControl.disabled = false;
    if (voiceStatus instanceof HTMLElement) voiceStatus.textContent = "Browser voice · not a voice clone";
    window.speechSynthesis.speak(utterance);
  };

  voiceControl?.addEventListener("click", () => {
    if (activeUtterance && "speechSynthesis" in window && window.speechSynthesis.speaking) stopAnswer();
    else if (selectedAnswer) speakAnswer(selectedAnswer);
  });
  window.addEventListener("pagehide", () => {
    activeUtterance = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  });

  const addTranscriptMessage = (role, text) => {
    if (!(transcript instanceof HTMLElement)) return;
    const message = document.createElement("div");
    message.className = `twin-message${role === "visitor" ? " twin-message-visitor" : ""}`;
    if (role === "assistant") {
      const avatar = document.createElement("span");
      avatar.className = "twin-avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = "UA";
      message.appendChild(avatar);
    }
    const copy = document.createElement("div");
    copy.className = "twin-message-copy";
    if (role === "assistant") {
      const speaker = document.createElement("p");
      speaker.className = "twin-speaker";
      speaker.textContent = "USAMA’S DIGITAL TWIN";
      copy.appendChild(speaker);
    }
    const content = document.createElement("p");
    content.className = role === "visitor" ? "twin-question" : "twin-response";
    content.textContent = text;
    copy.appendChild(content);
    message.appendChild(copy);
    transcript.appendChild(message);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  };

  twinChat.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest(".twin-prompt");
    if (!(button instanceof HTMLButtonElement)) return;
    const response = questionAnswers[button.dataset.question];
    if (!response) return;
    selectedAnswer = response.answer;
    if (voiceControl instanceof HTMLButtonElement) voiceControl.disabled = false;
    addTranscriptMessage("visitor", response.question);
    addTranscriptMessage("assistant", response.answer);
    twinChat.querySelectorAll(".twin-prompt").forEach((prompt) => {
      prompt.setAttribute("aria-pressed", String(prompt === button));
      prompt.classList.toggle("is-selected", prompt === button);
    });
    characterWaveUntil = performance.now() + 1800;
    speakAnswer(response.answer);
  });

  const initializeCharacter = async () => {
    let THREE;
    try {
      THREE = await import("https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js");
    } catch (error) {
      console.error("The Three.js character module could not be loaded.", error);
      if (characterFallback instanceof HTMLElement) characterFallback.hidden = false;
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.12, 9.2);
    camera.lookAt(0, 0.05, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch (error) {
      console.error("The Three.js character could not initialize WebGL.", error);
      if (characterFallback instanceof HTMLElement) characterFallback.hidden = false;
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(characterCanvas.clientWidth, characterCanvas.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    characterCanvas.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight("#d1fae5", "#14221e", 2.1));
    const keyLight = new THREE.DirectionalLight("#f3f4f6", 3.2);
    keyLight.position.set(-3.5, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight("#10b981", 28, 12);
    rimLight.position.set(2.5, 1.6, -2.2);
    scene.add(rimLight);

    const material = (color, metalness, roughness) =>
      new THREE.MeshStandardMaterial({ color, metalness, roughness });
    const suit = material("#9ca3af", 0.22, 0.34);
    const shadow = material("#4b5563", 0.24, 0.36);
    const blue = material("#10b981", 0.55, 0.27);
    const blueDark = material("#12352d", 0.38, 0.34);
    const glow = new THREE.MeshStandardMaterial({
      color: "#d1fae5",
      emissive: "#10b981",
      emissiveIntensity: 2.8,
      roughness: 0.2,
    });
    const visor = new THREE.MeshPhysicalMaterial({
      color: "#111827",
      metalness: 0.45,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const sphere = new THREE.SphereGeometry(1, 28, 20);
    const capsule = new THREE.CapsuleGeometry(0.13, 0.38, 5, 12);
    const addMesh = (parent, geometry, finish, position, scale = [1, 1, 1]) => {
      const mesh = new THREE.Mesh(geometry, finish);
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      parent.add(mesh);
      return mesh;
    };

    const starPositions = new Float32Array(210 * 3);
    for (let i = 0; i < 210; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 8.5;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      starPositions[i * 3 + 2] = -1.5 - Math.random() * 3;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: "#6ee7b7", size: 0.018, transparent: true, opacity: 0.72 }),
    );
    scene.add(stars);

    const orbit = addMesh(
      scene,
      new THREE.TorusGeometry(1.75, 0.008, 6, 120),
      new THREE.MeshBasicMaterial({ color: "#10b981", transparent: true, opacity: 0.3 }),
      [0, 0.04, -0.8],
      [1, 1.15, 1],
    );
    orbit.rotation.z = -0.26;
    const farOrbit = addMesh(
      scene,
      new THREE.TorusGeometry(2.08, 0.006, 6, 120),
      new THREE.MeshBasicMaterial({ color: "#9ca3af", transparent: true, opacity: 0.16 }),
      [0, 0.04, -1.1],
      [1, 0.78, 1],
    );
    farOrbit.rotation.z = 0.3;
    const platform = addMesh(
      scene,
      new THREE.TorusGeometry(0.86, 0.013, 8, 90),
      new THREE.MeshBasicMaterial({ color: "#10b981", transparent: true, opacity: 0.62 }),
      [0, -1.51, 0],
    );
    platform.rotation.x = -0.12;

    const character = new THREE.Group();
    character.position.y = -0.05;
    scene.add(character);
    const torso = new THREE.Group();
    character.add(torso);
    addMesh(torso, new THREE.CapsuleGeometry(0.43, 0.57, 7, 16), suit, [0, 0.02, 0], [1, 1, 0.82]);
    addMesh(torso, new THREE.CylinderGeometry(0.17, 0.19, 0.2, 18), shadow, [0, 0.46, 0]);
    addMesh(torso, sphere, blue, [0, 0.3, 0.39], [0.17, 0.12, 0.06]);
    addMesh(torso, new THREE.BoxGeometry(0.43, 0.3, 0.055), blueDark, [0, 0.05, 0.345]);
    addMesh(torso, new THREE.BoxGeometry(0.21, 0.045, 0.025), glow, [0, 0.11, 0.38]);
    for (const x of [-0.11, 0, 0.11]) addMesh(torso, sphere, glow, [x, -0.02, 0.382], [0.024, 0.024, 0.024]);
    addMesh(torso, new THREE.BoxGeometry(0.27, 0.07, 0.04), shadow, [0, -0.48, 0.14]);

    const head = new THREE.Group();
    head.position.set(0, 0.98, 0);
    character.add(head);
    addMesh(head, sphere, suit, [0, 0, 0], [0.53, 0.59, 0.47]);
    addMesh(head, sphere, visor, [0, -0.04, 0.403], [0.39, 0.285, 0.13]);
    const trim = addMesh(head, new THREE.TorusGeometry(0.33, 0.027, 8, 48), blue, [0, -0.04, 0.5], [1, 0.76, 1]);
    trim.rotation.z = Math.PI;
    for (const x of [-0.125, 0.125]) addMesh(head, sphere, glow, [x, 0.005, 0.526], [0.035, 0.047, 0.02]);
    const smile = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.065, -0.13, 0.53),
      new THREE.Vector3(0, -0.158, 0.54),
      new THREE.Vector3(0.065, -0.13, 0.53),
    ]);
    const smileMesh = addMesh(head, new THREE.TubeGeometry(smile, 12, 0.012, 6, false), glow, [0, 0, 0]);
    const speakingMouth = addMesh(head, sphere, visor, [0, -0.14, 0.54], [0.075, 0.018, 0.018]);
    speakingMouth.visible = false;
    addMesh(head, new THREE.CylinderGeometry(0.018, 0.024, 0.16, 10), blue, [0.03, 0.61, 0]);
    addMesh(head, sphere, glow, [0.03, 0.7, 0], [0.052, 0.052, 0.052]);
    let waveArm;
    for (const side of [-1, 1]) {
      addMesh(head, sphere, shadow, [side * 0.48, 0.02, 0], [0.06, 0.06, 0.06]);
      addMesh(torso, sphere, suit, [side * 0.23, -0.54, 0.01], [0.11, 0.11, 0.11]);
      const arm = new THREE.Group();
      arm.position.set(side * 0.52, 0.3, 0);
      torso.add(arm);
      addMesh(arm, sphere, blue, [0, 0, 0], [0.18, 0.17, 0.16]);
      addMesh(arm, capsule, suit, [side * 0.035, -0.29, 0]);
      addMesh(arm, sphere, shadow, [side * 0.075, -0.55, 0], [0.11, 0.11, 0.11]);
      addMesh(arm, new THREE.CapsuleGeometry(0.105, 0.28, 5, 12), suit, [side * 0.08, -0.76, 0]);
      addMesh(arm, sphere, suit, [side * 0.09, -0.97, 0.02], [0.13, 0.1, 0.115]);
      addMesh(arm, sphere, glow, [side * 0.09, -0.97, 0.13], [0.04, 0.032, 0.02]);
      if (side === 1) waveArm = arm;
      addMesh(character, new THREE.CapsuleGeometry(0.16, 0.46, 5, 12), blueDark, [side * 0.23, -0.77, 0]);
      addMesh(character, sphere, suit, [side * 0.23, -1.12, 0.1], [0.24, 0.12, 0.3]);
      addMesh(character, new THREE.BoxGeometry(0.1, 0.045, 0.025), glow, [side * 0.23, -1.11, 0.28]);
    }

    const pointerTarget = new THREE.Vector2();
    let elapsed = 0;
    let previousTime = 0;
    let animationFrame = 0;
    let inView = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = characterStage.getBoundingClientRect();
      pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.55;
      pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.3;
      characterStage.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      characterStage.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };
    const onPointerLeave = () => {
      pointerTarget.set(0, 0);
      characterStage.style.setProperty("--pointer-x", "50%");
      characterStage.style.setProperty("--pointer-y", "50%");
    };
    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = characterCanvas;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
    const render = (time) => {
      animationFrame = 0;
      if (!inView || document.visibilityState !== "visible") return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      elapsed += delta;
      if (!reducedMotion) {
        character.position.y = -0.05 + Math.sin(elapsed * 1.35) * 0.045;
        character.rotation.y += (pointerTarget.x - character.rotation.y) * 0.045;
        character.rotation.x += (pointerTarget.y - character.rotation.x) * 0.045;
        head.rotation.y += (pointerTarget.x * 0.55 - head.rotation.y) * 0.06;
        head.rotation.x += (-pointerTarget.y * 0.45 - head.rotation.x) * 0.06;
        const speaking = "speechSynthesis" in window && window.speechSynthesis.speaking;
        smileMesh.visible = !speaking;
        speakingMouth.visible = speaking;
        speakingMouth.scale.y = speaking ? 0.025 + Math.abs(Math.sin(elapsed * 15)) * 0.065 : 0.018;
        if (time < characterWaveUntil) waveArm.rotation.z = 2.3 + Math.sin(elapsed * 13) * 0.24;
        else waveArm.rotation.z += (Math.sin(elapsed * 1.2) * 0.035 - waveArm.rotation.z) * 0.08;
        stars.rotation.z = elapsed * 0.012;
      }
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };
    const startRendering = () => {
      if (animationFrame || !inView || document.visibilityState !== "visible") return;
      previousTime = 0;
      animationFrame = requestAnimationFrame(render);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startRendering();
      else if (animationFrame) cancelAnimationFrame(animationFrame);
    });
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") startRendering();
      else if (animationFrame) cancelAnimationFrame(animationFrame);
    };
    characterStage.addEventListener("pointermove", onPointerMove);
    characterStage.addEventListener("pointerleave", onPointerLeave);
    resizeObserver.observe(characterCanvas);
    visibilityObserver.observe(characterStage);
    document.addEventListener("visibilitychange", onVisibilityChange);
  };

  initializeCharacter();
}
