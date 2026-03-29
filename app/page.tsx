import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';

const faqs = [
  {
    question: "What is the Cambridge Rambling Club?",
    answer: "The Cambridge Rambling Club organises walks and social events, not only in the Cambridge area, but all over the country and even occasionally in Europe.",
  },
  {
    question: "Is the Club part of the Ramblers Association?",
    answer: "Only slightly! The Club is separate from the Ramblers Association but is an affiliated member, supporting its work on maintaining and improving rights of way. Many Club members do however belong to both organisations. The Club is also an affiliated member of HF Holidays.",
  },
  {
    question: "What walks does the Club provide?",
    answer: "The Club generally offers a choice of two or three walks on Sundays, four on Wednesdays and one on summer Thursday evenings. Sunday A walks cover 14–16 miles at a brisk pace. Sunday B walks are 10–12 miles at a moderate pace. Sunday C walks are 4–6 miles at a leisurely pace. Wednesday walks range from 4 to 14 miles depending on grade. Thursday evening walks run from May to August and are 5–6 miles long.",
  },
  {
    question: "How long are the walks?",
    answer: "Sunday A: 13-16 miles, brisk/moderate pace. Sunday B: 10-12 miles, moderate pace. Sunday C: 4-6 miles, leisurely pace. Wednesday A: 11-14 miles, moderate pace. Wednesday B (all day): 6.5-8 miles. Wednesday B (morning): 5.5-6.5 miles. Wednesday C: up to 4 miles, morning only. Thursday evenings: 5-6 miles.",
  },
  {
    question: "Can non-members attend walks?",
    answer: "Visitors and non-members are very welcome, but we ask regular attendees to pay the nominal subscription and join the Club. Anyone coming on a Club trip is required to be a member for insurance purposes.",
  },
  {
    question: "Do I have to book to come on a walk?",
    answer: "You do need to give advance notice of your intention to attend most Club walks. The Club recommends a text, phone call or email to the leader. If you need a lift or can offer one please let the walk leader know in advance.",
  },
  {
    question: "Can I bring my dog on a walk?",
    answer: "The presence of dogs is only at the discretion of the walk leader. Many walks will be unsuitable if your dog is unable to negotiate stiles and locked gates. Please check with leaders ahead of the walk. Only assistance dogs are allowed on Wednesday C walks.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        <h2 className="text-2xl font-bold text-stone-900 mb-2">About the Club</h2>
        <p className="text-stone-500 mb-10">Everything you need to know about walking with us.</p>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-6">
              <h3 className="font-semibold text-stone-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

      </div>

      <CTASection />
    </>
  );
}