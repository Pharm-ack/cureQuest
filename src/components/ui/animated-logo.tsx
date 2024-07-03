// Instructions for integrating continuous logo animation in Tailwind CSS:
// Add the following configurations to the `extend` section of your `tailwind.config.js`:
// 1. Keyframes for 'logo-cloud' animation that continuously moves logos from right to left:
//    keyframes: {
//      'logo-cloud': {
//        from: { transform: 'translateX(0)' },
//        to: { transform: 'translateX(calc(-100% - 4rem))' },
//      },
//    }
// 2. Animation utility to apply this keyframe:
//    animation: {
//      'logo-cloud': 'logo-cloud 30s linear infinite', // Adjust duration and timing as needed for your design.
//    }

import Image from "next/image";

const logos = [
  {
    id: 1,
    name: "Vercel",
    url: "/stjude.png",
  },
  {
    id: 2,
    name: "Nextjs",
    url: "/pakistan.jpeg",
  },
  {
    id: 3,
    name: "Prime",
    url: "/chmlogo.png",
  },
  {
    id: 4,
    name: "Trustpilot",
    url: "/authism.png",
  },
  {
    id: 5,
    name: "Webflow",
    url: "/cancer.jpeg",
  },

  {
    id: 6,
    name: "Airbnb",
    url: "/download.png",
  },
  {
    id: 7,
    name: "Tina",
    url: "/download (1).png",
  },
  {
    id: 8,
    name: "Stackoverflow",
    url: "/images.png",
  },
  {
    id: 9,
    name: "mistral",
    url: "/download (2).png",
  },
];

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-20">
      <div className="mx-auto w-full px-4 md:px-8">
        <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
          Our Amazing Partners
        </h2>
        <div
          className="group relative mt-12 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, id) => (
              <div
                key={id}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, id) => (
                  <Image
                    key={id}
                    src={logo.url}
                    width={100}
                    height={40}
                    className="h-10 w-28 px-2"
                    alt={`${logo.name}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
