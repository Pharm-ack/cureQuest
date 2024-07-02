import Image from "next/image";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import Newsletter from "./newsletter";

const routes = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Research",
    link: "/research",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default function Footer() {
  return (
    <footer>
      <Newsletter />
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl p-2 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Logo />

            <div className="flex mt-4 md:m-0">
              <ul className="flex items-center gap-6">
                {routes.map((route, idx) => (
                  <li key={`route-${idx}`}>
                    <Link
                      className="text-sm font-medium hover:underline underline-offset-4"
                      href={route.link}
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
