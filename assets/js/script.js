$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.length > 1 && $(href).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(href).offset().top,
            }, 500, 'linear');
        }
    });

    $("#contact-form").submit(async function (event) {
        event.preventDefault();
        const form = document.getElementById("contact-form");
        const submitBtn = form.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById("form-status");

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone ? form.phone.value.trim() : "";
        const message = form.message.value.trim();
        const botcheck = form.botcheck ? form.botcheck.checked : false;

        // Anti-spam honeypot
        if (botcheck) return;

        if (!name || !email || !message) {
            if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.style.background = "#fee2e2";
                statusDiv.style.color = "#991b1b";
                statusDiv.textContent = "Please fill in all required fields (Name, Email, Message).";
            }
            return;
        }

        // Disable button & indicate loading state
        submitBtn.disabled = true;
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

        const accessKey = form.access_key ? form.access_key.value : "";

        // If Web3Forms key is still default placeholder, fallback gracefully to mailto
        if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
            if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.style.background = "#fef3c7";
                statusDiv.style.color = "#92400e";
                statusDiv.innerHTML = "Opening your email app... (Add your free key from <a href='https://web3forms.com' target='_blank' style='text-decoration:underline;'>web3forms.com</a> to enable direct background sending).";
            }
            setTimeout(() => {
                window.location.href = `mailto:dineshkumaryadav12651@outlook.com?subject=${encodeURIComponent("Portfolio contact from " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : ""))}`;
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }, 600);
            return;
        }

        try {
            const formData = new FormData(form);
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                form.reset();
                if (statusDiv) {
                    statusDiv.style.display = "block";
                    statusDiv.style.background = "#dcfce7";
                    statusDiv.style.color = "#166534";
                    statusDiv.textContent = "Thank you! Your message has been sent successfully. I will get back to you soon.";
                }
            } else {
                throw new Error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Web3Forms error:", error);
            if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.style.background = "#fee2e2";
                statusDiv.style.color = "#991b1b";
                statusDiv.textContent = "Could not send directly. Opening your email app instead...";
            }
            setTimeout(() => {
                window.location.href = `mailto:dineshkumaryadav12651@outlook.com?subject=${encodeURIComponent("Portfolio contact from " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : ""))}`;
            }, 700);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Dinesh Kumar Yadav";
        $("#favicon").attr("href", "assets/images/favicon.svg");
    } else {
        document.title = "Come Back To Portfolio";
    }
});

var typed = new Typed(".typing-text", {
    strings: [
        "Data Science 📊",
        "Machine Learning 🤖",
        "AI Engineering 💡",
        "Deep Learning & Vision 🧠",
        "Generative AI & RAG 🚀",
        "Quantum Machine Learning ⚛️",
        "FastAPI & REST APIs ⚙️"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
              </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

function projectImage(project) {
    const base = (document.body && document.body.dataset.base) || "./";
    return `${base}assets/images/projects/${project.image}.svg`;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) return;
    const base = (document.body && document.body.dataset.base) || "./";
    let projectHTML = "";
    projects.slice(0, 10).forEach(project => {
        const isLive = project.links.view && !project.links.view.includes('github.com');
        const badge = isLive
            ? `<span style="display:inline-block;background:linear-gradient(90deg,#ff4444,#ff6b35);color:#fff;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:1px;vertical-align:middle;margin-left:6px;">🔴 LIVE</span>`
            : `<span style="display:inline-block;background:rgba(59,130,246,0.15);color:#2563eb;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:0.5px;vertical-align:middle;margin-left:6px;border:1px solid rgba(59,130,246,0.3);">UI Preview</span>`;
        const tagsHTML = Array.isArray(project.tags)
            ? `<div class="project-tags" style="display:flex;flex-wrap:wrap;gap:5px;margin:8px 0;">${project.tags.map(t => `<span style="background:rgba(37,99,235,0.12);color:#2563eb;font-size:0.72rem;font-weight:600;padding:2px 8px;border-radius:4px;border:1px solid rgba(37,99,235,0.25);">${t}</span>`).join('')}</div>`
            : '';
        const viewBtn = project.links.view
            ? `<a href="${project.links.view}" class="btn" target="_blank" rel="noopener"><i class="fas fa-eye"></i> ${isLive ? 'Visit Live' : 'View'}</a>`
            : '';
        const codeBtn = project.links.code
            ? `<a href="${project.links.code}" class="btn" target="_blank" rel="noopener">Code <i class="fas fa-code"></i></a>`
            : '';
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="${base}assets/images/projects/${project.image}.webp" onerror="this.onerror=null;this.src='${base}assets/images/projects/${project.image}.svg';" alt="${project.name}" loading="lazy" width="400" height="250" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}${badge}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          ${tagsHTML}
          <div class="btns">
            ${viewBtn}
            ${codeBtn}
          </div>
        </div>
      </div>
    </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}

function showHomeExperience(items) {
    const timeline = document.getElementById("homeExperience");
    if (!timeline) return;
    const sides = ["right", "left"];
    timeline.innerHTML = items.slice(0, 4).map((item, i) => `
    <div class="container ${sides[i % 2]}">
      <div class="content">
        <div class="tag">
          <h2>${item.org}</h2>
        </div>
        <div class="desc">
            <h3>${item.role}</h3>
            <p>${item.dates}${item.place ? " | " + item.place : ""}</p>
        </div>
      </div>
    </div>`).join("");
}

async function bootHome() {
    try {
        const [skills, projects, experience] = await Promise.all([
            window.PortfolioAPI.load("skills"),
            window.PortfolioAPI.load("projects"),
            window.PortfolioAPI.load("experience")
        ]);
        showSkills(skills);
        showProjects(projects);
        showHomeExperience(experience);
    } catch (err) {
        console.error(err);
    }
}

bootHome();

if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
}

const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
