import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <section className="w-full py-10 md:py-12 lg:py-16 bg-gray-50">
      <div className="flex flex-col justify-center items-center pb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Latest from the Blog
        </h2>
        <p className="text-gray-500 mt-4 text-lg text-center">
          Stay up-to-date with the latest news and insights from the Cure
          Research Foundation.
        </p>
      </div>
      <div className="container px-4 md:px-6">
        <div className="grid max-w-6xl mx-auto gap-8 md:gap-10 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <Image
              alt="A person reading a book in a library"
              width={100}
              height={100}
              src="/research.jpg"
              className="h-64 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                10th Oct 2022
              </time>

              <Link
                href="/"
                className="mt-0.5 text-xl font-bold hover:underline"
              >
                How to position your furniture for positivity
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae dolores, possimus pariatur animi temporibus nesciunt
                praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora
                nisi culpa eius atque dignissimos. Molestias explicabo corporis
                voluptatem?
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
