import { Disclosure } from "@headlessui/react";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";

const faqs = [
  {
    question: " Can I trust the reviews on Amazon after using your service?",
    answer:
      "While our website helps identify potentially fake reviews, it's important to consider a combination of factors when evaluating products. Use our service as a tool to enhance your decision-making process and ensure a more reliable shopping experience",
  },
  {
    question: "Does your website work for all electronic products on Amazon?",
    answer:
      "Yes, our website is designed to detect fake reviews for a wide range of electronic products on Amazon. However, the accuracy of the system may vary depending on the availability and quality of data for specific products.",
  },
  {
    question:
      "How does your website benefit Amazon sellers who are honest and transparent?",
    answer:
      "By detecting and reducing the prevalence of fake reviews, our website helps level the playing field for honest and transparent Amazon sellers. It ensures that their products are evaluated based on genuine customer feedback, fostering a more fair and competitive marketplace.",
  },
  {
    question: "How accurate is your system in detecting fake reviews?",
    answer:
      "While our system employs powerful technology, no method can guarantee 100% accuracy. We continuously learn and adapt to new patterns, improving accuracy over time. However, it's essential to use our service as an additional tool and exercise judgment when evaluating reviews.",
  },
  {
    question: "How can I detect fake reviews on Amazon?",
    answer:
      "Just copy the product link from amazon sales page and paste it in our detetion search bar.",
  },
  {
    question: "Are there any costs associated with using your website?",
    answer: "No, It's free to use.",
  },
  // More questions...
];

const Accordion = () => {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <HiMiniMinus
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <HiMiniPlus
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
