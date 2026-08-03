document.addEventListener("DOMContentLoaded", function () {
  var slider = document.querySelector(".slider"); // select the slider container element
  var sliderItems = document.querySelectorAll(".slider-item"); // select all individual slider items

  var itemCount = sliderItems.length; // count the number of items in the slider
  console.log("itemCount =", itemCount);

  var currentIndex = 0; // current item index

  if (!slider || itemCount === 0) {
    return;
  }

  // animate the container instead of translating each item individually
  slider.style.transition = "transform 0.6s ease";

  function scrollSlider() {
    if (itemCount <= 1) {
      return;
    }

    currentIndex += 1;
    if (currentIndex >= itemCount) {
      currentIndex = 0;
    }

    var itemWidth = sliderItems[0].getBoundingClientRect().width;
    slider.style.transform = "translateX(" + -currentIndex * itemWidth + "px)";
  }

  var intervalId = setInterval(scrollSlider, 10000); // call scrollSlider every 10 seconds

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(scrollSlider, 10000);
  }

  sliderItems.forEach(function (item) {
    item.onclick = function () {
      scrollSlider();
      resetInterval();
    };
  });
});
