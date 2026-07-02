import './_group.css';

const steps = [
  { title: "Consultation", desc: "Understanding your vision, lifestyle, and land." },
  { title: "Design", desc: "Collaborative architecture and interior material selection." },
  { title: "Build", desc: "Transparent, high-quality construction by our family team." },
  { title: "Completion", desc: "The final reveal of your completed luxury home." },
];

export function ConnectedTimeline() {
  return (
    <div className="jh-scope">
      <style>{`
        .timeline-section {
          background: var(--color-bg);
          padding: clamp(80px, 10vw, 160px) 0;
          position: relative;
        }

        .timeline-header {
          margin-bottom: clamp(64px, 8vw, 100px);
          text-align: center;
        }

        .timeline-header .jh-eyebrow {
          color: var(--color-warm);
        }

        .timeline-container {
          display: flex;
          position: relative;
        }

        .timeline-track {
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--color-border);
          z-index: 1;
        }

        .timeline-step {
          flex: 1;
          position: relative;
          z-index: 2;
          padding-right: 32px;
          cursor: default;
        }

        .timeline-num {
          font-family: var(--font-heading);
          font-size: 56px;
          font-style: italic;
          color: rgba(0, 0, 0, 0.04);
          height: 60px;
          display: flex;
          align-items: flex-end;
          line-height: 0.8;
          transition: color 0.4s ease;
          padding-left: 2px;
        }

        .timeline-node-container {
          height: 1px;
          position: relative;
          margin-bottom: 40px;
        }

        .timeline-node {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 9px;
          height: 9px;
          background: var(--color-warm);
          border-radius: 50%;
          box-shadow: 0 0 0 4px var(--color-bg);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .timeline-node::before {
          content: '';
          position: absolute;
          top: -12px; 
          left: -12px; 
          right: -12px; 
          bottom: -12px;
          border: 1px solid var(--color-warm);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .timeline-step:hover .timeline-node {
          transform: translateY(-50%) scale(1.2);
        }

        .timeline-step:hover .timeline-node::before {
          opacity: 1;
          transform: scale(1);
        }

        .timeline-step:hover .timeline-num {
          color: var(--color-warm);
        }

        .timeline-title {
          font-family: var(--font-heading);
          font-size: 28px;
          color: var(--color-dark);
          margin-bottom: 16px;
        }

        .timeline-desc {
          font-family: var(--font-body);
          font-size: 16px;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .timeline-header {
            text-align: left;
          }
          
          .timeline-container {
            flex-direction: column;
            gap: 48px;
          }

          .timeline-track {
            top: 0;
            bottom: 0;
            left: 5px;
            width: 1px;
            height: auto;
          }

          .timeline-step {
            padding-left: 40px;
            padding-right: 0;
            display: flex;
            flex-direction: column;
          }

          .timeline-num {
            font-size: 40px;
            height: auto;
            line-height: 1;
            margin-bottom: 12px;
          }

          .timeline-node-container {
            position: absolute;
            top: 16px;
            left: 5px;
            margin-bottom: 0;
            width: 1px;
          }

          .timeline-node {
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .timeline-step:hover .timeline-node {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
      
      <section className="timeline-section">
        <div className="jh-container">
          <div className="timeline-header">
            <span className="jh-eyebrow">Our Process</span>
            <h2 className="jh-heading-lg">How we build with you</h2>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-track"></div>
            
            {steps.map((step, i) => {
              const num = String(i + 1).padStart(2, '0');
              return (
                <div key={i} className="timeline-step">
                  <div className="timeline-num">{num}</div>
                  <div className="timeline-node-container">
                    <div className="timeline-node"></div>
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
