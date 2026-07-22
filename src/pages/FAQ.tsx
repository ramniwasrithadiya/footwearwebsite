export function FAQ() {
  const faqs = [
    {
      question: "What is your Minimum Order Quantity (MOQ) for wholesale?",
      answer: "Our standard MOQ is 50 pairs. You can mix and match different sizes and colors to meet this minimum."
    },
    {
      question: "Do you offer custom branding or private labeling?",
      answer: "Yes, we offer custom embossing and private labeling for bulk orders exceeding 200 pairs. Please mention this requirement in your wholesale enquiry."
    },
    {
      question: "What is the typical manufacturing timeline for bulk orders?",
      answer: "Standard bulk orders are typically manufactured and dispatched within 15-20 business days. Custom branded orders may require an additional 5-7 days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship across India. We plan to expand to international shipping in the near future."
    },
    {
      question: "What materials do you use for your footwear?",
      answer: "We source premium full-grain leathers, high-grade suede, and durable rubber/leather soles. All materials are ethically sourced and rigorously quality checked."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-rose-950 mb-4">Frequently Asked Questions</h1>
        <p className="text-rose-700 text-lg font-light">Everything you need to know about our products and bulk ordering process.</p>
      </div>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-8 border border-rose-100 shadow-sm">
            <h3 className="text-xl font-medium text-rose-950 mb-3">{faq.question}</h3>
            <p className="text-rose-800 leading-relaxed font-light">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
