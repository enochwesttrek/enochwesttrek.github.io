const slider = document.querySelector(".trail-slider");
if (slider) {
  const slides = [...slider.querySelectorAll(".trail-slide")];
  const dots = [...slider.querySelectorAll(".trail-dot")];
  let current = 0;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === current)));
  };
  slider.querySelector("[data-prev]").addEventListener("click", () => show(current - 1));
  slider.querySelector("[data-next]").addEventListener("click", () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
  });
}