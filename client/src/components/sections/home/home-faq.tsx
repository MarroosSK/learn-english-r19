import { useState } from "react";
import SupportModal from "@/components/modals/support-modal";

interface QuestionI {
  value: string;
  content: string;
  title: string;
  isOpen: boolean;
  toggle: (value: string) => void;
}

const Question = ({ title, content, value, isOpen, toggle }: QuestionI) => (
  <div className="border-b border-gray-300">
    <button
      className="w-full text-left font-bold leading-relaxed p-4 flex justify-between items-center"
      onClick={() => toggle(value)}
    >
      {title}
      <span>{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && (
      <div className="p-4 text-gray-500">
        <p>{content}</p>
      </div>
    )}
  </div>
);

const HomeFaq = () => {
  const [open, setOpen] = useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    setOpen(open === value ? null : value);
  };

  return (
    <section id="faq" className="py-[96px] md:px-[96px]">
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight">FAQ</h2>
        <div className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
          If you did not find your answer, feel free to contact{" "}
          <span className="pl-1">
            <SupportModal />
          </span>
          .
        </div>
      </div>

      <div className="py-12">
        {/* Questions */}
        <Question
          value="1"
          title="What is point of StudyEnglish?"
          content="Main goal of StudyEnglish is to improve English for anyone who is willing to give it a try."
          isOpen={open === "1"}
          toggle={toggleAccordion}
        />
        <Question
          value="2"
          title="Will articles be updated?"
          content="Yes, we do plan to add more articles over time."
          isOpen={open === "2"}
          toggle={toggleAccordion}
        />
        <Question
          value="3"
          title="Is it for free?"
          content="Definitely, everything here is for FREE. If you decide to create an account, you get some benefits."
          isOpen={open === "3"}
          toggle={toggleAccordion}
        />
      </div>
    </section>
  );
};

export default HomeFaq;
