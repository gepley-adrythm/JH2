import './_group.css';

const steps = [
  { title: "Consultation", desc: "Understanding your vision, lifestyle, and land." },
  { title: "Design", desc: "Collaborative architecture and interior material selection." },
  { title: "Build", desc: "Transparent, high-quality construction by our family team." },
  { title: "Completion", desc: "The final reveal of your completed luxury home." },
];

export function StackedMilestones() {
  return (
    <div className="jh-scope">
      <style>{`
        .stacked-process {
          background-color: var(--color-bg);
          padding: clamp(100px, 15vw, 200px) 0;
          color: var(--color-text);
          position: relative;
          overflow: hidden;
        }

        .stacked-process .jh-eyebrow {
          color: var(--color-warm);
        }

        .stacked-process .header-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto clamp(80px, 12vw, 160px);
        }

        .milestones-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Connecting line */
        .milestones-container::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: var(--color-border);
          transform: translateX(-50%);
        }

        .milestone-item {
          display: flex;
          align-items: center;
          margin-bottom: clamp(60px, 10vw, 120px);
          position: relative;
        }
        
        .milestone-item:last-child {
          margin-bottom: 0;
        }

        .milestone-content {
          width: 50%;
          padding: 0 64px;
          position: relative;
        }

        .milestone-numeral {
          font-family: var(--font-heading);
          font-size: clamp(120px, 20vw, 240px);
          line-height: 0.8;
          color: rgba(140, 90, 69, 0.08); /* warm color, very transparent */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 0;
          pointer-events: none;
        }

        .milestone-text {
          position: relative;
          z-index: 1;
        }

        .milestone-item h3 {
          font-size: clamp(32px, 4vw, 48px);
          margin-bottom: 24px;
          color: var(--color-dark);
        }

        .milestone-item p {
          font-size: clamp(16px, 2vw, 18px);
          color: var(--color-text-muted);
          max-width: 400px;
        }

        .milestone-marker {
          width: 12px;
          height: 12px;
          background: var(--color-warm);
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          box-shadow: 0 0 0 12px var(--color-bg);
          transition: transform 0.4s ease, background-color 0.4s ease;
        }

        .milestone-item:hover .milestone-marker {
          transform: translate(-50%, -50%) scale(1.3);
          background: var(--color-accent);
        }

        /* Alternating layout */
        .milestone-item:nth-child(odd) {
          flex-direction: row;
        }
        .milestone-item:nth-child(odd) .milestone-content:first-child {
          text-align: right;
        }
        .milestone-item:nth-child(odd) .milestone-content:first-child p {
          margin-left: auto;
        }
        .milestone-item:nth-child(odd) .milestone-numeral {
          right: 40px;
        }
        
        .milestone-item:nth-child(even) {
          flex-direction: row-reverse;
        }
        .milestone-item:nth-child(even) .milestone-content:first-child {
          text-align: left;
        }
        .milestone-item:nth-child(even) .milestone-numeral {
          left: 40px;
        }

        @media (max-width: 768px) {
          .milestones-container::before {
            left: 24px;
          }
          .milestone-item {
            flex-direction: column !important;
            align-items: flex-start;
          }
          .milestone-content {
            width: 100%;
            padding: 0 0 0 64px;
            text-align: left !important;
          }
          .milestone-content:first-child p {
            margin-left: 0 !important;
          }
          .milestone-marker {
            left: 24px;
            top: 24px;
            box-shadow: 0 0 0 8px var(--color-bg);
          }
          .milestone-item:hover .milestone-marker {
            transform: translate(-50%, -50%) scale(1.1);
          }
          .milestone-numeral {
            left: 40px !important;
            right: auto !important;
            top: 20px;
            transform: none;
          }
          /* Empty spacer column removal */
          .milestone-item > div:empty {
            display: none;
          }
        }
      `}</style>
      <section className="stacked-process">
        <div className="jh-container">
          <div className="header-content">
            <span className="jh-eyebrow">Our Process</span>
            <h2 className="jh-heading-lg">How we build with you</h2>
          </div>
          
          <div className="milestones-container">
            {steps.map((step, i) => (
              <div key={i} className="milestone-item">
                <div className="milestone-content">
                  <div className="milestone-numeral">0{i + 1}</div>
                  <div className="milestone-text">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
                
                <div className="milestone-marker"></div>
                <div className="milestone-content"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
