import './_group.css';

const steps = [
  { title: "Consultation", desc: "Understanding your vision, lifestyle, and land." },
  { title: "Design", desc: "Collaborative architecture and interior material selection." },
  { title: "Build", desc: "Transparent, high-quality construction by our family team." },
  { title: "Completion", desc: "The final reveal of your completed luxury home." },
];

export function Current() {
  return (
    <div className="jh-scope">
      <section className="process">
        <div className="jh-container">
          <span className="jh-eyebrow">Our Process</span>
          <h2 className="jh-heading-lg">How we build with you</h2>
          <div className="process-grid">
            {steps.map((step, i) => (
              <div key={i} className="process-card">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
