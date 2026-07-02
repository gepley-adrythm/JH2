import './_group.css';

const steps = [
  { 
    num: "01",
    title: "Consultation", 
    desc: "Understanding your vision, lifestyle, and land." 
  },
  { 
    num: "02",
    title: "Design", 
    desc: "Collaborative architecture and interior material selection." 
  },
  { 
    num: "03",
    title: "Build", 
    desc: "Transparent, high-quality construction by our family team." 
  },
  { 
    num: "04",
    title: "Completion", 
    desc: "The final reveal of your completed luxury home.",
    featured: true
  },
];

export function FeaturedBento() {
  return (
    <div className="jh-scope">
      <style>{`
        .bento-section {
          background-color: var(--color-bg);
          padding: clamp(80px, 10vw, 160px) 0;
          color: var(--color-text);
        }
        .bento-header {
          margin-bottom: 64px;
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 24px;
        }
        
        .bento-card {
          background-color: var(--color-cream);
          border-radius: 12px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s ease;
        }
        
        .bento-card:hover {
          transform: translateY(-4px);
        }
        
        .bento-num {
          font-family: var(--font-heading);
          font-size: 24px;
          color: var(--color-accent);
          margin-bottom: auto;
          padding-bottom: 40px;
          font-style: italic;
        }
        
        .bento-card h3 {
          font-size: 24px;
          margin-bottom: 12px;
          color: var(--color-dark);
        }
        
        .bento-card p {
          color: var(--color-text-muted);
          font-size: 16px;
        }

        /* Positions */
        .card-01 {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
        .card-02 {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        .card-03 {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
        }
        .card-04 {
          grid-column: 3 / 4;
          grid-row: 1 / 3;
          background-color: var(--color-dark);
          color: #fff;
          justify-content: flex-end;
          padding: 48px;
        }
        
        .card-04::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          opacity: 0.6;
          z-index: 0;
          transition: opacity 0.8s ease;
        }
        
        .card-04:hover::before {
          opacity: 0.8;
          transform: scale(1.05);
        }
        
        .card-04 > * {
          position: relative;
          z-index: 1;
        }
        
        .card-04 .bento-num {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .card-04 h3 {
          color: #fff;
          font-size: 36px;
        }
        
        .card-04 p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
          }
          .card-01 { grid-column: 1 / 2; grid-row: 1 / 2; }
          .card-02 { grid-column: 2 / 3; grid-row: 1 / 2; }
          .card-03 { grid-column: 1 / 3; grid-row: 2 / 3; }
          .card-04 { grid-column: 1 / 3; grid-row: 3 / 4; min-height: 400px; }
        }
        
        @media (max-width: 600px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .card-01, .card-02, .card-03, .card-04 {
            grid-column: 1 / -1;
            grid-row: auto;
          }
          .card-04 { min-height: 350px; }
        }
      `}</style>

      <section className="bento-section">
        <div className="jh-container">
          <div className="bento-header">
            <span className="jh-eyebrow">Our Process</span>
            <h2 className="jh-heading-lg">How we build with you</h2>
          </div>
          
          <div className="bento-grid">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`bento-card card-${step.num}`}
              >
                <div className="bento-num">{step.num}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
