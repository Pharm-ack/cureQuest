export default function Newsletter() {
  return (
    <section className="flex justify-center px-4 text-gray-800 bg-gray-50">
      <div className="container px-6 py-12">
        <h1 className="text-xl font-bold text-center lg:text-2xl">
          Subscribe to Newsletter
        </h1>
        <p className="text-gray-500 text-center text-lg pt-2">
          Enter your email address to register to our newsletter
        </p>

        <div className="flex flex-col justify-center mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
          <input
            id="email"
            type="text"
            className="px-4 py-2 text-gray-700 bg-white border rounded-md    focus:border-blue-400  focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Email Address"
          />

          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
