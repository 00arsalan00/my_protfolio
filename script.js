// Basic config you can customize
const CONFIG = {
    name: "Mohammad Arsalan Rayeen",
    github: "https://github.com/00arsalan00",
    linkedin: "https://www.linkedin.com/in/mohammad-arsalan-rayeen-8416a4320/",
    email: "2k23.psitaiml2311749@gmail.com",
    resume: "link-to-resume.pdf",
    readme: "https://github.com/00arsalan00", // profile README
    profilePhoto: "https://example.com/profile.jpg"
};

// Themes
const themes = [
    { id: 1, name: "Black & Green (default)", className: "theme-default" },
    { id: 2, name: "Black & White", className: "theme-black-white" },
    { id: 3, name: "White & Red", className: "theme-white-red" },
    { id: 4, name: "Dark Yellow & Black", className: "theme-yellow-black" },
    { id: 5, name: "Purple Dream", className: "theme-purple" },
    { id: 6, name: "Cyber Cyan", className: "theme-cyan" },
    { id: 7, name: "Warm Orange", className: "theme-orange" }
];

const terminal = document.getElementById("terminal");
const terminalBody = document.getElementById("terminal-body");
const input = document.getElementById("terminal-input");
const cursor = document.getElementById("cursor");

const loadingScreen = document.getElementById("loading-screen");
const loadingTextEl = document.getElementById("loading-text");
const knightFrameEl = document.getElementById("knight-frame");

// Command history
let history = [];
let historyIndex = -1;

// ASCII knight frames (simple 3-frame animation)
const knightFrames = [
    '■■□□□□□□□□□□□□□□□□□□ 10 %',
    '■■■■■■□□□□□□□□□□□□□□ 30 %',
    '■■■■■■■■■■□□□□□□□□□□ 50%',
    '■■■■■■■■■■■■■■□□□□□□ 70%',
    '■■■■■■■■■■■■■■■■■■■■ 100%'
];
let i = 0;
setInterval(() => {
    console.clear();
    console.log(knightFrames[i]);
    i = (i + 1) % knightFrames.length;
}, 200);
// Loading sequence messages
const loadingLines = [
    "Initializing portfolio environment...",
    "Loading modules: about, skills, projects, blog, games...",
    "Spawning ASCII knight...",
    "Mounting interactive terminal...",
    "Done. Type `help` to begin."
];

// Utility to append lines
function appendLine(html, className = "") {
    const div = document.createElement("div");
    div.className = "line" + (className ? " " + className : "");
    div.innerHTML = html;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Intro after loading
function showIntro() {
    appendLine(`Welcome to ${CONFIG.name}'s terminal portfolio.`, "info");
    appendLine("Type <span class='success'>help</span> to see available commands.", "info");
    appendLine("");
}

// Commands
const commands = {
    help() {
        appendLine("Available commands:", "list-title");
        appendLine(
            [
                "about, skills, projects, certifications, certifications &lt;index&gt",
                "github, linkedin, email, resume, readme",
                "blog, blog &lt;index&gt;",
                "quote, hadith, ls, sudo, clear",
                "color, color &lt;id&gt;, weather &lt;city&gt;"
            ].join("<br>")
        );
    },

    about() {
        appendLine(
            `Assalamu Alaikum, this is <span class="success">${CONFIG.name}</span>, a passionate developer who loves clean code, problem solving, and building useful tools.`,
        );
        appendLine(
            "Comfortable with Java Backend developer, competitive programming, and always exploring new technologies."
        );
    },

    skills() {
        appendLine("Tech stack:", "list-title");
        appendLine(
            [
                "- Backend & Databases: Java, Spring Boot, REST APIs, MySQL, PostgreSQL, JPA/Hibernate",
                "- Languages: C / C++ (Basic), Java, Python, JavaScript (Basic)",
                "- Tools: Git, GitHub, JUnit, Mockito, Docker, H2, Render",
                "- Core CS: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Organization",
                "- AI / ML Fundamentals: Supervised and Unsupervised Learning, Regression and Classification, Model Evaluation(Precision / Recall, F1 - Score, Bias - Variance Tradeoff, Basic NLP Concepts"
            ].join("<br>")
        );
    },

    projects() {
        appendLine("Highlighted projects:", "list-title");
        appendLine(
            [
                "1. Expense Tracker Application (Production Deployed Backend API) – JWT-secured Spring Boot REST API for expense management with analytics, PostgreSQL integration, Dockerization, and cloud deployment.",
                "2. Terminal Portfolio – This interactive Linux‑style terminal portfolio.",
                "3. Ticket Booking Backend - Simple Java Backend for Train Ticket Booking."

            ].join("<br>")
        );
    },




    github() {
        window.open(CONFIG.github, "_blank");
        appendLine("Opening GitHub profile...", "info");
    },

    linkedin() {
        window.open(CONFIG.linkedin, "_blank");
        appendLine("Opening LinkedIn...", "info");
    },

    email() {
        window.location.href = `mailto:${CONFIG.email}`;
        appendLine("Opening default mail client...", "info");
    },

    resume() {
        window.open(CONFIG.resume, "_blank");
        appendLine("Opening resume PDF...", "info");
    },




    quote() {
        const quotes = [
            "“First, solve the problem. Then, write the code.” – John Johnson",
            "“Programs must be written for people to read, and only incidentally for machines to execute.” – Harold Abelson",
            "“Simplicity is the soul of efficiency.” – Austin Freeman",
            "“Talk is cheap. Show me the code.” – Linus Torvalds"
        ];
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        appendLine(q);
    },

    hadith() {
        const hadithList = [
            "“The best among you are those who have the best manners and character.”",
            "“Allah loves that when any one of you does a job, he should perfect it.”",
            "“Make things easy and do not make them difficult, give glad tidings and do not cause people to run away.”"
        ];
        const h = hadithList[Math.floor(Math.random() * hadithList.length)];
        appendLine(h);
    },


    certifications(args) {
        const certs = [
            {
                title: "Udemy Java and its Framwork Course",
                content:
                    "Hands-on experience on Spring and SpringBoot, Building REST APIs using Spring Boot, implementing JWT authentication, working with PostgreSQL,following clean layered architecture, Spring Ai and GenAi",
                image: "certs/java.jpg"
            },
            {
                title: "HackerRank SQL Basic Certification",
                content: "Basic Concepts of SQL and its query",
                image: "certs/img19.jpg"
            },
        ];


        // 📄 INDEX MODE (UPDATED WITH IMAGE)
        const index = parseInt(args[0], 10);
        if (isNaN(index) || index < 1 || index > certs.length) {
            appendLine("Invalid index", "error");
            return;
        }

        const cert = certs[index - 1];

        appendLine(`<span class="list-title">${cert.title}</span>`);
        appendLine(cert.content);

        // ✅ SHOW IMAGE BELOW CONTENT
        if (cert.image) {
            const img = document.createElement("img");
            img.src = cert.image;
            img.style.maxWidth = "260px";
            img.style.marginTop = "8px";
            img.style.border = "1px solid #00ff88";

            terminalBody.appendChild(img);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else {
            appendLine("<div class='muted'>No certificate preview available</div>");
        }
    },

    blog(args) {
        const posts = [
            {
                title: "Lessons from Competitive Programming",
                content:
                    "Discussing patterns, problem‑solving mindset, and how CP improved approach to real‑world bugs."
            },
            {
                title: "Designing a Clean REST API in Spring Boot",
                content:
                    "Thoughts on layered architecture, DTOs vs entities, and keeping controllers thin and services cohesive."
            },
            {
                title: "Building This Terminal Portfolio",
                content:
                    "Notes on state management, keybindings, and making a web terminal feel snappy and fun."
            }
        ];

        if (!args.length) {
            appendLine("Blog posts:", "list-title");
            const lines = posts.map((p, i) => `${i + 1}. ${p.title}`);
            appendLine(lines.join("<br>"));
            appendLine("Use <span class='success'>blog &lt;index&gt;</span> to read a post.");
            return;
        }

        const index = parseInt(args[0], 10);
        if (isNaN(index) || index < 1 || index > posts.length) {
            appendLine("Invalid blog index. Usage: blog &lt;index&gt;", "error");
            return;
        }

        const post = posts[index - 1];
        appendLine(`<span class="list-title">${post.title}</span>`);
        appendLine(post.content);
    },



    sudo() {
        appendLine("sudo: permission denied. This is a read‑only portfolio system.", "error");
    },

    ls() {
        appendLine(
            [
                "about/  skills/  projects/  blog/  games/",
                "links/  theme/  photo/  weather/  docs/"
            ].join("<br>")
        );
    },

    clear() {
        terminalBody.innerHTML = "";
    },

    color(args) {
        if (!args.length) {
            appendLine("Available themes:", "list-title");
            themes.forEach(t => {
                appendLine(`${t.id}. ${t.name}`);
            });
            appendLine("Use <span class='success'>color &lt;id&gt;</span> to switch.");
            return;
        }
        const id = parseInt(args[0], 10);
        const theme = themes.find(t => t.id === id);
        if (!theme) {
            appendLine("Unknown theme id. Use `color` to list themes.", "error");
            return;
        }
        applyTheme(theme.className);
        localStorage.setItem("terminal-theme", theme.className);
        appendLine(`Theme switched to: ${theme.name}`, "success");
    },



    async weather(args) {
        if (!args.length) {
            appendLine(
                "Usage: weather &lt;city&gt;<br>Example: weather London",
                "info"
            );
            return;
        }
        const city = args.join(" ");
        const url = `https://wttr.in/${encodeURIComponent(city)}?0QT&m`;
        appendLine(`Fetching weather for ${city} ...`, "info");
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Network error");
            }
            const text = await res.text();
            appendLine(`<pre>${escapeHtml(text)}</pre>`);
        } catch (e) {
            appendLine("Failed to fetch weather. Please try again later.", "error");
        }
    }
};

// Apply stored theme
function applyTheme(className) {
    themes.forEach(t => terminal.classList.remove(t.className));
    if (className) terminal.classList.add(className);
}

// Escape
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Command execution
function runCommand(raw) {
    const inputText = raw.trim();
    if (!inputText) {
        appendLine("");
        return;
    }

    appendLine(
        `<span class="command-line">arsalan@portfolio:~$ ${escapeHtml(
            inputText
        )}</span>`
    );

    history.push(inputText);
    historyIndex = history.length;

    const [cmd, ...args] = inputText.split(" ");
    const normalized = cmd.toLowerCase();

    if (normalized === "game" && args[0] === "review") {
        commands["game review"](args.slice(1));
        return;
    }

    const fn = commands[normalized];
    if (!fn) {
        appendLine(`Command not found: ${escapeHtml(cmd)}`, "error");
        return;
    }
    fn(args);
}

// Autocomplete
const commandNames = Object.keys(commands);

function autocomplete(current) {
    if (!current) return "";
    const matches = commandNames.filter(c => c.startsWith(current));
    if (matches.length === 1) {
        return matches[0] + " ";
    }
    return "";
}

// Key handling
input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        runCommand(input.value);
        input.value = "";
    } else if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        }
        e.preventDefault();
    } else if (e.key === "ArrowDown") {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            input.value = "";
        }
        e.preventDefault();
    } else if (e.key === "Tab") {
        e.preventDefault();
        const completion = autocomplete(input.value.trim());
        if (completion) input.value = completion;
    } else if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        commands.clear();
    }
});

// Focus input when clicking in terminal
terminal.addEventListener("click", () => {
    input.focus();
});

// Loading animation
function typeLoadingLines(idx = 0) {
    if (idx >= loadingLines.length) {
        return;
    }
    let i = 0;
    const line = loadingLines[idx];
    const interval = setInterval(() => {
        loadingTextEl.textContent = loadingTextEl.textContent + line[i];
        i++;
        if (i >= line.length) {
            clearInterval(interval);
            loadingTextEl.textContent += "\n";
            setTimeout(() => typeLoadingLines(idx + 1), 150);
        }
    }, 30);
}

let knightIndex = 0;
function cycleKnight() {
    knightFrameEl.textContent = knightFrames[knightIndex];
    knightIndex = (knightIndex + 1) % knightFrames.length;
}

// Init
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("terminal-theme") || "theme-default";
    applyTheme(savedTheme);

    typeLoadingLines(0);
    const knightTimer = setInterval(cycleKnight, 350);

    setTimeout(() => {
        clearInterval(knightTimer);
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            showIntro();
        }, 400);
    }, 2500);
});
