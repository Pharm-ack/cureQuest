import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCall, MdOutlineMailOutline } from "react-icons/md";

export default function ContactPage() {
  return (
    <section className="bg-white">
      <div className="container px-6 py-12 max-w-6xl mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-1/2 lg:mx-6 pt-24 lg:pt-0 pl-3">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize  lg:text-3xl">
              Contact us for <br /> more info
            </h1>

            <div className="mt-6 space-y-8 md:mt-8">
              <p className="flex items-start -mx-2">
                <HiOutlineLocationMarker />

                <span className="mx-2 text-gray-700 truncate w-72 ">
                  Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <MdCall />

                <span className="mx-2 text-gray-700 truncate w-72 ">
                  (257) 563-7401
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <MdOutlineMailOutline />

                <span className="mx-2 text-gray-700 truncate w-72 ">
                  acb@example.com
                </span>
              </p>
            </div>

            <div className="mt-6 w-80 md:mt-8">
              <h3 className="text-gray-600  ">Follow us</h3>

              <div className="flex mt-4 -mx-1.5 ">
                <a
                  className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  href="#"
                >
                  <FaTwitter />
                </a>

                <a
                  className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  href="#"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  href="#"
                >
                  <FaFacebookF />
                </a>

                <a
                  className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  href="#"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:pt-24 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-2xl  lg:max-w-xl shadow-gray-300 ">
              <h1 className="text-lg font-medium text-gray-700">
                What do you want to ask
              </h1>

              <form className="mt-6">
                <div className="flex-1">
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="flex-1 mt-6">
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="w-full mt-6">
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Message
                  </label>
                  <textarea
                    className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48     focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  get in touch
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
