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

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Dinesh Kumar Yadav";
    } else {
        document.title = "Come Back To Portfolio";
    }
});

function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    const base = (document.body && document.body.dataset.base) || "../";
    projects.forEach(project => {
        const isLive = project.links.view && !project.links.view.includes('github.com');
        const badge = isLive
            ? `<span style="display:inline-block;background:linear-gradient(90deg,#ff4444,#ff6b35);color:#fff;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:1px;animation:pulse 1.5s infinite;vertical-align:middle;margin-left:6px;">🔴 LIVE</span>`
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
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="${base}assets/images/projects/${project.image}.webp" onerror="this.onerror=null;this.src='${base}assets/images/projects/${project.image}.svg';" alt="${project.name}" loading="lazy" decoding="async" width="380" height="240" />
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
    </div>
    </div>`;
    });
    projectsContainer.innerHTML = projectsHTML;

    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

window.PortfolioAPI.load("projects").then(showProjects);
