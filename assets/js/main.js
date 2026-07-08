//Get year
const year = document.getElementById("getYear");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

// Active Navbar
const navLinks = document.querySelectorAll("#navContainer .nav-link");
const brandLink = document.getElementById("brandLink");
const sections = document.querySelectorAll("main section[id]");

const setActiveLink = (activeId) => {
  navLinks.forEach((link) => {
    const sectionId = link.getAttribute("href");
    link.classList.toggle("active", sectionId === `#${activeId}`);
  });
};

const updateActiveOnScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  let currentSectionId = null;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  if (currentSectionId) {
    setActiveLink(currentSectionId);
  } else {
    navLinks.forEach((link) => link.classList.remove("active"));
  }
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

if (brandLink) {
  brandLink.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
  });
}

window.addEventListener("scroll", updateActiveOnScroll);
window.addEventListener("load", updateActiveOnScroll);
window.addEventListener("resize", updateActiveOnScroll);

const courseData = [
  // Term 1
  { id: "LAW101K", percentage: 67 },
  { id: "ITE102K", percentage: 100 },
  { id: "ITE103K", percentage: 50 },
  { id: "ENG001K", percentage: 100 },
  // Term 2
  { id: "KHM140K", percentage: 75 },
  { id: "HIS101K", percentage: 67 },
  // Term 3
  { id: "ITE101K", percentage: 100 },
  { id: "MTH120K", percentage: 83 },
  { id: "ENG002K", percentage: 75 },
  { id: "POL101K", percentage: 50 },
  // Term 4
  { id: "PHL105K", percentage: 83 },
  { id: "ITE205K", percentage: 100 },
  { id: "MED101K", percentage: 100 },
  { id: "ITE106K", percentage: 75 },
  { id: "ITE202K", percentage: 83 },
  // Term 5
  { id: "ITE208K", percentage: 83 },
  { id: "MED272K", percentage: 75 },
  { id: "ITE204K", percentage: 75 },
  // Term 6
  { id: "ITE203K", percentage: 100 },
  { id: "MED102K", percentage: 67 },
  { id: "ITE206K", percentage: 100 },
  { id: "ITE207K", percentage: 75 },
  { id: "ITE201K", percentage: 100 },

  // Term 7
  { id: "ITE301K", percentage: 100 },
  { id: "MED372K", percentage: 37 },
  { id: "ITE302K", percentage: 100 },
  { id: "BUS202K", percentage: 75 },
  { id: "ITE303K", percentage: 0 },

  // Term 7
  { id: "ITE408K", percentage: 0 },
  { id: "ITE307K", percentage: 0 },
  { id: "ITE306K", percentage: 0 },
];

const chartInstances = {};

function createGPAChart(containerId, percentage, color) {
  const container = document.getElementById(containerId);
  if (!container || typeof echarts === "undefined") return;

  container.style.width = "100%";
  container.style.height = "100%";
  container.style.display = "block";

  let chart = chartInstances[containerId];
  if (!chart) {
    chart = echarts.init(container);
    chartInstances[containerId] = chart;
  }

  const option = {
    tooltip: { show: false },
    animation: true,
    animationDuration: 1200,
    animationEasing: "cubicOut",
    series: [
      {
        name: "Background",
        type: "pie",
        radius: ["70%", "100%"],
        startAngle: 90,
        clockwise: true,
        avoidLabelOverlap: true,
        label: { show: false },
        silent: true,
        animation: false,
        data: [{ value: 100, itemStyle: { color: "rgba(0,0,0,0.08)" } }],
        z: 1,
      },
      {
        name: "GPA",
        type: "pie",
        radius: ["70%", "100%"],
        startAngle: 90,
        clockwise: true,
        avoidLabelOverlap: true,
        label: { show: false },
        silent: true,
        animation: true,
        data: [
          {
            value: percentage,
            itemStyle: {
              color: color,
            },
          },
          { value: 100 - percentage, itemStyle: { color: "transparent" } },
        ],
        z: 2,
      },
    ],
  };

  chart.setOption(option, true);
}

function getGPAColor(percentage) {
  switch (percentage) {
    case 100:
      return "#228B22";
    case 83:
      return "#32CD32";
    case 75:
      return "#ADFF2F";
    case 67:
      return "#CCFF01";
    case 50:
      return "#FFBF00";
    case 37:
      return "#FF4500";
    case 25:
      return "#FF0000";
    default:
      return "rgba(0,0,0,0.08)";
  }
}

function getGPA(percentage) {
  switch (percentage) {
    case 100:
      return "4.0";
    case 83:
      return "3.5";
    case 75:
      return "3.0";
    case 67:
      return "2.5";
    case 50:
      return "2.0";
    case 37:
      return "1.5";
    case 25:
      return "1.0";
    default:
      return "0.0";
  }
}

function subjectGPA(containerId, percentage) {
  const container = document.getElementById(containerId);
  const gpaElement = container?.parentElement?.querySelector("span");

  if (!gpaElement) {
    return;
  }

  gpaElement.textContent = getGPA(percentage);
  gpaElement.style.color = getGPAColor(percentage);
}

function termGPA(modalBody) {
  totalGPA = modalBody.querySelector(".badge h5");
  gradeGPA = modalBody.querySelector(".scholarGrade h2");
  if (!totalGPA && !gradeGPA) {
    return;
  }

  const gpaValue = courseData.filter((course) => {
    const courseElement = document.getElementById(course.id);
    return (
      courseElement &&
      courseElement.closest(".modal-body") === modalBody &&
      courseElement.offsetParent !== null
    );
  });

  if (gpaValue.length === 0) {
    if (totalGPA) totalGPA.textContent = "0.0";
    if (gradeGPA) gradeGPA.textContent = "F";
    return;
  }

  averageGPA =
    gpaValue.reduce(
      (sum, course) => sum + parseFloat(getGPA(course.percentage)),
      0,
    ) / gpaValue.length;
  if (totalGPA) {
    totalGPA.textContent = averageGPA.toFixed(1);
  }

  if (gradeGPA) {
    let grade = "";
    if (averageGPA == 4.0) {
      grade = "A";
    } else if (averageGPA >= 3.5) {
      grade = "B+";
    } else if (averageGPA >= 3.0) {
      grade = "B";
    } else if (averageGPA >= 2.5) {
      grade = "C+";
    } else if (averageGPA >= 2.0) {
      grade = "C";
    } else if (averageGPA >= 1.5) {
      grade = "D+";
    } else if (averageGPA >= 1.0) {
      grade = "D";
    } else {
      grade = "F";
    }
    gradeGPA.textContent = grade;
  }
}

function renderVisibleCharts() {
  courseData.forEach((course) => {
    const container = document.getElementById(course.id);
    if (container && container.offsetParent !== null) {
      createGPAChart(
        course.id,
        course.percentage,
        getGPAColor(course.percentage),
      );
      subjectGPA(course.id, course.percentage);
    }
  });

  document.querySelectorAll(".modal-body").forEach((modalBody) => {
    termGPA(modalBody);
  });
}

window.addEventListener("load", renderVisibleCharts);
window.addEventListener("resize", () => {
  Object.values(chartInstances).forEach((chart) => chart.resize());
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("shown.bs.modal", () => {
    renderVisibleCharts();
    setTimeout(() => {
      courseData.forEach((course) => {
        const container = document.getElementById(course.id);
        if (container && container.offsetParent !== null) {
          if (chartInstances[course.id]) {
            chartInstances[course.id].dispose();
            chartInstances[course.id] = null;
          }

          createGPAChart(
            course.id,
            course.percentage,
            getGPAColor(course.percentage),
          );
          subjectGPA(course.id, course.percentage);
        }
      });

      document.querySelectorAll(".modal-body").forEach((modalBody) => {
        termGPA(modalBody);
      });
    }, 60);
  });
});
