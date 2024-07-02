import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function New() {
  const posts = await prisma.post.findMany({
    take: 3,
  });

  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32 bg-gray-50">
        {/* Component */}
        <div className="flex flex-col items-center">
          {/* Heading Div */}
          <div className="mb-8 max-w-[800px] text-center md:mb-12 lg:mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl capitalize md:text-5xl">
              The latest and greatest
              <span className="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')] bg-cover bg-center px-4 text-white">
                news
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-[528px] text-gray-500 text-lg">
              Stay up-to-date with the latest news and insights from CureQuest
            </p>
          </div>
          {/* Blog Div */}
          <div className="mb-6 grid grid-cols-1 justify-items-center gap-8 sm:justify-items-stretch md:mb-10 md:grid-cols-3 md:gap-4 lg:mb-12">
            {/* Blog Item */}

            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-4 rounded-2xl border border-solid border-[#b1b1b1] bg-white/75 p-6 font-bold text-black transition hover:[box-shadow:rgb(33,_33,_33)_5px_5px]"
              >
                <Image
                  src={post.image}
                  alt=""
                  width={100}
                  height={100}
                  className="inline-block h-72 w-full object-cover rounded-md"
                />
                <div className="w-full pt-4">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="my-3 font-normal text-[#636262] lg:mb-8">
                    Lorem ipsum dolor sit amet, &nbsp;elit ut aliquam, purus sit
                    amet luctus venenatis elit ut aliquam, purus sit amet luctus
                    venenatis
                  </p>
                  <div className="mx-auto flex max-w-[480px] flex-row items-center text-left">
                    <div className="flex flex-col items-start">
                      <h6 className="text-base font-semibold">Laila Bahar</h6>
                      <div className="flex items-start max-[991px]:flex-col lg:items-center">
                        <p className="text-sm text-[#636262]">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="ml-2 mr-2 text-sm text-[#636262] max-[991px]:hidden">
                          -
                        </p>
                        <p className="text-sm text-[#636262]">6 mins read</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px]"
          >
            View More Articles
          </a>

          {/* <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          >
            View All Blog Posts
          </Link> */}
        </div>
      </div>
    </section>
  );
}
