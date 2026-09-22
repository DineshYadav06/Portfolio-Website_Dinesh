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
        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            message: form.message.value.trim()
        };
        try {
            await window.PortfolioAPI.sendContact(payload);
            form.reset();
            alert("Message saved. I will get back to you soon.");
        } catch (error) {
            if (error && error.message === "NOT_CONFIGURED") {
                window.location.href = "mailto:dineshkumaryadav12651@outlook.com?subject=" +
                    encodeURIComponent("Portfolio contact from " + payload.name) +
                    "&body=" + encodeURIComponent(payload.message + "\n\n" + payload.email + "\n" + payload.phone);
                return;
            }
            console.error(error);
            alert("Could not send via Firebase. Opening email instead.");
            window.location.href = "mailto:dineshkumaryadav12651@outlook.com";
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
        "Deep Learning 🧠",
        "Web Development 🌐",
        "FastAPI & Backend Dev ⚙️",
        "Computer Vision 👁️",
        "Generative AI & RAG 🚀",
        "Data Analysis & EDA 📈"
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
    let projectHTML = "";
    projects.slice(0, 10).forEach(project => {
        const isLive = project.links.view && !project.links.view.includes('github.com');
        const liveBadge = isLive
            ? `<span style="display:inline-block;background:linear-gradient(90deg,#ff4444,#ff6b35);color:#fff;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:1px;vertical-align:middle;margin-left:6px;">🔴 LIVE</span>`
            : '';
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="${projectImage(project)}" alt="${project.name}" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}${liveBadge}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank" rel="noopener"><i class="fas fa-eye"></i> ${isLive ? 'Visit Live' : 'View'}</a>
            <a href="${project.links.code}" class="btn" target="_blank" rel="noopener">Code <i class="fas fa-code"></i></a>
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
