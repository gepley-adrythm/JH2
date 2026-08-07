"use client";
import type { ComponentType } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Calendar, DollarSign, FileCheck, Layers } from "lucide-react";

/**
 * "Why build with us" transparency section for the region pages. Rendered under
 * the intro ("Build A Home In <City>") and code-split, like the local guide, so
 * none of it ships to the other ContentPage routes.
 */

const FADE_IN = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const PILLARS: Array<{ icon: ComponentType<{ size?: number }>; title: string; body: string }> = [
  {
    icon: Calendar,
    title: "Weekly Progress Updates",
    body:
      "Every week of construction you get a written update: what was finished, what is scheduled next, and any decision we need from you. You never have to call and ask how your home is coming along.",
  },
  {
    icon: DollarSign,
    title: "Upfront Cost Estimates",
    body:
      "On cost-plus builds you get an itemized cost estimate before we break ground, and we share the actual subcontractor bids with you, so you can see what every part of your home costs. For our in-house plans or simpler custom homes, we can quote a flat-rate build cost up front instead.",
  },
  {
    icon: FileCheck,
    title: "A Clear Draw Schedule",
    body:
      "You get the full draw schedule at the start: which milestones release which funds, and when your lender is billed. Your financing stays predictable from foundation through final inspection.",
  },
  {
    icon: Layers,
    title: "Selection Allowance Breakdown",
    body:
      "Every allowance is itemized before you choose a single finish. Flooring, cabinets, countertops, fixtures, etc. each carry their own number, so you always know what is budgeted and what an upgrade actually costs.",
  },
];

export function WhyBuild() {
  return (
    <section className="why-build section-pad" data-testid="why-build">
      <div className="container">
        <m.div className="page-section-head centered" {...FADE_IN}>
          <h2 className="heading-lg why-build-h2">The Most Transparent Builder You Will Work With</h2>
          <p className="why-build-lead">
            Most homeowners find out about a cost overrun after it has already happened. We work the other way
            around. Before you break ground you know how your home is priced, what your draw schedule looks like,
            and what every allowance covers, all in writing. Once we start, you hear from us every week until you
            have the keys.
          </p>
        </m.div>

        <div className="why-build-grid">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <m.article
                key={p.title}
                className="why-build-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.07 }}
              >
                <div className="why-build-head">
                  <span className="why-build-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3 className="why-build-title">{p.title}</h3>
                </div>
                <p className="why-build-p">{p.body}</p>
              </m.article>
            );
          })}
        </div>

        <m.div className="why-build-footer" {...FADE_IN}>
          <Link href="/financing" className="why-build-link">
            See how construction financing works <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
