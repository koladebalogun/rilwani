"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

export default function Page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const slides = [
      {
        title:
          "Under the dim hum of stage lights, I watch time ripple through sound, my growth echoed in fragments of drifting melodies unfolding.",
        image: "/producer5.jpg",
        link: "https://music.apple.com/gh/album/gemini/1762749300?i=1762749306",
      },
      {
        title:
          "Under the soft hum of hallway lights, I watch practice ripple through sound, my discipline mirrored in fragments of drifting scales daily.",
        image: "/producer6.jpg",
        link: "https://music.apple.com/gh/song/bad-decision/1819796686",
      },
      {
        title:
          "Under the low hum of midnight lights, I watch feelings ripple through sound, my breath reflected in fragments of drifting echoes nearby.",
        image: "/producer7.jpg",
        link: "https://music.apple.com/gh/song/ravage-warcry/1727859357",
      },
      {
        title:
          "Under the soft hum of street lights, she watches the world ripple through glass, her expresssion mirrored in fragments of drifting light.",
        image: "/producer8.jpg",
        link: "https://music.apple.com/gh/song/ravage-warcry-remix/1740491733",
      },
      {
        title:
          "Under the soft hum of backroom lights, I watch silence ripple through sound, my patience mirrored in fragments of drifting pauses inside.",
        image: "/producer9.jpg",
        link: " https://music.apple.com/gh/song/a-night-in-rio/1763904857",
      },
      {
        title:
          "Under the faint hum of neon lights, I watch memories ripple through sound, my heartbeat echoed in fragments of drifting tempo lines.",
        image: "/producer10.jpg",
        link: "https://music.apple.com/gh/album/ojugba/1705719459?i=1705719461",
      },
      {
        title:
          "Under the steady hum of stage lights, I watch moments ripple through sound, my story mirrored in fragments of drifting notes alone.",
        image: "/producer11.jpg",
        link: "https://music.apple.com/gh/song/i-like/1772561127",
      },
      {
        title:
          "Under the warm hum of venue lights, I watch emotions ripple through sound, my presence reflected in fragments of drifting tones tonight.",
        image: "/producer12.jpg",
        link: "https://music.apple.com/gh/song/tinkerbell/1777128342",
      },
      {
        title:
          "Under the soft hum of practice lights, I watch ideas ripple through sound, my intent echoed in fragments of drifting chords slowly.",
        image: "/producer13.jpg",
        link: "https://music.apple.com/gh/song/raise-da-roof-refix/1757879925",
      },
      {
        title:
          "Under the quiet hum of club lights, I watch the night ripple through sound, my feeling mirrored in fragments of drifting rhythm.",
        image: "/producer14.jpg",
        link: "https://music.apple.com/gh/song/soyoyo-refix/1757879923",
      },
      {
        title:
          "Under the low hum of studio lights, I watch the room ripple through sound, my focus reflected in fragments of drifting harmony.",
        image: "/producer15.jpg",
        link: "https://music.apple.com/gh/song/gaga-refix/1757879924",
      },
    ];

    const pinDistance = window.innerHeight * slides.length;
    const progressBar = document.querySelector(".slider-progress");
    const sliderImages = document.querySelector(".slider-images");
    const sliderTitle = document.querySelector(".slider-title");
    const sliderIndices = document.querySelector(".slider-indices");
    const sliderLink = document.querySelector(".slider-link");

    let activeSlide = 0;
    let currentSplit = null;

    function createIndices() {
      sliderIndices.innerHTML = "";

      slides.forEach((_, index) => {
        const indexNum = (index + 1).toString().padStart(2, "0");
        const indicatorElement = document.createElement("p");
        indicatorElement.dataset.index = index;
        indicatorElement.innerHTML = `
          <span class="marker"></span>
          <span class="index">${indexNum}</span>
        `;
        sliderIndices.appendChild(indicatorElement);

        if (index === 0) {
          gsap.set(indicatorElement.querySelector(".index"), { opacity: 1 });
          gsap.set(indicatorElement.querySelector(".marker"), { scaleX: 1 });
        } else {
          gsap.set(indicatorElement.querySelector(".index"), { opacity: 0.35 });
          gsap.set(indicatorElement.querySelector(".marker"), { scaleX: 0 });
        }
      });
    }

    function animateNewSlide(index) {
      const newSliderImage = document.createElement("img");
      newSliderImage.src = slides[index].image;
      newSliderImage.alt = `Slide ${index + 1}`;

      gsap.set(newSliderImage, { opacity: 0, scale: 1.1 });
      sliderImages.appendChild(newSliderImage);

      gsap.to(newSliderImage, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(newSliderImage, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });

      const allImages = sliderImages.querySelectorAll("img");
      if (allImages.length > 3) {
        for (let i = 0; i < allImages.length - 3; i++) {
          sliderImages.removeChild(allImages[i]);
        }
      }

      animateNewTitle(index);
      animateNewLink(index);
      animateIndicators(index);
    }

    function animateIndicators(index) {
      const indicators = sliderIndices.querySelectorAll("p");

      indicators.forEach((indicator, i) => {
        if (i === index) {
          gsap.to(indicator.querySelector(".index"), { opacity: 1 });
          gsap.to(indicator.querySelector(".marker"), { scaleX: 1 });
        }
      });
    }

    function animateNewTitle(index) {
      if (currentSplit) currentSplit.revert();

      sliderTitle.innerHTML = `<h1>${slides[index].title}</h1>`;

      currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      gsap.set(currentSplit.lines, { yPercent: 100, opacity: 0 });

      gsap.to(currentSplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    function animateNewLink(index) {
      sliderLink.innerHTML = `
        <a 
          class="slider-title slider-link"
          href="${slides[index].link}" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Click here to step into my world — experience my sound.
        </a>
  `;

      gsap.fromTo(
        sliderLink,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }

    createIndices();

    ScrollTrigger.create({
      trigger: ".slider",
      start: "top top",
      end: `+=${pinDistance}px`,
      scrub: true,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        gsap.set(progressBar, { scaleY: self.progress });

        const currentSlide = Math.floor(self.progress * slides.length);
        if (activeSlide !== currentSlide && currentSlide < slides.length) {
          activeSlide = currentSlide;
          animateNewSlide(activeSlide);
        }
      },
    });
  }, []);

  return (
    <div className="catalogue">
      <section className="intro">
        <h1>
          Scroll to explore the rhythm of notes that drift quietly between my
          melody and feeling
        </h1>
      </section>

      <section className="slider">
        <div className="slider-images">
          <Image src="/producer5.jpg" alt="" width={2000} height={2000} />
        </div>

        <div className="slider-title">
          <h1>
            Under the soft hum of stage lights, I watch the crowd ripple through
            sound, my expression echoed in fragments of drifting melody.
          </h1>
        </div>

        <div className="slider-title slider-link"></div>

        <div className="slider-indicator">
          <div className="slider-indices"></div>
          <div className="slider-progress-bar">
            <div className="slider-progress"></div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>
          As the sequence slows, the silence takes over holding last traces of
          motion in the air
        </h1>
      </section>
    </div>
  );
}
