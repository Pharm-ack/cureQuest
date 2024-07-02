import Image from "next/image";
import { LuMicroscope } from "react-icons/lu";
import { PiAtom } from "react-icons/pi";
import { LuHeartPulse } from "react-icons/lu";

export default function ResearchPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid max-w-6xl mx-auto gap-8 md:gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Research Efforts
            </h2>
            <p className="text-gray-500  mt-4 text-lg">
              CureQuest is at the forefront of groundbreaking research and
              development, working tirelessly to find cures and treatments for
              devastating diseases.
            </p>
            <div className="mt-8 grid gap-6">
              <div className="flex items-start gap-4">
                <LuMicroscope className="h-8 w-8 text-gray-900 " />
                <div>
                  <h3 className="text-xl font-bold">Cutting-Edge Research</h3>
                  <p className="text-gray-500 ">
                    Our team of world-class researchers are at the forefront of
                    medical innovation, pushing the boundaries of what&apos;s
                    possible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PiAtom className="h-8 w-8 text-gray-900 " />
                <div>
                  <h3 className="text-xl font-bold">Innovative Treatments</h3>
                  <p className="text-gray-500 ">
                    We are developing groundbreaking treatments and therapies
                    that have the potential to transform the lives of those
                    affected by devastating diseases.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <LuHeartPulse className="h-8 w-8 text-gray-900 " />
                <div>
                  <h3 className="text-xl font-bold">Improving Lives</h3>
                  <p className="text-gray-500 ">
                    Our ultimate goal is to improve the lives of those affected
                    by the diseases we research, providing hope and a path to a
                    better future.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Image
            src="/research.jpg"
            width="550"
            height="310"
            alt="Research Image"
            className="aspect-auto overflow-hidden rounded-xl h-[450px] object-cover sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}
