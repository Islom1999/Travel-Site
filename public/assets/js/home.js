const handleMainSlider = () => {
  const prevBtn = $("#main-slider-prev");
  const nextBtn = $("#main-slider-next");
  const slides = $All(".main-slide");
  let activeSlide = 1;

  const moveSlider = () => {
    activeSlide = activeSlide > slides.length - 1 ? 0 : activeSlide < 0 ? slides.length - 1 : activeSlide;
    for (let slide of slides) {
      slide.style.opacity = 0;
    }
    slides[activeSlide].style.opacity = 1;
  }

  moveSlider()

  prevBtn.addEventListener("click", () => {
    activeSlide -= 1;
    moveSlider();
  });

  nextBtn.addEventListener("click", () => {
    activeSlide += 1;
    moveSlider();
  });

  setInterval(() => {
    activeSlide += 1;
    moveSlider();
  }, 10000);
}

const handleLoadMore = (btn, moreData) => {
  btn.addEventListener("click", () => {
    if (moreData.classList.contains("!hidden")) {
      moreData.classList.replace("!hidden", "grid");
      btn.innerText = "Load Less";
    } else {
      moreData.classList.replace("grid", "!hidden");
      btn.innerText = "Load More";
    }
  })
}

const handleLoadMoreData = () => {
  const popularPlacesBtn = $("#load-more-popular-places");
  const morePopularPlaces = $("#more-popular-places");
  const bestHotelsBtn = $("#load-more-best-hotels");
  const moreBestHotels = $("#more-best-hotels");

  const transportBtn = $("#load-more-best-transport");
  const Transports = $("#more-best-transports");

  handleLoadMore(popularPlacesBtn, morePopularPlaces);
  handleLoadMore(bestHotelsBtn, moreBestHotels);
  handleLoadMore(transportBtn, Transports);
}

handleMainSlider();
window.addEventListener("DOMContentLoaded", () => {
  handleLoadMoreData();
});

