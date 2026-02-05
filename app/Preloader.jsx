"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import AboutMe from "./AboutMe";
import Link from "next/link";

export default function Preloader() {
  useEffect(() => {
    gsap.registerPlugin(SplitText, CustomEase);

    CustomEase.create("hop", ".8, 0, .3, 1");

    const splitTextElements = (
      selector,
      type = "words, chars",
      addFirstChar = false
    ) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        const split = new SplitText(element, {
          type,
          wordsClass: "word",
          charsClass: "char",
        });

        if (type.includes("chars")) {
          split.chars.forEach((char, index) => {
            const original = char.textContent;
            char.innerHTML = `<span>${original}</span>`;

            if (addFirstChar && index === 0) {
              char.classList.add("first-char");
            }
          });
        }
      });
    };

    splitTextElements(".intro-title h1", "words, chars", true);
    splitTextElements(".outro-title h1");
    splitTextElements(".tag p", "words");
    splitTextElements(".card h1", "words, chars", true);

    const isMobile = window.innerWidth < 1000;

    gsap.set(
      [
        ".split-overlay .intro-title .first-char span",
        ".split-overlay .outro-title .char span",
      ],
      { y: "0%" }
    );

    gsap.set(".split-overlay .intro-title .first-char", {
      x: isMobile ? "7.5rem" : "18rem",
      y: isMobile ? "-1rem" : "-2.75rem",
      fontWeight: "900",
      scale: 0.75,
    });

    gsap.set(".split-overlay .outro-title .char", {
      x: isMobile ? "-3rem" : "-8rem",
      fontSize: isMobile ? "6rem" : "14rem",
      fontWeight: "500",
    });

    const tl = gsap.timeline({ defaults: { ease: "hop" } });
    const tags = gsap.utils.toArray(".tag");

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll("p .word"),
        { y: "0%", duration: 0.75 },
        0.5 + index * 0.1
      );
    });

    tl.to(
      ".preloader .intro-title .char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
      },
      0.5
    )
      .to(
        ".preloader .intro-title .char:not(.first-char) span",
        {
          y: "100%",
          duration: 0.75,
          stagger: 0.05,
        },
        2
      )
      .to(
        ".preloader .outro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.075,
        },
        2.5
      )
      .to(
        ".preloader .intro-title .first-char",
        {
          x: isMobile ? "9rem" : "21.25rem",
          duration: 1,
        },
        3.5
      )
      .to(
        ".preloader .outro-title .char",
        {
          x: isMobile ? "-3rem" : "-8rem",
          duration: 1,
        },
        3.5
      )
      .to(
        ".preloader .intro-title .first-char",
        {
          x: isMobile ? "7.5rem" : "18rem",
          y: isMobile ? "-1rem" : "-2.75rem",
          fontWeight: "900",
          scale: 0.75,
          duration: 0.75,
        },
        4.5
      )
      .to(
        ".preloader .outro-title .char",
        {
          x: isMobile ? "-3rem" : "-8rem",
          fontSize: isMobile ? "6rem" : "14rem",
          fontWeight: "500",
          duration: 0.75,
          onComplete: () => {
            gsap.set(".preloader", {
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            });

            gsap.set(".split-overlay", {
              clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            });
          },
        },
        4.5
      )
      .to(
        ".container",
        {
          clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
          duration: 1,
        },
        5
      );

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll("p .word"),
        { y: "100%", duration: 0.75 },
        5.5 + index * 0.1
      );
    });

    tl.to(
      ".preloader, .split-overlay",
      {
        y: (i) => (i === 0 ? "-50%" : "50%"),
        duration: 1,
      },
      6
    )
      .to(
        ".container",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
        },
        6
      )
      .to(
        ".container .card",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
        },
        6.25
      )
      .to(
        ".container .card h1 .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        6.5
      );
  }, []);

  return (
    <>
      <div>
        <div className="preloader">
          <div className="intro-title">
            <h1>Ril Wani</h1>
          </div>
          <div className="outro-title">
            <h1>10</h1>
          </div>
        </div>

        <div className="split-overlay">
          <div className="intro-title">
            <h1>Ril Wani</h1>
          </div>
          <div className="outro-title">
            <h1>10</h1>
          </div>
        </div>

        <div className="tags-overlay">
          <div className="tag-1 tag">
            <p>Negative Space</p>
          </div>
          <div className="tag-2 tag">
            <p>Form and Void</p>
          </div>
          <div className="tag-3 tag">
            <p>Light Studies</p>
          </div>
        </div>
      </div>

      <div className="container">
        <nav>
          <p id="logo">R-W</p>
          <Link href='/catalogue' id="logo" style={{textDecoration: "none", color:"#000"}}>My Catalogue</Link>
        </nav>

        <div className="hero-image">
          <Image src="/producer.JPG" alt="" width={1000} height={600} />
        </div>

        <div className="card">
          <h1>Rilwani</h1>
        </div>

        <footer>
          <p>Scroll Down</p>
        </footer>
      </div>

      <AboutMe />
    </>
  );
}
