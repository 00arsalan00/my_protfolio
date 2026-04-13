// Basic config you can customize
const CONFIG = {
    name: "Mohammad Arsalan Rayeen",
    github: "https://github.com/00arsalan00",
    linkedin: "https://www.linkedin.com/in/mohammad-arsalan-rayeen-8416a4320/",
    email: "2k23.psitaiml2311749@gmail.com",
    resume: "./main.pdf",
    leetcode: "https://leetcode.com/u/MohammadArsalanRayeen/",
    readme: "https://github.com/00arsalan00", // profile README
    profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQGgZIDW_gJD7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722352555272?e=2147483647&v=beta&t=cbZXaRggLxFlm4h-MNG4Qpy3F5zbq_ib4qVB2kU3j_Y"

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

const loadingScreen = document.getElementById("loading-screen");
const loadingTextEl = document.getElementById("loading-text");
const knightFrameEl = document.getElementById("knight-frame");

// Command history
let history = [];
let historyIndex = -1;

// Loading bar frames
const knightFrames = [
    '■■■■□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□ 10%',
    '■■■■■■■■■■■■□□□□□□□□□□□□□□□□□□□□□□□□□□□□ 30%',
    '■■■■■■■■■■■■■■■■■■■■□□□□□□□□□□□□□□□□□□□□ 50%',
    '■■■■■■■■■■■■■■■■■■■■■■■■■■■■□□□□□□□□□□□□ 70%',
    '■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 100%'
];

// FIX: removed the duplicate top-level setInterval that polluted the console

// Loading sequence messages — FIX: removed "games" from modules list
const loadingLines = [
    "Initializing portfolio environment...",
    "Loading modules: about, skills, projects, blog...",
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
                "about, skills, projects",
                "certifications, certifications &lt;index&gt;",
                "blog, blog &lt;index&gt;",
                "github, linkedin,leetcode, email, resume, readme",
                "quote, hadith",
                "ls, sudo, clear",
                "color, color &lt;id&gt;",
                "weather &lt;city&gt;",
                "photo, links"
            ].join("<br>")
        );
    },

    about() {
        appendLine(
            `Assalamu Alaikum, this is <span class="success">${CONFIG.name}</span>, a passionate developer who loves clean code, problem solving, and building useful tools.`
        );
        appendLine(
            "Comfortable with Java Backend development, competitive programming, and always exploring new technologies."
        );
    },

    skills() {
        appendLine("Tech stack:", "list-title");
        appendLine(
            [
                "- Backend &amp; Databases: Java, Spring Boot, REST APIs, MySQL, PostgreSQL, JPA/Hibernate",
                "- Languages: C / C++ (Basic), Java, Python, JavaScript (Basic)",
                "- Tools: Git, GitHub, JUnit, Mockito, Docker, H2, Render",
                "- Core CS: Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems, Computer Organization",
                "- AI / ML Fundamentals: Supervised and Unsupervised Learning, Regression and Classification, Model Evaluation (Precision / Recall, F1-Score, Bias-Variance Tradeoff), Basic NLP Concepts"
            ].join("<br>")
        );
    },

    projects() {
        appendLine("Highlighted projects:", "list-title");
        appendLine(
            [
                "1. Expense Tracker Application (Production Deployed Backend API) – JWT-secured Spring Boot REST API for expense management with analytics, PostgreSQL integration, Dockerization, and cloud deployment.",
                "2. Terminal Portfolio – This interactive Linux-style terminal portfolio.",
                "3. Ticket Booking Backend – Simple Java backend for train ticket booking."
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

    leetcode() {
        window.open(CONFIG.leetcode, "_blank");
        appendLine("Opening Leetcode...", "info");
    },

    email() {
        window.location.href = `mailto:${CONFIG.email}`;
        appendLine("Opening default mail client...", "info");
    },

    resume() {
        window.open(CONFIG.resume, "_blank");
        appendLine("Opening resume PDF...", "info");
    },

    // FIX: added missing `readme` command (was listed in help but never defined)
    readme() {
        window.open(CONFIG.readme, "_blank");
        appendLine("Opening GitHub README...", "info");
    },

    // FIX: added missing `photo` command (was listed in ls but never defined)
    photo() {
        appendLine("Profile photo:", "list-title");
        const div = document.createElement("div");
        div.className = "line photo-block";
        const container = document.createElement("div");
        container.className = "photo-container";
        const img = document.createElement("img");
        img.src = CONFIG.profilePhoto;   // FIX: now uses CONFIG.profilePhoto instead of hardcoded URL
        img.alt = `Profile photo of ${CONFIG.name}`;
        container.appendChild(img);
        div.appendChild(container);
        terminalBody.appendChild(div);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    },

    // FIX: added missing `links` command (was listed in ls but never defined)
    links() {
        appendLine("Quick links:", "list-title");
        appendLine(
            [
                `- GitHub:   <a href="${CONFIG.github}" target="_blank" style="color:inherit">${CONFIG.github}</a>`,
                `- LinkedIn: <a href="${CONFIG.linkedin}" target="_blank" style="color:inherit">${CONFIG.linkedin}</a>`,
                `- Email:    <a href="mailto:${CONFIG.email}" style="color:inherit">${CONFIG.email}</a>`
            ].join("<br>")
        );
    },

    quote() {
        const quotes = [
            "\u201cFirst, solve the problem. Then, write the code.\u201d \u2013 John Johnson",
            "\u201cPrograms must be written for people to read, and only incidentally for machines to execute.\u201d \u2013 Harold Abelson",
            "\u201cSimplicity is the soul of efficiency.\u201d \u2013 Austin Freeman",
            "\u201cTalk is cheap. Show me the code.\u201d \u2013 Linus Torvalds"
        ];
        appendLine(quotes[Math.floor(Math.random() * quotes.length)]);
    },

    hadith() {
        const hadithList = [
            "\u201cThe best among you are those who have the best manners and character.\u201d",
            "\u201cAllah loves that when any one of you does a job, he should perfect it.\u201d",
            "\u201cMake things easy and do not make them difficult, give glad tidings and do not cause people to run away.\u201d"
        ];
        appendLine(hadithList[Math.floor(Math.random() * hadithList.length)]);
    },

    // FIX: certifications now shows a list when called with no args, matching the pattern of blog
    certifications(args) {
        const certs = [
            {
                title: "Udemy Java and its Framework Course",
                content:
                    "Hands-on experience with Spring and Spring Boot, building REST APIs, implementing JWT authentication, working with PostgreSQL, following clean layered architecture, Spring AI and GenAI.",
                image: "certs/java.jpg"
            },
            {
                title: "HackerRank SQL Basic Certification",
                content: "Basic concepts of SQL and its queries.",
                image: "certs/img19.jpg"
            },
            {
                title: "PostMan Api Testing",
                content: "Basic concepts of Api and ApiTesting .",
                image: "certs/api_test.jpg"
            }
        ];

        // No args → show list (consistent with `blog` behavior)
        if (!args || !args.length) {
            appendLine("Certifications:", "list-title");
            const lines = certs.map((c, i) => `${i + 1}. ${c.title}`);
            appendLine(lines.join("<br>"));
            appendLine("Use <span class='success'>certifications &lt;index&gt;</span> to view details.");
            return;
        }

        const index = parseInt(args[0], 10);
        if (isNaN(index) || index < 1 || index > certs.length) {
            appendLine(`Invalid index. Use <span class='success'>certifications</span> to list all.`, "error");
            return;
        }

        const cert = certs[index - 1];
        appendLine(`<span class="list-title">${cert.title}</span>`);
        appendLine(cert.content);

        if (cert.image) {
            const img = document.createElement("img");
            img.src = cert.image;
            img.style.maxWidth = "260px";
            img.style.marginTop = "8px";
            img.style.border = "1px solid #00ff88";
            img.alt = cert.title;
            terminalBody.appendChild(img);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else {
            appendLine("<div class='muted'>No certificate preview available.</div>");
        }
    },

    blog(args) {
        const posts = [
            {
                title: "Lessons from Competitive Programming",
                content:
                    "Discussing patterns, problem-solving mindset, and how CP improved my approach to real-world bugs."
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

        if (!args || !args.length) {
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
        appendLine("sudo: permission denied. This is a read-only portfolio system.", "error");
    },

    // FIX: ls output now matches actual available commands (removed games/docs, theme→color, added links/photo)
    ls() {
        appendLine(
            [
                "about/  skills/  projects/  blog/  certifications/",
                "links/  photo/  color/  weather/  resume/"
            ].join("<br>")
        );
    },

    clear() {
        terminalBody.innerHTML = "";
    },

    // FIX: renamed internally consistent — help refers to "color", ls shows "color/", command is "color"
    color(args) {
        if (!args || !args.length) {
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
            appendLine("Unknown theme id. Use <span class='success'>color</span> to list themes.", "error");
            return;
        }
        applyTheme(theme.className);
        localStorage.setItem("terminal-theme", theme.className);
        appendLine(`Theme switched to: ${theme.name}`, "success");
    },

    async weather(args) {
        if (!args || !args.length) {
            appendLine(
                "Usage: weather &lt;city&gt;<br>Example: weather London",
                "info"
            );
            return;
        }
        const city = args.join(" ");
        const url = `https://wttr.in/${encodeURIComponent(city)}?0QT&m`;
        appendLine(`Fetching weather for ${city}...`, "info");
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Network error");
            const text = await res.text();
            appendLine(`<pre>${escapeHtml(text)}</pre>`);
        } catch (e) {
            appendLine("Failed to fetch weather. Please try again later.", "error");
        }
    }
};

// Apply theme
function applyTheme(className) {
    themes.forEach(t => terminal.classList.remove(t.className));
    if (className) terminal.classList.add(className);
}

// Escape HTML
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Command execution
// FIX: removed dead `game review` special-case that referenced a non-existent function
function runCommand(raw) {
    const inputText = raw.trim();
    if (!inputText) {
        appendLine("");
        return;
    }

    appendLine(
        `<span class="command-line">arsalan@portfolio:~$ ${escapeHtml(inputText)}</span>`
    );

    history.push(inputText);
    historyIndex = history.length;

    const [cmd, ...args] = inputText.split(" ");
    const normalized = cmd.toLowerCase();

    const fn = commands[normalized];
    if (!fn) {
        appendLine(`Command not found: ${escapeHtml(cmd)}. Type <span class='success'>help</span> for available commands.`, "error");
        return;
    }
    fn(args);
}

// Autocomplete
const commandNames = Object.keys(commands);

function autocomplete(current) {
    if (!current) return "";
    const matches = commandNames.filter(c => c.startsWith(current));
    if (matches.length === 1) return matches[0] + " ";
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

// Focus input when clicking terminal
terminal.addEventListener("click", () => input.focus());

// Loading animation
function typeLoadingLines(idx = 0) {
    if (idx >= loadingLines.length) return;
    let i = 0;
    const line = loadingLines[idx];
    const interval = setInterval(() => {
        loadingTextEl.textContent += line[i];
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