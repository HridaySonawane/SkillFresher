"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const Counter = ({ from = 0, to = 650000, duration = 2 }) => {
  const count = useMotionValue(from);
  // const rounded = useTransform(count, (latest) =>
  // 	Math.floor(latest).toLocaleString()
  // );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      onUpdate: (latest) => {
        setDisplay(Math.floor(latest).toLocaleString());
      },
    });

    return controls.stop; // Cleanup on unmount
  }, [count, to, duration]);

  return <motion.span>{display}+</motion.span>;
};

const logos = [
  {
    logo: "/google-wordmark.svg",
    name: "google",
  },
  {
    logo: "/postman.svg",
    name: "postman",
  },
  {
    logo: "/twilio.svg",
    name: "twilio",
  },
  {
    logo: "/Cursor_wordmark_dark.svg",
    name: "cursor",
  },
  {
    logo: "/algolia.svg",
    name: "algolia",
  },
];

export function LandingShowcase() {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-20 bg-gradient-to-b dark:from-black">
      <div className="container h-full flex flex-col items-center justify-center gap-12">
        <div className="w-full flex flex-col justify-center items-center gap-8 sm:gap-12">
          <h3 className="text-lg sm:text-xl md:text-2xl text-center">
            Reactive Resume has helped people land jobs at these great
            companies:
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="relative aspect-video w-32 h-16 sm:w-40 sm:h-20 md:w-56 md:h-32"
              >
                <Image
                  src={logo.logo}
                  fill
                  alt={logo.name}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-200 max-w-md text-center">
            If this app has helped you with your job hunt, let me know by
            reaching out through this contact form.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-x-36 w-full">
          <div className="text-gray-200 text-3xl sm:text-4xl md:text-5xl text-center py-2 sm:py-4 font-bold">
            <Counter to={27000} />
            <p className="text-xs sm:text-base text-gray-600 m-2.5">
              GitHub Stars
            </p>
          </div>
          <div className="text-white text-4xl sm:text-5xl md:text-6xl text-center py-2 sm:py-4 font-bold">
            <Counter to={650000} />
            <p className="text-xs sm:text-base text-gray-400 m-2.5">
              Users Signed Up
            </p>
          </div>
          <div className="text-gray-200 text-3xl sm:text-4xl md:text-5xl text-center font-bold">
            <Counter to={840000} />
            <p className="text-xs sm:text-base text-gray-600 m-2.5">
              Users Signed Up
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
