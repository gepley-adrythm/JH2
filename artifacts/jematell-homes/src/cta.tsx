import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { img } from "./layout";
import { ArrowRight } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z
    .string()
    .min(10, "Valid phone is required")
    .regex(/^[+()\-\s\d.]{10,}$/, "Enter a valid phone number"),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function CTA() {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema)
  });

  const onSubmit = async (data: LeadFormValues) => {
    // No-op happy path per instructions
    console.log("Lead Form Payload:", data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSuccess(true);
  };

  return (
    <section className="cta" id="contact">
      <img src={img("cta-bg.jpg")} className="cta-bg" alt="Desert landscape" />
      <div className="cta-overlay" />
      
      <div className="container">
        <div className="cta-grid">
          <div className="cta-content">
            <span className="eyebrow" style={{ color: 'var(--color-bone)' }}>Build With Us</span>
            <h2 className="heading-lg">Begin Your Build</h2>
            <p>Relax while we manage every detail, throughout the entire process. Tell us about your vision, and we’ll be in touch to schedule a consultation.</p>
          </div>
          
          <div className="cta-form-wrapper">
            <div className="lead-form">
              {success ? (
                <div className="form-success">
                  <h3 className="heading-md" style={{ color: '#fff', marginBottom: '16px' }}>Thank you.</h3>
                  <p>Your message has been received. We will be in touch shortly to discuss your home.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input 
                      id="name"
                      type="text" 
                      placeholder=" " 
                      data-testid="form-name"
                      {...register("name")} 
                    />
                    <label htmlFor="name">Full Name *</label>
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <input 
                      id="email"
                      type="email" 
                      placeholder=" " 
                      data-testid="form-email"
                      {...register("email")} 
                    />
                    <label htmlFor="email">Email Address *</label>
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <input 
                      id="phone"
                      type="tel" 
                      placeholder=" " 
                      {...register("phone")} 
                    />
                    <label htmlFor="phone">Phone Number *</label>
                    {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                  </div>
                  
                  <div className="form-group">
                    <textarea 
                      id="message"
                      placeholder=" " 
                      {...register("message")} 
                    />
                    <label htmlFor="message">Tell us about your project</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '16px' }}
                    data-testid="cta-button"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"} <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
