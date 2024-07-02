import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <main>
      <section className="w-full pb-12 pt-28 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-6xl mx-auto gap-8 md:gap-12 lg:grid-cols-2 pt-5">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Advancing Medical Research, Improving Lives
              </h1>
              <p className="text-gray-500 text-lg">
                CureQuest is a non-profit organization dedicated to funding
                medical research with the mission to improve diagnoses, enhance
                treatments, and ultimately find cures for various diseases. By
                partnering with leading medical institutions and top
                researchers, we are making significant strides towards building
                a healthier and happier world.
              </p>
              <div className="flex gap-4">
                <Button variant="default" size="lg">
                  <Link href="/donate">Donate</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/">Learn More</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/hero.jpg"
                width={600}
                height={340}
                priority
                alt="A doctor and a nurse examining a patient"
                className="w-[600px] h-[340px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
