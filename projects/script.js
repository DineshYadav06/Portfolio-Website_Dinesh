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
        const liveBadge = isLive
            ? `<span style="display:inline-block;background:linear-gradient(90deg,#ff4444,#ff6b35);color:#fff;font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:1px;animation:pulse 1.5s infinite;vertical-align:middle;margin-left:6px;">🔴 LIVE</span>`
            : '';
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="${base}assets/images/projects/${project.image}.svg" alt="${project.name}" />
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
