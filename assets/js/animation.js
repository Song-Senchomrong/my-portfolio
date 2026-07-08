const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const classes = entry.target.classList;

    let animationClass = '';
    if (classes.contains('fade-left')) animationClass = 'enableFadeLeft';
    else if (classes.contains('fade-right')) animationClass = 'enableFadeRight';
    else if (classes.contains('fade-up')) animationClass = 'enableFadeUp';
    else if (classes.contains('fade-in')) animationClass = 'enableFadeIn';

    if (entry.isIntersecting) {
      entry.target.classList.add(animationClass);
    }
  });
});

const animatedElements = document.querySelectorAll('.fade-left, .fade-right, .fade-up, .fade-in');
animatedElements.forEach((el) => observer.observe(el));