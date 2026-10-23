/**
 * Dinesh Kumar Yadav - Portfolio AI Assistant Chatbot
 * Intelligent Intent Matching, Quick Doubt Chips, Mobile Responsive, Sound Chimes
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Knowledge Base & Predefined Responses
  // ---------------------------------------------------------------------------
  // Dynamic base path for root vs sub-pages (/projects/ or /experience/)
  const isSubPage = window.location.pathname.includes('/projects/') || window.location.pathname.includes('/experience/');
  const BASE_PREFIX = isSubPage ? '../' : './';

  const DINESH_INFO = {
    name: "Dinesh Kumar Yadav",
    role: "Data Scientist, Backend Developer & AI/ML Engineer",
    education: "B.Tech in Computer Science and Engineering (2024 – 2028) at Acharya Narendra Deva University of Agriculture & Technology (ANDUAT) / MCAET Ayodhya (CGPA: 7.5/10).",
    location: "Varanasi, Uttar Pradesh, India",
    email: "dineshkumaryadav12651@outlook.com",
    phone: "+91 95552 40369",
    resumeUrl: BASE_PREFIX + "assets/resume/Dinesh_Kumar_Yadav_Resume.pdf",
    avatarUrl: BASE_PREFIX + "assets/images/hero.webp",
    avatarFallback: BASE_PREFIX + "assets/images/profile.jpg",
    projectsUrl: BASE_PREFIX + "projects/index.html",
    linkedin: "https://www.linkedin.com/in/dinesh-kumar-yadav-9555dd8114",
    github: "https://github.com/DineshYadav06",
    leetcode: "https://leetcode.com/u/DineshYadav06/"
  };

  const QUICK_QUESTIONS = [
    { id: "skills", label: "💼 Core Skills & Tech", icon: "fa-code" },
    { id: "research", label: "🔬 SIU Research Internships", icon: "fa-microscope" },
    { id: "projects", label: "🚀 Top AI & Web Projects", icon: "fa-laptop-code" },
    { id: "resume", label: "📄 Download Resume", icon: "fa-file-pdf" },
    { id: "sih", label: "🏆 SIH Hackathon Leadership", icon: "fa-trophy" },
    { id: "backend", label: "⚡ FastAPI & Backend Architecture", icon: "fa-server" },
    { id: "education", label: "🎓 Education & CGPA", icon: "fa-graduation-cap" },
    { id: "contact", label: "📞 How to Contact / Hire", icon: "fa-envelope" }
  ];

  const INTENTS = [
    {
      id: "skills",
      keywords: ["skill", "skills", "tech", "technology", "stack", "language", "python", "fastapi", "tools", "framework", "kya aata hai"],
      reply: `
        <p>Here is a breakdown of <strong>Dinesh's Core Technical Stack</strong>:</p>
        <ul>
          <li><strong>Languages:</strong> Python, SQL, C++, C, JavaScript</li>
          <li><strong>Data Science & AI/ML:</strong> PyTorch, TensorFlow, Keras, Scikit-learn, OpenCV, Pandas, NumPy, Jupyter</li>
          <li><strong>GenAI & LLMs:</strong> RAG (Retrieval-Augmented Generation), LangChain, Vector Embeddings, Prompt Engineering</li>
          <li><strong>Backend & APIs:</strong> FastAPI, RESTful APIs, PostgreSQL, MongoDB, MySQL, Docker, Firebase</li>
          <li><strong>DevOps & Tools:</strong> Docker, Git, GitHub, Postman, Linux</li>
        </ul>
        <p>Would you like to explore his <strong>projects</strong> or <strong>research work</strong>?</p>
      `,
      chips: ["projects", "research", "resume"]
    },
    {
      id: "research",
      keywords: ["research", "internship", "intern", "siu", "symbiosis", "quantum", "medical", "segmentation", "meibomian"],
      reply: `
        <p>Dinesh completed <strong>two high-impact research internships</strong> at <strong>Symbiosis International University (SIU)</strong>:</p>
        <ul>
          <li><strong>Quantum Machine Learning (QML):</strong> Explored quantum algorithms, parameterized quantum circuits, and hybrid classical-quantum models for complex optimization.</li>
          <li><strong>Medical Image Segmentation:</strong> Developed deep learning computer vision architectures (UNet / CNNs) for precise <em>Meibomian Gland Segmentation</em> in ophthalmic diagnostics.</li>
        </ul>
        <p>Both internships emphasized rigorous mathematical formulation, ML preprocessing, and experimental validation.</p>
      `,
      chips: ["skills", "projects", "resume"]
    },
    {
      id: "projects",
      keywords: ["project", "projects", "work", "portfolio", "built", "mcaet", "app", "website", "chatbot", "emotion"],
      reply: `
        <p>Dinesh has engineered several live production & AI systems:</p>
        <ul>
          <li><strong>MCAET College Info Assistant:</strong> RAG-based AI chatbot indexing college syllabi, exam schedules, and admissions queries.</li>
          <li><strong>MCAET College Website:</strong> Official production website (<a href="https://mcaet.vercel.app/" target="_blank" class="cb-link-btn" style="padding:0.2rem 0.6rem;font-size:1.15rem;">Visit Site</a>).</li>
          <li><strong>MCAET Online Exam Portal:</strong> Active examination platform (<a href="https://mcaetexamportal.vercel.app/" target="_blank" class="cb-link-btn" style="padding:0.2rem 0.6rem;font-size:1.15rem;">Visit Portal</a>).</li>
          <li><strong>Facial Emotion Recognition:</strong> Real-time deep learning computer vision system achieving <strong>89% accuracy</strong>.</li>
          <li><strong>Cattle Breed Classifier:</strong> Deep learning model for livestock recognition.</li>
          <li><strong>FarmRentHub / BhoomiDrishti:</strong> AgriTech equipment rental & crop advisory platform with FastAPI & Next.js.</li>
        </ul>
        <a href="${DINESH_INFO.projectsUrl}" class="cb-link-btn"><i class="fas fa-external-link-alt"></i> View All Projects</a>
      `,
      chips: ["backend", "resume", "contact"]
    },
    {
      id: "resume",
      keywords: ["resume", "cv", "biodata", "download", "pdf", "resume link"],
      reply: `
        <p>You can directly view and download Dinesh's latest <strong>Data Science & AI Engineer Resume</strong> below:</p>
        <p style="margin:0.8rem 0;">
          <a href="${DINESH_INFO.resumeUrl}" target="_blank" class="cb-link-btn" download="Dinesh_Kumar_Yadav_Resume.pdf">
            <i class="fas fa-download"></i> Download Resume (PDF)
          </a>
          <a href="${DINESH_INFO.resumeUrl}" target="_blank" class="cb-link-btn">
            <i class="fas fa-eye"></i> View in Tab
          </a>
        </p>
        <p>Feel free to reach out directly if you have any open roles or opportunities!</p>
      `,
      chips: ["contact", "skills", "sih"]
    },
    {
      id: "sih",
      keywords: ["sih", "hackathon", "smart india", "lead", "leadership", "team lead", "competition"],
      reply: `
        <p>🏆 <strong>Smart India Hackathon (SIH) Leadership:</strong></p>
        <p>Dinesh was selected <strong>twice as SIH Team Lead</strong> at the institute level (<strong>SIH 2025 & SIH 2026</strong>).</p>
        <ul>
          <li>Led cross-functional teams of software engineers, AI researchers, and designers.</li>
          <li>Designed system architectures for national problem statements covering agriculture and automation.</li>
          <li>Managed end-to-end delivery under tight hackathon deadlines.</li>
        </ul>
      `,
      chips: ["projects", "skills", "contact"]
    },
    {
      id: "backend",
      keywords: ["backend", "fastapi", "api", "rest", "database", "postgres", "docker", "server", "architecture"],
      reply: `
        <p>⚡ <strong>Backend Development Expertise:</strong></p>
        <ul>
          <li><strong>Frameworks:</strong> FastAPI (async high-performance endpoints, Pydantic validation, OpenAPI specs).</li>
          <li><strong>Databases:</strong> PostgreSQL, MongoDB, MySQL, Redis caching.</li>
          <li><strong>Architecture:</strong> Modular clean architecture, repository patterns, JWT authentication, rate limiting.</li>
          <li><strong>DevOps:</strong> Docker containerization, cloud deployment, Postman API testing.</li>
        </ul>
        <p>Dinesh builds backend services that seamlessly bridge heavy ML models with lightning-fast APIs.</p>
      `,
      chips: ["skills", "projects", "contact"]
    },
    {
      id: "education",
      keywords: ["education", "college", "degree", "btech", "b.tech", "cgpa", "university", "school", "anduat", "ayodhya"],
      reply: `
        <p>🎓 <strong>Educational Background:</strong></p>
        <ul>
          <li><strong>B.Tech in Computer Science and Engineering</strong> (Aug 2024 – May 2028)<br>
          <em>Acharya Narendra Deva University of Agriculture & Technology (ANDUAT) / MCAET Ayodhya, UP</em><br>
          <strong>CGPA: 7.5 / 10</strong></li>
          <li><strong>Intermediate (12th PCM):</strong> Phoolpatti Inter College, Bhadohi, UP (2022 – 2024)</li>
          <li><strong>High School (10th Science):</strong> Phoolpatti Inter College, Bhadohi, UP (2020 – 2022)</li>
        </ul>
      `,
      chips: ["research", "skills", "resume"]
    },
    {
      id: "contact",
      keywords: ["contact", "hire", "email", "phone", "whatsapp", "call", "reach", "message", "freelance", "job", "interview", "connect"],
      reply: `
        <p>📬 <strong>Get in Touch with Dinesh:</strong></p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:${DINESH_INFO.email}" style="color:#38bdf8;">${DINESH_INFO.email}</a></li>
          <li><strong>Phone:</strong> <a href="tel:${DINESH_INFO.phone}" style="color:#38bdf8;">${DINESH_INFO.phone}</a></li>
          <li><strong>Location:</strong> Varanasi, Uttar Pradesh, India</li>
        </ul>
        <p style="margin-top:0.8rem;">
          <a href="${DINESH_INFO.linkedin}" target="_blank" rel="noopener" class="cb-link-btn"><i class="fab fa-linkedin"></i> LinkedIn</a>
          <a href="${DINESH_INFO.github}" target="_blank" rel="noopener" class="cb-link-btn"><i class="fab fa-github"></i> GitHub</a>
        </p>
        <p style="margin-top:0.6rem;">He is actively open for <strong>AI/ML Engineering roles, Data Science internships, and Backend development</strong>.</p>
      `,
      chips: ["resume", "projects", "skills"]
    },
    {
      id: "about_me",
      keywords: ["who", "who is", "dinesh", "about", "bio", "intro", "introduction", "tell me about", "kon ho"],
      reply: `
        <p>👋 <strong>Dinesh Kumar Yadav</strong> is a dedicated <strong>Data Scientist and Backend Developer</strong> focused on <em>Machine Learning, Deep Learning, and Generative AI</em>.</p>
        <ul>
          <li><strong>Research:</strong> 2 research internships at <em>Symbiosis International University (SIU)</em> in Quantum ML and Medical Imaging.</li>
          <li><strong>Leadership:</strong> 2x Smart India Hackathon (SIH) Team Lead.</li>
          <li><strong>Engineering:</strong> Creator of live production systems like the <em>MCAET College Portal</em> and RAG Assistant.</li>
        </ul>
        <p>What specific aspect would you like to know more about?</p>
      `,
      chips: ["skills", "research", "projects", "resume"]
    },
    {
      id: "greetings",
      keywords: ["hi", "hello", "hey", "namaste", "hola", "greetings", "good morning", "good evening", "kaise ho"],
      reply: `
        <p>👋 Hello there! Welcome to Dinesh's Portfolio!</p>
        <p>I am Dinesh's interactive <strong>AI Assistant</strong>. I can answer any questions regarding his <strong>Data Science background</strong>, <strong>Backend projects</strong>, <strong>SIU research</strong>, or provide his <strong>Resume</strong>.</p>
        <p>How can I help you today?</p>
      `,
      chips: ["skills", "projects", "research", "resume"]
    },
    {
      id: "thanks",
      keywords: ["thank", "thanks", "dhanyawad", "shukriya", "great", "awesome", "good", "nice", "cool"],
      reply: `
        <p>You're very welcome! 😊 Glad I could help.</p>
        <p>If you'd like to collaborate or chat with Dinesh directly, you can drop him an email or download his resume anytime.</p>
        <a href="mailto:${DINESH_INFO.email}" class="cb-link-btn"><i class="fas fa-envelope"></i> Send an Email</a>
      `,
      chips: ["resume", "contact", "projects"]
    }
  ];

  // ---------------------------------------------------------------------------
  // Sound Synthesis (Web Audio API - No external assets needed)
  // ---------------------------------------------------------------------------
  let soundEnabled = true;
  function playChime(type) {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'incoming') {
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'outgoing') {
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // AudioContext policy or unsupported, fail silently
    }
  }

  // ---------------------------------------------------------------------------
  // DOM Elements Construction
  // ---------------------------------------------------------------------------
  function buildChatbotDOM() {
    if (document.getElementById("chatbot-launcher")) return;

    // Floating Tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "cb-tooltip";
    tooltip.id = "chatbot-tooltip";
    tooltip.innerHTML = `Chat with Dinesh's AI <span style="color:#38bdf8;">👋</span>`;
    document.body.appendChild(tooltip);

    // Floating Launcher Button
    const launcher = document.createElement("button");
    launcher.id = "chatbot-launcher";
    launcher.setAttribute("aria-label", "Open Dinesh's AI Assistant");
    launcher.innerHTML = `
      <i class="fas fa-robot cb-icon-open"></i>
      <i class="fas fa-times cb-icon-close"></i>
      <span class="cb-badge" id="cb-badge">1</span>
    `;
    document.body.appendChild(launcher);

    // Chatbot Window
    const windowEl = document.createElement("div");
    windowEl.id = "chatbot-window";
    windowEl.setAttribute("role", "dialog");
    windowEl.setAttribute("aria-label", "Dinesh's AI Assistant Chat Window");
    windowEl.innerHTML = `
      <!-- Header -->
      <div class="cb-header">
        <div class="cb-header-left">
          <div class="cb-avatar-wrap">
            <img src="${DINESH_INFO.avatarUrl}" alt="Dinesh AI" onerror="this.src='${DINESH_INFO.avatarFallback}'">
            <span class="cb-status-dot"></span>
          </div>
          <div class="cb-header-info">
            <h4>Dinesh AI <i class="fas fa-sparkles cb-sparkle"></i></h4>
            <p>Data Science & Backend Assistant</p>
          </div>
        </div>
        <div class="cb-header-actions">
          <button class="cb-btn-icon" id="cb-btn-sound" title="Toggle Sound">
            <i class="fas fa-volume-up"></i>
          </button>
          <button class="cb-btn-icon" id="cb-btn-clear" title="Clear Chat">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button class="cb-btn-icon" id="cb-btn-close" title="Minimize Chat">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Messages Body -->
      <div class="cb-body" id="cb-messages">
        <!-- Messages will be injected dynamically -->
      </div>

      <!-- Typing Indicator -->
      <div class="cb-typing-indicator" id="cb-typing">
        <span class="cb-typing-dot"></span>
        <span class="cb-typing-dot"></span>
        <span class="cb-typing-dot"></span>
      </div>

      <!-- Footer / Input -->
      <form class="cb-footer" id="cb-form">
        <div class="cb-input-wrap">
          <input type="text" class="cb-input" id="cb-input" placeholder="Ask about skills, projects, resume..." autocomplete="off">
        </div>
        <button type="submit" class="cb-send-btn" id="cb-send-btn" aria-label="Send message">
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    `;
    document.body.appendChild(windowEl);

    // Initial greeting after DOM attached
    initChatbotEvents(launcher, windowEl, tooltip);
  }

  // ---------------------------------------------------------------------------
  // Event Handlers & State
  // ---------------------------------------------------------------------------
  function initChatbotEvents(launcher, chatWindow, tooltip) {
    const messagesEl = document.getElementById("cb-messages");
    const inputEl = document.getElementById("cb-input");
    const formEl = document.getElementById("cb-form");
    const typingEl = document.getElementById("cb-typing");
    const badgeEl = document.getElementById("cb-badge");
    const closeBtn = document.getElementById("cb-btn-close");
    const clearBtn = document.getElementById("cb-btn-clear");
    const soundBtn = document.getElementById("cb-btn-sound");

    let isChatOpen = false;

    // Show tooltip after 2.5s
    setTimeout(() => {
      if (!isChatOpen && tooltip) {
        tooltip.classList.add("visible");
        setTimeout(() => tooltip.classList.remove("visible"), 6000);
      }
    }, 2500);

    function toggleChat(open) {
      isChatOpen = typeof open === "boolean" ? open : !isChatOpen;
      if (isChatOpen) {
        chatWindow.classList.add("active");
        launcher.classList.add("active");
        if (badgeEl) badgeEl.style.display = "none";
        if (tooltip) tooltip.classList.remove("visible");
        setTimeout(() => inputEl.focus(), 300);
        scrollToBottom();
      } else {
        chatWindow.classList.remove("active");
        launcher.classList.remove("active");
      }
    }

    launcher.addEventListener("click", () => toggleChat());
    closeBtn.addEventListener("click", () => toggleChat(false));

    // Sound toggle
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      const icon = soundBtn.querySelector("i");
      if (soundEnabled) {
        icon.className = "fas fa-volume-up";
        playChime("incoming");
      } else {
        icon.className = "fas fa-volume-mute";
      }
    });

    // Clear chat
    clearBtn.addEventListener("click", () => {
      messagesEl.innerHTML = "";
      // Mobile Virtual Keyboard Handling
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        if (window.innerWidth <= 600 && isChatOpen) {
          chatWindow.style.height = `${window.visualViewport.height}px`;
          scrollToBottom();
        }
      });
    }
    renderWelcomeMessage();
    });

    // Form submit
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = "";
      handleUserMessage(text);
    });

    function scrollToBottom() {
      setTimeout(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }, 50);
    }

    function getTimeString() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Append Message to UI
    function appendMessage(sender, htmlContent) {
      const msgDiv = document.createElement("div");
      msgDiv.className = `cb-message ${sender}`;
      msgDiv.innerHTML = `
        <div class="cb-msg-bubble">${htmlContent}</div>
        <span class="cb-msg-time">${getTimeString()}</span>
      `;
      messagesEl.appendChild(msgDiv);
      scrollToBottom();
    }

    // Render Quick Question Chips
    function appendChips(chipIds) {
      const chipsWrapper = document.createElement("div");
      chipsWrapper.className = "cb-chips-wrapper";
      chipsWrapper.innerHTML = `
        <span class="cb-chips-title">Frequent Topics:</span>
        <div class="cb-chips-container"></div>
      `;
      const container = chipsWrapper.querySelector(".cb-chips-container");

      const chipsToRender = chipIds && chipIds.length > 0
        ? QUICK_QUESTIONS.filter(q => chipIds.includes(q.id))
        : QUICK_QUESTIONS.slice(0, 5);

      chipsToRender.forEach(q => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "cb-chip";
        chip.innerHTML = `<i class="fas ${q.icon}"></i> ${q.label}`;
        chip.addEventListener("click", () => {
          handleChipClick(q);
        });
        container.appendChild(chip);
      });

      messagesEl.appendChild(chipsWrapper);
      scrollToBottom();
    }

    function renderWelcomeMessage() {
      const welcomeHTML = `
        <p>👋 <strong>Welcome to Dinesh Kumar Yadav's Portfolio!</strong></p>
        <p>I am Dinesh's AI Assistant. You can ask me about his <strong>Data Science</strong> &amp; <strong>Backend</strong> experience, research at <strong>Symbiosis (SIU)</strong>, projects, or request his resume.</p>
        <p>Tap any topic below to get started instantly:</p>
      `;
      appendMessage("bot", welcomeHTML);
      appendChips(["skills", "research", "projects", "resume", "sih", "backend", "contact"]);
    }

    // Chip click handler
    function handleChipClick(chipObj) {
      appendMessage("user", chipObj.label);
      playChime("outgoing");
      triggerBotResponse(chipObj.id, chipObj.label);
    }

    // User message handler
    function handleUserMessage(query) {
      appendMessage("user", query);
      playChime("outgoing");
      triggerBotResponse(null, query);
    }

    // Bot Response Logic with Typing Simulation
    function triggerBotResponse(intentId, queryText) {
      typingEl.classList.add("active");
      scrollToBottom();

      const delay = Math.min(800, Math.max(350, queryText.length * 15));

      setTimeout(() => {
        typingEl.classList.remove("active");
        const responseData = matchIntent(intentId, queryText);
        appendMessage("bot", responseData.reply);
        playChime("incoming");

        if (responseData.chips && responseData.chips.length > 0) {
          appendChips(responseData.chips);
        }
      }, delay);
    }

    // Matching Algorithm
    function matchIntent(explicitId, text) {
      if (explicitId) {
        const matched = INTENTS.find(i => i.id === explicitId);
        if (matched) return matched;
      }

      const cleanText = text.toLowerCase().trim();

      // Check greetings first
      if (/^(hi|hello|hey|namaste|hola|good\s*(morning|afternoon|evening))\b/i.test(cleanText)) {
        return INTENTS.find(i => i.id === "greetings");
      }

      // Score-based intent matching
      let bestMatch = null;
      let highestScore = 0;

      INTENTS.forEach(intent => {
        let score = 0;
        intent.keywords.forEach(kw => {
          if (cleanText.includes(kw)) {
            score += kw.length; // weight longer keyword matches higher
          }
        });
        if (score > highestScore) {
          highestScore = score;
          bestMatch = intent;
        }
      });

      if (bestMatch && highestScore > 0) {
        return bestMatch;
      }

      // Fallback
      return {
        reply: `
          <p>I want to make sure I get you the best answer! Here are the main areas I can tell you about:</p>
          <ul>
            <li><strong>Data Science &amp; AI:</strong> Deep Learning, Computer Vision, RAG architectures</li>
            <li><strong>Backend Architecture:</strong> FastAPI, REST APIs, PostgreSQL, Docker</li>
            <li><strong>SIU Research:</strong> Quantum ML &amp; Medical Image Segmentation</li>
            <li><strong>Resume:</strong> Download Dinesh's latest verified resume</li>
          </ul>
          <p>You can also reach out to Dinesh directly via <a href="mailto:${DINESH_INFO.email}" style="color:#38bdf8;">Email</a> or <a href="tel:${DINESH_INFO.phone}" style="color:#38bdf8;">Phone</a>.</p>
        `,
        chips: ["skills", "projects", "resume", "contact"]
      };
    }

    // Render first welcome message
    // Mobile Virtual Keyboard Handling
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        if (window.innerWidth <= 600 && isChatOpen) {
          chatWindow.style.height = `${window.visualViewport.height}px`;
          scrollToBottom();
        }
      });
    }
    renderWelcomeMessage();
  }

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildChatbotDOM);
  } else {
    buildChatbotDOM();
  }

})();
