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
    });
});

const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Experience | Dinesh Kumar Yadav";
    } else {
        document.title = "Come Back To Portfolio";
    }
});

function renderExperience(items) {
    const timeline = document.getElementById("experienceTimeline");
    if (!timeline) return;
    timeline.innerHTML = items.map((item, i) => `
    <div class="container ${i % 2 === 0 ? "left" : "right"}">
      <div class="content">
        <div class="tag">
          <h2>${item.org}</h2>
        </div>
        <div class="desc">
            <h3>${item.role}</h3>
            <p>${item.dates}${item.place ? " | " + item.place : ""}</p>
            ${item.detail ? `<p>${item.detail}</p>` : ""}
        </div>
      </div>
    </div>`).join("");
}

window.PortfolioAPI.load("experience").then(renderExperience);
