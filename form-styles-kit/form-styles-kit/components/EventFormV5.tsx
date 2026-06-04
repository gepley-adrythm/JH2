'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { loadGTM, reportConversion, getTrackingData, pushSeminarSignupItem, pushSeminarInitiateCheckout } from '../lib/analytics';
import { toSlug, getIsoDate } from '../lib/formHelpers';
import { submitEventForm } from '../lib/formSubmit';
import { formatPhone, validEmail } from '../lib/formData';
import { siteConfig } from '../lib/siteConfig';
import { useSafeTimeouts } from '../hooks/useSafeTimeouts';
import { useEvents, useVenuePhotos, type Seminar } from '../hooks/useEventData';
import { Check, ChevronLeft, ArrowRight, MapPin, Calendar, ChevronRight, X } from 'lucide-react';

type Phase = 'calendar' | 'details' | 'registration' | 'thankYou';
type RegStep = 1 | 2 | 3 | 4 | 5 | 6;
const TOTAL_STEPS = 6;

const slideVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

function parseEventDate(raw: string): Date | null {
  if (!raw) return null;
  const str = raw.trim();
  const yearMatch = str.match(/\b(20\d{2})\b/);
  const explicitYear = yearMatch ? parseInt(yearMatch[1], 10) : null;
  let d = new Date(str);
  if (!isNaN(d.getTime()) && explicitYear) {
    if (d.getFullYear() !== explicitYear) d.setFullYear(explicitYear);
    return d;
  }
  if (!isNaN(d.getTime()) && !explicitYear) {
    if (d < new Date()) d.setFullYear(d.getFullYear() + 1);
    return d;
  }
  const alt = str.match(/^(\w+)\s+(\d{1,2}),?\s*(20\d{2})?\s*(?:at\s*)?(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (alt) {
    const months: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const m = months[alt[1].toLowerCase().substring(0, 3)];
    if (m !== undefined) {
      const day = parseInt(alt[2], 10);
      const year = alt[3] ? parseInt(alt[3], 10) : new Date().getFullYear();
      let hour = parseInt(alt[4], 10);
      const minute = parseInt(alt[5], 10);
      const ampm = (alt[6] || 'AM').toUpperCase();
      if (ampm === 'PM' && hour !== 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      return new Date(year, m, day, hour, minute);
    }
  }
  return isNaN(d.getTime()) ? null : d;
}

function formatSeminarDate(raw: string, dayLabel?: string): string {
  const d = parseEventDate(raw);
  if (d) {
    const time = d.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Phoenix' });
    const date = d.toLocaleString('en-US', { month: 'short', day: '2-digit', timeZone: 'America/Phoenix' });
    const weekday = dayLabel || d.toLocaleString('en-US', { weekday: 'long', timeZone: 'America/Phoenix' });
    return `${weekday}, ${date}, ${time}`;
  }
  return dayLabel ? `${dayLabel}, ${raw}` : String(raw);
}

const MONTH_ABBRS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDateParts(raw: string) {
  const d = parseEventDate(raw);
  if (!d) return { month: '', day: '' };
  return { month: MONTH_ABBRS[d.getMonth()], day: String(d.getDate()).padStart(2, '0') };
}

function getDayTimeStr(raw: string, dayLabel?: string): string {
  const dateLabel = formatSeminarDate(raw, dayLabel);
  const weekday = dayLabel || '';
  const timeMatch = dateLabel.match(/(\d{1,2}:\d{2}\s*[AP]M)/i);
  const timeStr = timeMatch ? timeMatch[1] : '';
  let result = weekday;
  if (timeStr) result += (result ? ', ' : '') + timeStr;
  return result;
}

function hasAutoOpenParams(initialParams?: EventV5Props['initialParams']): boolean {
  if (initialParams?.city) return true;
  return false;
}

function renderYesNoChipsFn(
  value: string,
  onSelect: (v: 'yes' | 'no') => void,
  testIdPrefix: string,
) {
  return (
    <div className="flex flex-col gap-3">
      {(['yes', 'no'] as const).map(v => (
        <m.button
          key={v}
          data-testid={`${testIdPrefix}-${v}`}
          type="button"
          onClick={() => onSelect(v)}
          className="w-full px-6 py-5 md:py-6 rounded-xl font-sans text-lg md:text-xl font-medium transition-all duration-200 cursor-pointer text-center"
          style={{
            background: value === v ? 'rgba(212,168,83,1)' : 'rgba(255,255,255,0.95)',
            color: value === v ? '#fff' : '#091a33',
            border: value === v ? '2px solid rgba(212,168,83,0.8)' : '2px solid rgba(255,255,255,0.6)',
            boxShadow: value === v ? '0 4px 20px rgba(212,168,83,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          {v === 'yes' ? 'Yes' : 'No'}
        </m.button>
      ))}
    </div>
  );
}

interface RegistrationFormProps {
  regStep: RegStep;
  setRegStep: (step: RegStep) => void;
  selectedSeminar: Seminar | null;
  onComplete: () => void;
  onBackToDetails: () => void;
  safeTimeout: (fn: () => void, ms: number) => void;
}

function RegistrationForm({ regStep, setRegStep, selectedSeminar, onComplete, onBackToDetails, safeTimeout }: RegistrationFormProps) {
  const [fullName, setFullName] = useState('');
  const [married, setMarried] = useState<'yes' | 'no' | ''>('');
  const [spouseName, setSpouseName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [livingTrust, setLivingTrust] = useState<'yes' | 'no' | ''>('');
  const [bringGuest, setBringGuest] = useState<'yes' | 'no' | ''>('');
  const [guestName, setGuestName] = useState('');
  const [age, setAge] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const formSubmittedRef = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const spouseRef = useRef<HTMLInputElement>(null);
  const guestNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (regStep === 1) {
      safeTimeout(() => nameRef.current?.focus(), 500);
    }
  }, []);

  const goToStep = useCallback((step: RegStep) => {
    setRegStep(step);
    setFormErrors({});
    if (step === 1) safeTimeout(() => nameRef.current?.focus(), 400);
    else if (step === 3) safeTimeout(() => phoneRef.current?.focus(), 400);
    else if (step === 6) safeTimeout(() => ageRef.current?.focus(), 400);
  }, [setRegStep, safeTimeout]);

  const nextStep = useCallback(() => {
    const errs: Record<string, string> = {};
    if (regStep === 1) {
      if (!fullName.trim()) { errs.fullName = 'Please enter your name'; setFormErrors(errs); return; }
    }
    if (regStep === 2) {
      if (!married) { errs.married = 'Please select an option'; setFormErrors(errs); return; }
      if (married === 'yes' && !spouseName.trim()) { errs.spouseName = 'Please enter spouse name'; setFormErrors(errs); return; }
    }
    if (regStep === 3) {
      if (!email.trim() || !validEmail(email)) errs.email = 'Please enter a valid email';
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 10) errs.phone = 'Please enter a valid phone number';
      if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    }
    if (regStep === 4) {
      if (!livingTrust) return;
    }
    if (regStep === 5) {
      if (!bringGuest) return;
    }
    setFormErrors({});
    const next = (regStep + 1) as RegStep;
    if (next <= TOTAL_STEPS) {
      goToStep(next);
    }
  }, [regStep, fullName, married, spouseName, email, phone, livingTrust, bringGuest, goToStep]);

  const prevStep = useCallback(() => {
    if (regStep === 1) {
      onBackToDetails();
      return;
    }
    goToStep((regStep - 1) as RegStep);
  }, [regStep, onBackToDetails, goToStep]);

  const handleMarriageSelect = useCallback((value: 'yes' | 'no') => {
    setMarried(value);
    setFormErrors({});
    if (value === 'no') {
      setSpouseName('');
      safeTimeout(() => {
        setRegStep(3);
        safeTimeout(() => phoneRef.current?.focus(), 400);
      }, 300);
    } else {
      safeTimeout(() => spouseRef.current?.focus(), 300);
    }
  }, [safeTimeout, setRegStep]);

  const handleLivingTrustSelect = useCallback((value: 'yes' | 'no') => {
    setLivingTrust(value);
    safeTimeout(() => {
      setRegStep(5);
    }, 300);
  }, [safeTimeout, setRegStep]);

  const handleGuestSelect = useCallback((value: 'yes' | 'no') => {
    setBringGuest(value);
    if (value === 'no') {
      setGuestName('');
      safeTimeout(() => {
        setRegStep(6);
        safeTimeout(() => ageRef.current?.focus(), 400);
      }, 300);
    } else {
      safeTimeout(() => guestNameRef.current?.focus(), 300);
    }
  }, [safeTimeout, setRegStep]);

  const buildMessageField = useCallback(() => {
    if (!selectedSeminar) return '';
    let msg = `Venue: ${selectedSeminar.venue}\n`;
    msg += `Date: ${formatSeminarDate(selectedSeminar.eventdate, selectedSeminar.dayofweek)}\n`;
    msg += `Age: ${age}\n`;
    msg += `Living Trust: ${livingTrust === 'yes' ? 'Yes' : 'No'}\n`;
    msg += `Married: ${married === 'yes' ? 'Yes' : 'No'}\n`;
    if (married === 'yes' && spouseName) msg += `Spouse: ${spouseName}\n`;
    msg += `Bringing Guest: ${bringGuest === 'yes' ? 'Yes' : 'No'}\n`;
    if (bringGuest === 'yes' && guestName) {
      msg += `Guest Name: ${guestName}\n`;
      if (siteConfig.event.guestIncentiveTag) {
        msg += `${siteConfig.event.guestIncentiveTag}\n`;
      }
    }
    return msg;
  }, [selectedSeminar, age, livingTrust, married, spouseName, bringGuest, guestName]);

  const handleSubmit = useCallback(async () => {
    if (formSubmittedRef.current || isSubmitting) return;
    const ageVal = parseInt(age, 10);
    if (!age || isNaN(ageVal) || ageVal < 18 || ageVal > 120) {
      setFormErrors({ age: 'Please enter a valid age (18-120)' });
      return;
    }
    setFormErrors({});
    formSubmittedRef.current = true;
    setIsSubmitting(true);

    reportConversion({ name: fullName, email, phone }, 'seminar_signup', true, siteConfig.conversionValue.seminarSignup);

    if (selectedSeminar) {
      pushSeminarSignupItem(toSlug(selectedSeminar.city), getIsoDate(selectedSeminar.eventdate), siteConfig.conversionValue.seminarSignup);
    }

    const tracking = getTrackingData();

    try {
      const result = await submitEventForm({
        name: fullName,
        email,
        phone,
        message: buildMessageField(),
        smsOptIn,
        campaign: selectedSeminar?.campaign || '',
        leadType: 'Seminar',
        tracking,
      });
      if (!result.success) {
        console.error('Form submission error:', result.error);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
    setIsSubmitting(false);
    onComplete();
  }, [age, fullName, email, phone, smsOptIn, selectedSeminar, buildMessageField, isSubmitting, onComplete]);

  const handleEnter = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); nextStep(); }
  }, [nextStep]);

  const handleAgeEnter = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); }
  }, [handleSubmit]);

  switch (regStep) {
    case 1: return (
      <m.div key="reg-name" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
        <div className="mb-8 md:mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }} data-testid="step-title">Register for Seminar</h2>
          <p className="mt-3 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }} data-testid="step-subtitle">
            Sign up takes about 30 seconds. We just need a few details to save your spot.
          </p>
        </div>
        <div className="w-full">
          <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Your full name <span style={{ color: '#ff6b6b' }}>*</span>
          </label>
          <input
            ref={nameRef}
            data-testid="input-fullname"
            type="text"
            value={fullName}
            onChange={e => { setFullName(e.target.value); setFormErrors(prev => { const n = { ...prev }; delete n.fullName; return n; }); }}
            placeholder="John Smith"
            autoComplete="name"
            maxLength={120}
            onKeyDown={handleEnter}
            aria-label="Your full name"
            className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
            style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: formErrors.fullName ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
          />
          <AnimatePresence>
            {formErrors.fullName && (
              <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert" data-testid="error-name">{formErrors.fullName}</m.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between mt-10 md:mt-12">
          <button data-testid="button-back" type="button" onClick={prevStep} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <m.button
            data-testid="button-next"
            type="button"
            onClick={nextStep}
            disabled={!fullName.trim()}
            className="group flex items-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: '#fff', color: '#05285d' }}
            whileTap={{ scale: 0.97 }}
          >
            Next step
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </m.button>
        </div>
      </m.div>
    );
    case 2: return (
      <m.div key="reg-marriage" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 flex flex-col justify-center" style={{ paddingTop: '20vh' }}>
        <div className="mb-8 md:mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }} data-testid="step-title">Are you married?</h2>
          <p className="mt-3 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }} data-testid="step-subtitle">
            If you are married, we ask that you both attend together.
          </p>
        </div>
        {renderYesNoChipsFn(married, handleMarriageSelect, 'chip-married')}
        <AnimatePresence>
          {married === 'yes' && (
            <m.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 200 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mt-6"
            >
              <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Spouse's full name</label>
              <input
                ref={spouseRef}
                data-testid="input-spouse"
                type="text"
                value={spouseName}
                onChange={e => { setSpouseName(e.target.value); setFormErrors(prev => { const n = { ...prev }; delete n.spouseName; return n; }); }}
                placeholder="Enter spouse's name"
                autoComplete="off"
                onKeyDown={handleEnter}
                className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
                style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: formErrors.spouseName ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
              />
              <AnimatePresence>
                {formErrors.spouseName && (
                  <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert">{formErrors.spouseName}</m.p>
                )}
              </AnimatePresence>
            </m.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between mt-10 md:mt-12">
          <button data-testid="button-back" type="button" onClick={prevStep} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          {married === 'yes' && (
            <m.button
              data-testid="button-next"
              type="button"
              onClick={nextStep}
              disabled={!spouseName.trim()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="group flex items-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: '#fff', color: '#05285d' }}
              whileTap={{ scale: 0.97 }}
            >
              Next step
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </m.button>
          )}
        </div>
      </m.div>
    );
    case 3: return (
      <m.div key="reg-contact" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
        <div className="mb-6 md:mb-8">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }} data-testid="step-title">Contact Information</h2>
          <p className="mt-2 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }} data-testid="step-subtitle">
            So we can confirm your registration.
          </p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Email address <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input
              ref={emailRef}
              data-testid="input-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setFormErrors(prev => { const n = { ...prev }; delete n.email; return n; }); }}
              placeholder="john@example.com"
              autoComplete="email"
              inputMode="email"
              maxLength={100}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); phoneRef.current?.focus(); } }}
              className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
              style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: formErrors.email ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
            />
            <AnimatePresence>
              {formErrors.email && (
                <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert" data-testid="error-email">{formErrors.email}</m.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Phone number <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input
              ref={phoneRef}
              data-testid="input-phone"
              type="tel"
              value={phone}
              onChange={e => { setPhone(formatPhone(e.target.value)); setFormErrors(prev => { const n = { ...prev }; delete n.phone; return n; }); }}
              placeholder="(555) 123-4567"
              autoComplete="tel"
              inputMode="tel"
              maxLength={14}
              onKeyDown={handleEnter}
              className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
              style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: formErrors.phone ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
            />
            <AnimatePresence>
              {formErrors.phone && (
                <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert" data-testid="error-phone">{formErrors.phone}</m.p>
              )}
            </AnimatePresence>
          </div>
          <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
            <input type="checkbox" data-testid="checkbox-sms" checked={smsOptIn} onChange={e => setSmsOptIn(e.target.checked)} className="sr-only" />
            <span
              className="shrink-0 w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center transition-colors duration-200"
              style={{
                borderColor: smsOptIn ? '#fff' : 'rgba(255,255,255,0.4)',
                background: smsOptIn ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              {smsOptIn && <Check className="w-3.5 h-3.5" style={{ color: '#fff' }} />}
            </span>
            <span className="text-sm md:text-base font-sans leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>
              I'd like to receive text messages from {siteConfig.businessName} regarding event reminders and updates.
            </span>
          </label>
          <p className="pl-9 font-sans leading-snug" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>
            Messaging frequency may vary. Message and data rates may apply. You can opt out any time by texting STOP. For assistance, text HELP or visit{' '}
            <a href={siteConfig.websiteUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{siteConfig.websiteLabel}</a>.
            {' '}
            For privacy policy, visit{' '}
            <a href={siteConfig.links.privacy} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Privacy Policy</a>.
            {' '}For Terms of Service, visit{' '}
            <a href={siteConfig.links.terms} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Terms of Service</a>.
          </p>
        </div>
        <div className="flex items-center justify-between mt-8 md:mt-10">
          <button data-testid="button-back" type="button" onClick={prevStep} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <m.button
            data-testid="button-next"
            type="button"
            onClick={nextStep}
            disabled={phone.replace(/\D/g, '').length < 10 || !email.trim()}
            className="group flex items-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: '#fff', color: '#05285d' }}
            whileTap={{ scale: 0.97 }}
          >
            Next step
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </m.button>
        </div>
      </m.div>
    );
    case 4: return (
      <m.div key="reg-trust" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 flex flex-col justify-center" style={{ paddingTop: '20vh' }}>
        <div className="mb-8 md:mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }} data-testid="step-title">Do you have a living trust?</h2>
        </div>
        {renderYesNoChipsFn(livingTrust, handleLivingTrustSelect, 'chip-trust')}
        <div className="flex items-center justify-between mt-10 md:mt-12">
          <button data-testid="button-back" type="button" onClick={prevStep} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <div />
        </div>
      </m.div>
    );
    case 5: return (
      <m.div key="reg-guest" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 flex flex-col justify-center" style={{ paddingTop: '20vh' }}>
        <div className="mb-8 md:mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }} data-testid="step-title">Bringing a guest?</h2>
          {siteConfig.event.guestOffer && (
            <div
              className="rounded-xl p-4 md:p-5 mt-4"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                <strong style={{ color: '#ffd700' }}>Special Offer:</strong> {siteConfig.event.guestOffer}
              </p>
            </div>
          )}
        </div>
        {renderYesNoChipsFn(bringGuest, handleGuestSelect, 'chip-guest')}
        <AnimatePresence>
          {bringGuest === 'yes' && (
            <m.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 200 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mt-6"
            >
              <label className="block text-base font-sans font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>Guest's full name</label>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Someone other than your spouse</p>
              <input
                ref={guestNameRef}
                data-testid="input-guestname"
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                placeholder="e.g. Jane Smith"
                autoComplete="off"
                className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
                style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
              />
            </m.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between mt-10 md:mt-12">
          <button data-testid="button-back" type="button" onClick={prevStep} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          {bringGuest === 'yes' && (
            <m.button
              data-testid="button-next-guest"
              type="button"
              onClick={() => { setRegStep(6); safeTimeout(() => ageRef.current?.focus(), 400); }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="group flex items-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer"
              style={{ background: '#fff', color: '#05285d' }}
              whileTap={{ scale: 0.97 }}
            >
              Next step
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </m.button>
          )}
        </div>
      </m.div>
    );
    case 6: {
      const ageVal = parseInt(age, 10);
      const canSubmit = !!age && !isNaN(ageVal) && ageVal >= 18 && ageVal <= 120;
      return (
        <m.div key="reg-final" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
          <div className="mb-8 md:mb-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }} data-testid="step-title">Almost done!</h2>
            <p className="mt-3 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }} data-testid="step-subtitle">
              Our seminars are tailored for those 55 and older, but anyone seeking guidance on estate planning is welcome.
            </p>
          </div>
          <div className="w-full">
            <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Your age <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input
              ref={ageRef}
              data-testid="input-age"
              type="number"
              value={age}
              onChange={e => { setAge(e.target.value); setFormErrors(prev => { const n = { ...prev }; delete n.age; return n; }); }}
              placeholder="Enter your age"
              min={18}
              max={120}
              inputMode="numeric"
              onKeyDown={handleAgeEnter}
              className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
              style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: formErrors.age ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
            />
            <AnimatePresence>
              {formErrors.age && (
                <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert">{formErrors.age}</m.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between mt-10 md:mt-12">
            <button data-testid="button-back" type="button" onClick={prevStep} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <m.button
              data-testid="button-submit"
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="group flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: '#fff', color: '#05285d' }}
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? (
                <>
                  <m.div
                    className="w-5 h-5 border-2 rounded-full"
                    style={{ borderColor: '#05285d', borderTopColor: 'transparent' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Registering...
                </>
              ) : (
                'Register for Seminar'
              )}
            </m.button>
          </div>
        </m.div>
      );
    }
    default: return null;
  }
}

interface EventV5Props {
  onClose?: () => void;
  initialParams?: {
    city?: string;
    date?: string;
    venue?: string;
    campaign?: string;
    autoOpen?: boolean;
    skipToForm?: boolean;
    venuePhotoUrl?: string;
  };
}

export default function EventV5({ onClose, initialParams }: EventV5Props = {}) {
  const { safeTimeout } = useSafeTimeouts();
  const willAutoOpen = useMemo(() => hasAutoOpenParams(initialParams), []);
  const [phase, setPhase] = useState<Phase>('calendar');
  const [autoOpenResolved, setAutoOpenResolved] = useState(!willAutoOpen);
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>([]);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bgLoaded, setBgLoaded] = useState(!!initialParams?.venuePhotoUrl);
  const [venuePhotoUrl, setVenuePhotoUrl] = useState<string | null>(initialParams?.venuePhotoUrl || null);

  const { data: seminars = [], isLoading: loading, error: eventsError } = useEvents();
  const error = eventsError ? 'Unable to load events. Please refresh the page.' : '';
  const { data: venuePhotosData } = useVenuePhotos();

  useEffect(() => {
    if (bgLoaded) {
      try {
        window.parent.postMessage({ source: 'formKit', action: 'bgReady' }, '*');
      } catch (e) {}
    }
  }, [bgLoaded]);

  const lookupVenuePhoto = useCallback((sem: Seminar) => {
    if (!sem.venue || !sem.address || !venuePhotosData) return;
    const match = venuePhotosData.find(
      (vp) =>
        vp.venue?.toLowerCase() === sem.venue.toLowerCase() ||
        vp.address?.toLowerCase() === sem.address.toLowerCase()
    );
    if (match?.photoUrl) setVenuePhotoUrl(match.photoUrl);
  }, [venuePhotosData]);

  const handleVenueImgError = useCallback(() => {
    setBgLoaded(false);
    setVenuePhotoUrl(null);
  }, []);

  const [regStep, setRegStep] = useState<RegStep>(1);

  useEffect(() => {
    loadGTM();
  }, []);

  const autoOpenHandledRef = useRef(false);
  useEffect(() => {
    if (!loading && seminars.length > 0 && !autoOpenHandledRef.current) {
      autoOpenHandledRef.current = true;
      setFilteredSeminars(seminars);
      handleAutoOpen(seminars);
    }
  }, [loading, seminars]);

  useEffect(() => {
    if (selectedSeminar && venuePhotosData && !venuePhotoUrl) {
      lookupVenuePhoto(selectedSeminar);
    }
  }, [venuePhotosData, selectedSeminar, venuePhotoUrl, lookupVenuePhoto]);

  const handleAutoOpen = useCallback((data: Seminar[]) => {
    const params = new URLSearchParams(window.location.search);
    const autoOpen = initialParams?.autoOpen ?? params.get('autoOpen') === 'true';
    const skipToForm = initialParams?.skipToForm ?? params.get('skipToForm') === 'true';
    const targetCity = initialParams?.city || params.get('city');
    const targetDate = initialParams?.date || params.get('date');
    const targetVenue = initialParams?.venue || params.get('venue');
    const targetCampaign = initialParams?.campaign || params.get('campaign');
    if (targetCity && !autoOpen && !targetDate && !targetVenue) {
      const cityEvents = data.filter(s => s.city && s.city.trim().toLowerCase() === targetCity.toLowerCase());
      if (cityEvents.length === 1) {
        const sem = { ...cityEvents[0] };
        if (targetCampaign) sem.campaign = targetCampaign;
        setSelectedSeminar(sem);
        if (!venuePhotoUrl) lookupVenuePhoto(sem);
        setPhase('details');
      } else if (cityEvents.length > 0) {
        setSelectedCity(targetCity);
        setFilteredSeminars(cityEvents);
      }
      setAutoOpenResolved(true);
      return;
    }

    if (autoOpen && targetCity && data.length > 0) {
      const match = data.find(s => {
        const cityMatches = s.city && s.city.toLowerCase() === targetCity.toLowerCase();
        const dateMatches = !targetDate || (s.eventdate && (s.eventdate === targetDate || (targetDate.includes('T') ? false : s.eventdate.split('T')[0] === targetDate.split('T')[0])));
        const venueMatches = !targetVenue || (s.venue && s.venue.toLowerCase().includes(targetVenue.toLowerCase()));
        return cityMatches && dateMatches && venueMatches;
      });
      if (match) {
        const sem = { ...match };
        if (targetCampaign) sem.campaign = targetCampaign;
        setSelectedSeminar(sem);
        if (!venuePhotoUrl) lookupVenuePhoto(sem);
        if (skipToForm) {
          setPhase('registration');
          setRegStep(1);
          pushSeminarInitiateCheckout(toSlug(sem.city), getIsoDate(sem.eventdate));
        } else {
          setPhase('details');
        }
      }
    }
    setAutoOpenResolved(true);
  }, []);

  const cities = useMemo(() => {
    const set = new Set<string>();
    seminars.forEach(s => { if (s.city) set.add(s.city.trim()); });
    return ['All', ...Array.from(set).sort()];
  }, [seminars]);

  const [itemsPerPage, setItemsPerPage] = useState(6);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 768) setItemsPerPage(3);
      else if (w <= 1199) setItemsPerPage(4);
      else setItemsPerPage(6);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const totalPages = useMemo(() => Math.ceil(filteredSeminars.length / itemsPerPage), [filteredSeminars, itemsPerPage]);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSeminars.slice(start, start + itemsPerPage);
  }, [filteredSeminars, currentPage, itemsPerPage]);

  const filterByCity = useCallback((city: string) => {
    setSelectedCity(city);
    setCurrentPage(1);
    if (city === 'All') {
      setFilteredSeminars([...seminars]);
    } else {
      const filtered = seminars.filter(s => s.city && s.city.trim() === city);
      if (filtered.length === 1) {
        const sem = filtered[0];
        setSelectedSeminar(sem);
        setVenuePhotoUrl(null);
        lookupVenuePhoto(sem);
        setPhase('details');
        return;
      }
      setFilteredSeminars(filtered);
    }
  }, [seminars, lookupVenuePhoto]);

  const selectEvent = useCallback((sem: Seminar) => {
    setSelectedSeminar(sem);
    setVenuePhotoUrl(null);
    setPhase('details');
    lookupVenuePhoto(sem);
  }, [lookupVenuePhoto]);

  const startRegistration = useCallback(() => {
    setRegStep(1);
    setPhase('registration');
    if (selectedSeminar) {
      pushSeminarInitiateCheckout(toSlug(selectedSeminar.city), getIsoDate(selectedSeminar.eventdate));
    }
  }, [selectedSeminar]);

  const backToCalendar = useCallback(() => {
    setSelectedSeminar(null);
    setPhase('calendar');
    setCurrentPage(1);
  }, []);

  const backToDetails = useCallback(() => {
    setPhase('details');
  }, []);

  const getProgress = useCallback(() => regStep / TOTAL_STEPS, [regStep]);

  const getBgPosition = useCallback(() => {
    if (phase === 'calendar') return '30% 48%';
    if (phase === 'details') return '42% 46%';
    const positions: Record<number, string> = {
      1: '35% 46%',
      2: '42% 44%',
      3: '50% 46%',
      4: '56% 44%',
      5: '62% 46%',
      6: '70% 48%',
    };
    if (phase === 'registration') return positions[regStep] || '50% 46%';
    if (phase === 'thankYou') return '75% 48%';
    return '50% 46%';
  }, [phase, regStep]);

  const getVenueBgPosition = useCallback(() => {
    if (phase === 'details') return '25% 40%';
    const positions: Record<number, string> = {
      1: '32% 40%',
      2: '39% 40%',
      3: '46% 40%',
      4: '53% 40%',
      5: '60% 40%',
      6: '67% 40%',
    };
    if (phase === 'registration') return positions[regStep] || '46% 40%';
    if (phase === 'thankYou') return '75% 40%';
    return '46% 40%';
  }, [phase, regStep]);

  const getVenueDesktopScale = useCallback(() => {
    if (phase === 'details') return 1.12;
    const scales: Record<number, number> = {
      1: 1.15,
      2: 1.18,
      3: 1.14,
      4: 1.17,
      5: 1.13,
      6: 1.16,
    };
    if (phase === 'registration') return scales[regStep] || 1.15;
    if (phase === 'thankYou') return 1.1;
    return 1.15;
  }, [phase, regStep]);


  const renderEventCard = (sem: Seminar, idx: number) => {
    const { month, day } = getDateParts(sem.eventdate);
    const dayTime = getDayTimeStr(sem.eventdate, sem.dayofweek);
    return (
      <m.button
        key={`${sem.city}-${sem.eventdate}-${idx}`}
        data-testid={`event-card-${idx}`}
        onClick={() => selectEvent(sem)}
        className="relative text-left rounded-xl cursor-pointer w-full hover:brightness-110"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: 'clamp(16px, 2vw, 24px)',
          paddingRight: 'clamp(80px, 10vw, 100px)',
          minHeight: '110px',
          transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        }}
        whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.07, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col gap-1">
          <span className="font-serif text-xl md:text-2xl font-normal" style={{ color: '#fff' }} data-testid={`event-city-${idx}`}>{sem.city}</span>
          <span className="text-base md:text-lg font-sans" style={{ color: 'rgba(255,255,255,0.8)' }}>{dayTime}</span>
          <span className="text-sm md:text-base font-sans truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>{sem.venue || ''}</span>
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>{month}</span>
          <span className="text-3xl md:text-4xl font-serif font-normal leading-none" style={{ color: '#fff' }}>{day}</span>
        </div>
      </m.button>
    );
  };

  const renderCalendarView = () => (
    <m.div
      key="calendar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 md:px-8 lg:px-10 pb-16"
    >
      <div className="pt-10 md:pt-14 pb-6 md:pb-8 max-w-[1400px] mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-2" style={{ color: '#fff' }} data-testid="calendar-title">
          <span className="hidden md:inline">{siteConfig.event.calendarHeadingLong}</span>
          <span className="md:hidden">{siteConfig.event.calendarHeading}</span>
        </h2>
        <p className="text-lg md:text-xl font-sans" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {siteConfig.event.calendarSubheading}
        </p>
      </div>

      {cities.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8 max-w-[1400px] mx-auto" data-testid="filter-chips">
          {cities.map(city => (
            <button
              key={city}
              data-testid={`filter-chip-${city.replace(/\s+/g, '-')}`}
              onClick={() => filterByCity(city)}
              className="px-5 py-2.5 rounded-lg text-sm md:text-base font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                background: selectedCity === city
                  ? 'rgba(212,168,83,1)'
                  : 'rgba(255,255,255,0.92)',
                color: selectedCity === city
                  ? '#fff'
                  : '#091a33',
                border: selectedCity === city
                  ? '1.5px solid rgba(212,168,83,0.8)'
                  : '1.5px solid rgba(255,255,255,0.5)',
                boxShadow: selectedCity === city
                  ? '0 2px 12px rgba(212,168,83,0.3)'
                  : '0 1px 4px rgba(0,0,0,0.1)',
              }}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-16">
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.4)', animation: `dot-pulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-center py-8 italic" style={{ color: 'rgba(255,255,255,0.7)' }} data-testid="error-message">{error}</p>
      )}

      {!loading && !error && filteredSeminars.length === 0 && (
        <p className="text-center py-8 italic" style={{ color: 'rgba(255,255,255,0.7)' }} data-testid="no-events">No upcoming events found for the selected filter.</p>
      )}

      {!loading && !error && filteredSeminars.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 max-w-[1400px] mx-auto" data-testid="events-grid">
            {pageItems.map((sem, i) => renderEventCard(sem, i))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-8 max-w-[1400px] mx-auto" data-testid="pagination">
              <button
                data-testid="prev-page"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-base font-sans font-medium transition-opacity duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 p-0"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span className="text-sm font-sans" style={{ color: 'rgba(255,255,255,0.5)' }}>Page {currentPage} of {totalPages}</span>
              <button
                data-testid="next-page"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-base font-sans font-medium transition-opacity duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 p-0"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </m.div>
  );

  const renderDetailsView = () => {
    if (!selectedSeminar) return null;
    const dateLabel = formatSeminarDate(selectedSeminar.eventdate, selectedSeminar.dayofweek);
    return (
      <m.div
        key="details"
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        className="w-full max-w-xl lg:max-w-2xl mx-auto px-6 md:px-8 my-auto pt-12 md:pt-16"
      >
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 md:mb-10"
        >
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight"
            style={{ color: '#fff' }}
            data-testid="event-detail-title"
          >
            {siteConfig.event.title}
          </h1>
          <p
            className="mt-3 font-serif text-xl md:text-2xl lg:text-3xl font-normal"
            style={{ color: 'rgba(255,255,255,0.8)' }}
            data-testid="event-detail-venue"
          >
            at {selectedSeminar.venue}
          </p>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-lg md:text-xl leading-relaxed mb-8 md:mb-10"
          style={{ color: 'rgba(255,255,255,0.75)' }}
          data-testid="event-detail-description"
        >
          {siteConfig.event.description}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mb-10 md:mb-12 space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Calendar className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </div>
            <div>
              <p className="text-sm font-sans font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Date & Time</p>
              <p className="text-lg md:text-xl font-sans" style={{ color: '#fff' }} data-testid="event-detail-date">{dateLabel}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <MapPin className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.8)' }} />
            </div>
            <div>
              <p className="text-sm font-sans font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Location</p>
              <p className="text-lg md:text-xl font-sans" style={{ color: '#fff' }} data-testid="event-detail-address">{selectedSeminar.address || 'Event Address'}</p>
            </div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <m.button
            data-testid="button-signup"
            onClick={startRegistration}
            className="w-full group flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer"
            style={{ background: '#fff', color: '#05285d' }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Register for Seminar
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </m.button>
          <p className="text-center mt-3 text-sm font-sans" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Takes about 30 seconds
          </p>
        </m.div>
      </m.div>
    );
  };

  const renderThankYou = () => {
    const mapsUrl = selectedSeminar?.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSeminar.address)}`
      : '';
    return (
      <m.div
        key="thankYou"
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        className="w-full max-w-[800px] mx-auto px-6 md:px-8 py-16 md:py-24 text-center flex flex-col items-center justify-center min-h-[60vh]"
      >
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(212,168,83,0.3)', border: '2px solid rgba(255,255,255,0.2)' }}
          data-testid="icon-success"
        >
          <Check className="w-10 h-10 md:w-12 md:h-12" style={{ color: '#fff' }} />
        </m.div>
        <m.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
          style={{ color: '#fff' }}
          data-testid="text-thank-you"
        >
          Thank You for Signing Up!
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl font-sans leading-relaxed mb-6"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          We appreciate your interest in attending our seminar. A member of our team will reach out shortly to confirm your spot and share any additional details you may need.
        </m.p>
        {mapsUrl && selectedSeminar?.address && (
          <m.a
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 no-underline"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.9)',
            }}
            data-testid="link-directions"
          >
            <MapPin className="w-5 h-5" />
            <span className="flex flex-col items-start gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Get Directions</span>
              <span className="text-base">{selectedSeminar.address}</span>
            </span>
          </m.a>
        )}
      </m.div>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ fontFamily: "'Mulish', system-ui, sans-serif" }}>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes dot-pulse { 0%,80%,100% { opacity:.3; transform:scale(1); } 40% { opacity:1; transform:scale(1.3); } }
        .ev5-scroll::-webkit-scrollbar { display: none; }
        .ev5-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0, background: '#091a33' }}>
        <m.div
          className="absolute"
          style={{ inset: '-40px', willChange: 'transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as React.CSSProperties}
          initial={{ scale: 1.08, x: 0, y: 0, opacity: 0 }}
          animate={{
            scale: [1.08, 1.09, 1.07, 1.09, 1.08],
            x: [0, 2, -2, 1, 0],
            y: [0, -1, 2, -1, 0],
            opacity: bgLoaded ? 1 : 0,
          }}
          transition={{
            duration: 35,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 2,
            opacity: { duration: 0.35, ease: 'easeOut', delay: 0 },
          }}
        >
          {venuePhotoUrl && (phase === 'details' || phase === 'registration' || phase === 'thankYou') ? (
            <>
              <m.img
                src={venuePhotoUrl}
                alt=""
                className="w-full h-full md:hidden"
                style={{ objectFit: 'cover', scale: 1.25, transform: 'translateZ(0)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, objectPosition: getVenueBgPosition() }}
                transition={{ opacity: { duration: 1.2, ease: 'easeOut' }, objectPosition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
                loading="eager"
                onLoad={() => setBgLoaded(true)}
                onError={handleVenueImgError}
              />
              <m.img
                src={venuePhotoUrl}
                alt=""
                className="w-full h-full hidden md:block"
                style={{ objectFit: 'cover', transformOrigin: '50% 40%', backfaceVisibility: 'hidden' } as React.CSSProperties}
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: getVenueDesktopScale() }}
                transition={{ opacity: { duration: 1.2, ease: 'easeOut' }, scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }}
                loading="eager"
                onLoad={() => setBgLoaded(true)}
                onError={handleVenueImgError}
              />
            </>
          ) : (
            <picture>
              <source media="(min-width: 601px)" srcSet={siteConfig.images.eventBackground} />
              <m.img
                src={siteConfig.images.eventBackground}
                alt=""
                className="w-full h-full"
                style={{ objectFit: 'cover', scale: 1.15, transform: 'translateZ(0)' }}
                animate={{ objectPosition: getBgPosition() }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                loading="eager"
                onLoad={() => setBgLoaded(true)}
              />
            </picture>
          )}
        </m.div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(9,26,51,0.78) 0%, rgba(9,26,51,0.72) 15%, rgba(9,26,51,0.76) 35%, rgba(9,26,51,0.82) 55%, rgba(9,26,51,0.90) 75%, rgba(9,26,51,0.97) 100%), radial-gradient(ellipse at 30% 20%, rgba(15,30,60,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(9,26,51,0.3) 0%, transparent 50%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {phase === 'registration' && (
        <div data-testid="progress-bar" className="fixed top-0 left-0 right-0 z-50 h-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <m.div
            className="h-full rounded-r-sm"
            style={{ background: 'linear-gradient(90deg, #d4a853, #e6c47a)' }}
            animate={{ width: `${getProgress() * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />
        </div>
      )}

      {phase === 'details' && (
        <button
          data-testid="button-back-nav"
          onClick={backToCalendar}
          className="fixed top-6 left-6 z-50 flex items-center gap-1 text-lg font-sans cursor-pointer transition-opacity duration-200 bg-transparent border-0 p-0"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>View More Events</span>
        </button>
      )}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          data-testid="button-modal-close"
          aria-label="Close"
          className="fixed top-4 right-4 z-[9999] flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.7)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div
        className="relative flex-1 flex justify-center items-start overflow-y-auto ev5-scroll"
        style={{ zIndex: 2, paddingBottom: '2rem' }}
      >
        <AnimatePresence mode="wait">
          {phase === 'calendar' && autoOpenResolved && renderCalendarView()}
          {phase === 'details' && autoOpenResolved && renderDetailsView()}
          {phase === 'registration' && autoOpenResolved && (
            <RegistrationForm
              regStep={regStep}
              setRegStep={setRegStep}
              selectedSeminar={selectedSeminar}
              onComplete={() => setPhase('thankYou')}
              onBackToDetails={backToDetails}
              safeTimeout={safeTimeout}
            />
          )}
          {phase === 'thankYou' && renderThankYou()}
        </AnimatePresence>
      </div>

      {phase === 'registration' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <m.div
            className="h-full rounded-r-sm"
            style={{ background: 'linear-gradient(90deg, #d4a853, #e6c47a)' }}
            animate={{ width: `${getProgress() * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />
        </div>
      )}
    </div>
  );
}
