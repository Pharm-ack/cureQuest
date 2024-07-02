import KeenSliderComponent from "@/components/testimonial";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <section className="w-full pb-12 pt-28 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-6xl mx-auto gap-8 md:gap-12 lg:grid-cols-2">
            <div className="space-y-4 md:pt-28">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Mission statement
              </h1>
              <p className="text-gray-500 text-lg">
                At curequest, we are dedicated to finding cures and improving
                the quality of life for those living with diseases. We believe
                that groundbreaking research, community support, and medical
                innovation are the keys to achieving our mission. Our team is
                committed to excellence, and we strive to make a positive impact
                on the lives of those affected by diseases.
              </p>
            </div>
            <div>
              <Image
                src="/hero.jpg"
                width={600}
                height={600}
                alt="A doctor and a nurse examining a patient"
                className="w-[600px] h-[400px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-10 md:py-12 lg:py-16">
        <div className="flex flex-col justify-center items-center pb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our team
          </h2>
          <p className="text-gray-500 text-center mt-4 text-lg">
            Meet the Dedicated Team Behind curequest’s Disease Research and
            Community Support
          </p>
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid max-w-6xl mx-auto gap-8 md:gap-12 lg:grid-cols-2">
            <div className="flex items-stretch gap-4">
              <Image
                src="/doctor.jpg"
                width={200}
                height={200}
                alt="Doctor"
                className="aspect-square w-32 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg/tight font-medium text-gray-900">
                  Dr. John Williams
                </h3>
                <p className="text-sm text-gray-500">CHIEF MEDICAL OFFICER</p>

                <p className="mt-0.5 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates voluptas distinctio nesciunt quas non animi.
                </p>
              </div>
            </div>

            <div className="flex items-stretch gap-4">
              <Image
                src="/doctor.jpg"
                width={200}
                height={200}
                alt="Doctor"
                className="aspect-square w-32 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg/tight font-medium text-gray-900">
                  Dr. John Williams
                </h3>
                <p className="text-sm text-gray-500">CHIEF MEDICAL OFFICER</p>

                <p className="mt-0.5 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates voluptas distinctio nesciunt quas non animi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KeenSliderComponent />
    </main>
  );
}
