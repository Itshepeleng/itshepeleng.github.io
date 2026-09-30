(() => {
  const pages = ["index.html", "projects.html", "contact.html"];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const currentIndex = pages.indexOf(currentPage === "Portfolio.html" ? "index.html" : currentPage);
  const transitionDelay = 0; // Adjust this value to match the CSS transition duration (in milliseconds)
  let isNavigating = false;
  let touchStartY = 0;

  if (currentIndex === -1) return;

  function navigate(direction) {
    if (isNavigating) return;

    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= pages.length) return;

    isNavigating = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      window.location.href = pages[nextIndex];
      return;
    }

    document.body.classList.add(direction > 0 ? "is-page-leaving-forward" : "is-page-leaving-backward");
    window.setTimeout(() => {
      window.location.href = pages[nextIndex];
    }, transitionDelay);
  }

  function isAtTop() {
    return window.scrollY <= 8;
  }

  function isAtBottom() {
    return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
  }

  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0 && isAtBottom()) navigate(1);
    if (event.deltaY < 0 && isAtTop()) navigate(-1);
  }, { passive: true });

  window.addEventListener("touchstart", (event) => {
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;

    if (swipeDistance > 60 && isAtBottom()) navigate(1);
    if (swipeDistance < -60 && isAtTop()) navigate(-1);
  }, { passive: true });
})();