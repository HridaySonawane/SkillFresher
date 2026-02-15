"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingFaq() {
  const faqs = [
    {
      name: "Who are you, and why did you build Reactive Resume?",
      desc: "I'm Amruth Pillai, just another run-off-the-mill developer working at Elara Digital GmbH in Berlin, Germany. I'm married to my beautiful and insanely supportive wife who has helped me in more ways than one in seeing this project to it's fruition. I am originally from Bengaluru, India where I was a developer at Postman for a short while. Back in my university days, I designed a really cool dark mode resume (link on my website) using Figma and I had a line of friends and strangers asking me to design their resume for them. While I could have charged everyone a hefty sum and retired even before I began, I decided to build the first version of Reactive Resume in 2019. Since then, it's gone through multiple iterations as I've learned a lot of better coding practices over the years. At the time of writing, Reactive Resume is probably one of the only handful of resume builders out there available to the world for free and without an annoying paywall at the end. While being free is often associated with software that's not of good quality, I strive to prove them wrong and build a product that people love using and are benefitted by it. My dream has always been to build something that at least a handful people use on a daily basis, and I'm extremely proud to say that Reactive Resume, over it's years of development, has helped over half a million people build their resume, and I hope it only increases from here and reaches more people who are in need of a good resume to kickstart their career.",
    },
    {
      name: "How much does it cost to run Reactive Resume?",
      desc: "It's not much honestly. DigitalOcean has graciously sponsored their infrastructure to allow me to host Reactive Resume on their platform. There's only the fee I pay to dependent services to send emails, renew the domain, etc. I've spent countless hours and sleepless nights building the application though, and I honestly do not expect anything in return but to hear from you on how the app has helped you with your career. But if you do feel like supporting the developer and the future development of Reactive Resume, please donate (only if you have some extra money lying around) on my GitHub Sponsors page. You can choose to donate one-time or sponsor a recurring donation. Alternatively, if you are in the US, or you are a part of a large educational institution or corporate organization, you can support the project through Open Collective. We are fiscally hosted through Open Collective Europe, which means your donations and sponsorships could also be made tax-deductible.",
    },
    {
      name: "Other than donating, how can I support you?",
      desc: "If you speak a language other than English, sign up to be a translator on Crowdin, our translation management service. You can help translate the product to your language and share it among your community. Even if the language is already translated, it helps to sign up as you would be notified when there are new phrases to be translated.If you work in the media, are an influencer or have lots of friends, share the app with your circles and let them know so it can reach the people who need it the most. I'm also open to giving tech talks, although that's wishful thinking. But if you do mention Reactive Resume on your blog, let me know so that I can link back to you here.If you found a bug or have an idea for a feature, raise an issue on GitHub or shoot me a message and let me know what you'd like to see. I can't promise that it'll be done soon, but juggling work, life and open-source, I'll definitely get to it when I can.",
    },
    {
      name: "How does the OpenAI Integration work?",
      desc: "OpenAI has been a game-changer for all of us. I cannot tell you how much ChatGPT has helped me in my everyday work and with the development of Reactive Resume. It only makes sense that you leverage what AI has to offer and let it help you build the perfect resume. While most applications out there charge you a fee to use their AI services (rightfully so, because it isn't cheap), you can choose to enter your own OpenAI API key on the Settings page (under OpenAI Integration). The key is stored in your browser's local storage, which means that if you uninstall your browser, or even clear your data, the key is gone with it. All requests made to OpenAI are also sent directly to their service and does not hit the app servers at all. You are free to turn off all AI features (and not be aware of it's existence) simply by not adding a key in the Settings page and still make use of all the useful features that Reactive Resume has to offer. I would even suggest you to take the extra step of using ChatGPT to write your content, and simply copy it over to Reactive Resume.",
    },
  ];

  // const sliderVariant = {
  // 	initial: {
  // 		x: "50%",
  // 	},
  // 	animate: {
  // 		x: "-220%",
  // 		transition: {
  // 			duration: 50,
  // 			repeat: Infinity,
  // 			repeatType: "mirror" as const,
  // 		},
  // 	},
  // };

  return (
    <section className="py-12 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="container h-full flex flex-col gap-10 md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center mb-8 md:mb-0">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
              Here are some questions I often get asked about Reactive Resume.
            </p>
            <p className="text-xs sm:text-base italic text-gray-600 dark:text-gray-400 text-center">
              Unfortunately, this section is available only in English, as I do
              not want to burden translators with having to translate these
              large paragraphs of text.
            </p>
          </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center h-full">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i + 1}`}>
                <AccordionTrigger>{faq.name}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
