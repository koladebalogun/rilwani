"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function AboutMe() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // ---- LENIS: Smooth but NOT slow scroll ----
    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
      wheelMultiplier: 1.2, // keeps scroll FAST
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.defaults({ markers: false });

    // ---------------------------------------------------------------
    //  SPOTLIGHT ANIMATION LOGIC  (converted 1:1 from your code)
    // ---------------------------------------------------------------
    const spotlightImgFinalPos = [
      [-140, -140],
      [40, -130],
      [-160, 40],
      [20, 30],
    ];

    const spotlightImages = document.querySelectorAll(".spotlight-img");

    ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `${window.innerHeight * 6}px`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const initialRotations = [5, -3, 3.5, -1];
        const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3];
        const phaseTwoStartOffsets = [0.5, 0.55, 0.6, 0.65];

        spotlightImages.forEach((img, index) => {
          const initialRotation = initialRotations[index];

          // --- PHASE 1 ---
          const phase1Start = phaseOneStartOffsets[index];
          const phase1End = Math.min(
            phase1Start + (0.45 - phase1Start) * 0.9,
            0.45
          );

          let x = -50;
          let y, rotation;

          if (progress < phase1Start) {
            y = 200;
            rotation = initialRotation;
          } else if (progress <= 0.45) {
            let phase1Progress;

            if (progress >= phase1End) {
              phase1Progress = 1;
            } else {
              const linear = (progress - phase1Start) / (phase1End - phase1Start);
              phase1Progress = 1 - Math.pow(1 - linear, 3);
            }

            y = 200 - phase1Progress * 250;
            rotation = initialRotation;
          } else {
            y = -50;
            rotation = initialRotation;
          }

          // --- PHASE 2 ---
          const phase2Start = phaseTwoStartOffsets[index];
          const phase2End = Math.min(
            phase2Start + (0.95 - phase2Start) * 0.9,
            0.95
          );

          const finalX = spotlightImgFinalPos[index][0];
          const finalY = spotlightImgFinalPos[index][1];

          if (progress >= phase2Start && progress <= 0.95) {
            let phase2Progress;

            if (progress >= phase2End) {
              phase2Progress = 1;
            } else {
              const linear =
                (progress - phase2Start) / (phase2End - phase2Start);
              phase2Progress = 1 - Math.pow(1 - linear, 3);
            }

            x = -50 + (finalX + 50) * phase2Progress;
            y = -50 + (finalY + 50) * phase2Progress;

            rotation = initialRotation * (1 - phase2Progress);
          } else if (progress > 0.95) {
            x = finalX;
            y = finalY;
            rotation = 0;
          }

          gsap.set(img, {
            transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
          });
        });
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="about-me">
      <section className="intro">
        <h1>The Art of making music becomes the art of sensing</h1>
      </section>

      <section className="spotlight">
        <div className="spotlight-header">
          <h1>I make Music that transcends the plane of reality and time</h1>
        </div>

        <div className="spotlight-images">
          <div className="spotlight-img">
            <Image src="/producer1.jpg" alt="" width={500} height={500} />
          </div>
          <div className="spotlight-img">
            <Image src="/producer2.jpg" alt="" width={500} height={500} />
          </div>
          <div className="spotlight-img">
            <Image src="/producer3.jpg" alt="" width={500} height={500} />
          </div>
          <div className="spotlight-img">
            <Image src="/producer4.jpg" alt="" width={500} height={500} />
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>I make music with precision</h1>
      </section>
    </div>
  );
}
