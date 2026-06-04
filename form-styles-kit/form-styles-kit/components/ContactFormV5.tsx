'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { loadGTM, reportConversion, getTrackingData } from '../lib/analytics';
import { submitContactForm } from '../lib/formSubmit';
import { siteConfig } from '../lib/siteConfig';
import { useSafeTimeouts } from '../hooks/useSafeTimeouts';
import {
  formatPhone,
  validEmail,
  getArticle,
  statusChips,
  actionChips,
  topicChips,
  existingActionChips,
  existingTopicChips,
  referralOptions,
} from '../lib/formData';
import { Check, Phone, ArrowRight, ChevronLeft, Send, X } from 'lucide-react';

type Step = 'name' | 'contact' | 'message' | 'extras' | 'submitting' | 'thankYou';

interface FormData {
  name: string;
  phone: string;
  email: string;
  referralSource: string;
  referralOther: string;
  referralName: string;
  textOptIn: boolean;
}

const slideVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const slideTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

function useTypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef('');

  const clearTyping = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const appendTo = useCallback((fullText: string, onComplete?: () => void, hideCursorAfter = false) => {
    clearTyping();
    setShowCursor(true);
    const startFrom = textRef.current.length;
    let i = startFrom;
    const typeChar = () => {
      if (i < fullText.length) {
        const nextI = i + 1;
        const next = fullText.substring(0, nextI);
        textRef.current = next;
        setDisplayText(next);
        i = nextI;
        timeoutRef.current = setTimeout(typeChar, 28);
      } else {
        textRef.current = fullText;
        setDisplayText(fullText);
        if (hideCursorAfter) setShowCursor(false);
        onComplete?.();
      }
    };
    typeChar();
  }, [clearTyping]);

  const resetAndType = useCallback((text: string, onComplete?: () => void) => {
    clearTyping();
    textRef.current = '';
    setDisplayText('');
    setShowCursor(true);
    let i = 0;
    const typeChar = () => {
      if (i < text.length) {
        const nextI = i + 1;
        const next = text.substring(0, nextI);
        textRef.current = next;
        setDisplayText(next);
        i = nextI;
        timeoutRef.current = setTimeout(typeChar, 28);
      } else {
        textRef.current = text;
        setDisplayText(text);
        onComplete?.();
      }
    };
    typeChar();
  }, [clearTyping]);

  const setText = useCallback((text: string) => {
    clearTyping();
    textRef.current = text;
    setDisplayText(text);
  }, [clearTyping]);

  return { displayText, showCursor, setShowCursor, appendTo, resetAndType, setText, clearTyping };
}

interface ContactV5Props {
  onClose?: () => void;
}

export default function ContactFormV5({ onClose }: ContactV5Props = {}) {
  const { safeTimeout } = useSafeTimeouts();
  const [step, setStep] = useState<Step>('name');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    referralSource: '',
    referralOther: '',
    referralName: '',
    textOptIn: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [statusValue, setStatusValue] = useState('');
  const [actionValue, setActionValue] = useState('');
  const [topicValue, setTopicValue] = useState('');
  const [statusChosen, setStatusChosen] = useState(false);
  const [actionChosen, setActionChosen] = useState(false);
  const [topicChosen, setTopicChosen] = useState(false);
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [actionNeedsTopicChips, setActionNeedsTopicChips] = useState(false);

  const [otherTopicValue, setOtherTopicValue] = useState('');
  const [questionValue, setQuestionValue] = useState('');
  const [elaborationValue, setElaborationValue] = useState('');
  const [actionDetailValue, setActionDetailValue] = useState('');
  const [actionDetailLabel, setActionDetailLabel] = useState('');
  const [actionDetailPlaceholder, setActionDetailPlaceholder] = useState('');

  const [manualMode, setManualMode] = useState(false);
  const [manualMessage, setManualMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [sentenceComplete, setSentenceComplete] = useState(false);
  const [activeChipGroup, setActiveChipGroup] = useState<string>('none');
  const [step3Initialized, setStep3Initialized] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (bgLoaded) {
      try {
        window.parent.postMessage({ source: 'formKit', action: 'bgReady' }, '*');
      } catch (e) {}
    }
  }, [bgLoaded]);

  const lastSubmitTime = useRef(0);
  const recentSubs = useRef(new Map<string, number>());
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageScrollRef = useRef<HTMLDivElement>(null);
  const hiddenMessageRef = useRef('');

  const typing = useTypingAnimation();

  useEffect(() => {
    loadGTM();
    safeTimeout(() => nameRef.current?.focus(), 400);
    return () => typing.clearTyping();
  }, [safeTimeout]);

  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const getProgress = useCallback(() => {
    if (step === 'name') return 0.2;
    if (step === 'contact') return 0.4;
    if (step === 'message') return 0.6;
    if (step === 'extras') return 0.85;
    if (step === 'thankYou') return 1;
    return 0.6;
  }, [step]);

  const getBgPosition = useCallback(() => {
    if (step === 'name') return '30% 48%';
    if (step === 'contact') return '42% 46%';
    if (step === 'message') return '54% 44%';
    if (step === 'extras') return '66% 46%';
    if (step === 'thankYou') return '75% 48%';
    return '50% 46%';
  }, [step]);

  const computeMessage = useCallback(() => {
    if (manualMode) {
      let msg = manualMessage.trim() || 'No message';
      if (formData.referralName) msg += ' Referral from ' + formData.referralName + '.';
      return msg;
    }
    const tVal = (topicValue === 'other' && otherTopicValue.trim()) ? otherTopicValue.trim() : topicValue;
    if (isExistingClient && actionValue && !actionNeedsTopicChips && actionChosen) {
      const article = getArticle(statusValue);
      let msg = 'I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + '.';
      if (actionDetailValue.trim()) msg += ' Details: ' + actionDetailValue.trim();
      if (formData.referralName) msg += ' Referral from ' + formData.referralName + '.';
      return msg;
    } else if (statusValue && actionValue && tVal) {
      const article = getArticle(statusValue);
      const connector = isExistingClient ? 'regarding' : 'about';
      let msg = 'I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + ' ' + connector + ' ' + tVal + '.';
      if (actionValue === 'ask a question' && questionValue.trim()) msg += ' Question: ' + questionValue.trim();
      if (isExistingClient && actionNeedsTopicChips && elaborationValue.trim()) msg += ' Additional details: ' + elaborationValue.trim();
      if (formData.referralName) msg += ' Referral from ' + formData.referralName + '.';
      return msg;
    }
    return '';
  }, [manualMode, manualMessage, statusValue, actionValue, topicValue, otherTopicValue, isExistingClient, actionNeedsTopicChips, actionChosen, actionDetailValue, questionValue, elaborationValue, formData.referralName]);

  useEffect(() => {
    const msg = computeMessage();
    hiddenMessageRef.current = msg;
    setSentenceComplete(msg.length > 0 && !manualMode ? true : manualMode && manualMessage.trim().length > 0);
  }, [computeMessage, manualMode, manualMessage]);

  const scrollToBottom = useCallback(() => {
    safeTimeout(() => {
      messageScrollRef.current?.scrollTo({ top: messageScrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 300);
  }, [safeTimeout]);

  const typingRef = useRef(typing);
  typingRef.current = typing;

  const initializeStep3 = useCallback(() => {
    setStatusValue('');
    setActionValue('');
    setTopicValue('');
    setStatusChosen(false);
    setActionChosen(false);
    setTopicChosen(false);
    setIsExistingClient(false);
    setActionNeedsTopicChips(false);
    setOtherTopicValue('');
    setQuestionValue('');
    setElaborationValue('');
    setActionDetailValue('');
    setManualMode(false);
    setManualMessage('');
    setSentenceComplete(false);
    setActiveChipGroup('status');
    typing.resetAndType('I am a ');
  }, [typing]);

  useEffect(() => {
    if (step === 'message' && !step3Initialized) {
      setStep3Initialized(true);
      safeTimeout(initializeStep3, 500);
    }
  }, [step, step3Initialized]);

  const handleStatusChipClick = useCallback((value: string) => {
    setStatusValue(value);
    setStatusChosen(true);
    const isExisting = value === 'existing client';
    setIsExistingClient(isExisting);
    const article = getArticle(value);
    const prefix = 'I am ' + article + ' ' + value;
    typingRef.current.appendTo(prefix, () => {
      setActiveChipGroup('fade-status');
      safeTimeout(() => {
        typingRef.current.appendTo(prefix + ' and I would like to ', () => {
          setActiveChipGroup(isExisting ? 'existingAction' : 'action');
        });
      }, 400);
    });
  }, [safeTimeout]);

  const handleActionChipClick = useCallback((value: string) => {
    setActionValue(value);
    setActionChosen(true);

    if (isExistingClient && value === 'review or update my plan') {
      setActionNeedsTopicChips(true);
      const article = getArticle(statusValue);
      const prefix = 'I am ' + article + ' ' + statusValue + ' and I would like to ';
      typingRef.current.appendTo(prefix + value, () => {
        setActiveChipGroup('fade-action');
        safeTimeout(() => {
          typingRef.current.appendTo(prefix + value + ' regarding ', () => {
            setActiveChipGroup('existingTopic');
          });
        }, 400);
      });
    } else if (isExistingClient) {
      setActionNeedsTopicChips(false);
      setTopicChosen(true);
      setTopicValue('');
      const configs: Record<string, { label: string; placeholder: string }> = {
        'report a life change': { label: 'Tell us about your life change', placeholder: 'e.g. marriage, new child, moved to a new state...' },
        'request copies of my documents': { label: 'Which documents do you need?', placeholder: 'e.g. trust, power of attorney, deed...' },
        'discuss investments or finances': { label: 'What would you like to discuss?', placeholder: 'e.g. retirement accounts, portfolio review...' },
        'discuss something else': { label: 'What can we help you with?', placeholder: 'Tell us what you need...' }
      };
      const cfg = configs[value] || { label: 'Tell us more', placeholder: '' };
      setActionDetailLabel(cfg.label);
      setActionDetailPlaceholder(cfg.placeholder);
      const article = getArticle(statusValue);
      const prefix = 'I am ' + article + ' ' + statusValue + ' and I would like to ';
      typingRef.current.appendTo(prefix + value, () => {
        setActiveChipGroup('fade-action');
        safeTimeout(() => {
          typingRef.current.appendTo(prefix + value + '.', () => {});
          setActiveChipGroup('actionDetail');
          scrollToBottom();
        }, 400);
      });
    } else {
      setActionNeedsTopicChips(false);
      const article = getArticle(statusValue);
      const prefix = 'I am ' + article + ' ' + statusValue + ' and I would like to ';
      typingRef.current.appendTo(prefix + value, () => {
        setActiveChipGroup('fade-action');
        safeTimeout(() => {
          typingRef.current.appendTo(prefix + value + ' about ', () => {
            setActiveChipGroup('topic');
          });
        }, 400);
      });
    }
  }, [statusValue, isExistingClient, scrollToBottom, safeTimeout]);

  const handleTopicChipClick = useCallback((value: string) => {
    setTopicValue(value);
    setTopicChosen(true);
    const article = getArticle(statusValue);
    const connector = isExistingClient ? 'regarding' : 'about';
    const prefix = 'I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + ' ' + connector + ' ';

    if (value === 'other') {
      setActiveChipGroup('fade-topic');
      safeTimeout(() => {
        typingRef.current.setShowCursor(false);
        setActiveChipGroup('otherTopic');
        scrollToBottom();
      }, 300);
    } else {
      typingRef.current.appendTo(prefix + value + '.', () => {
        typingRef.current.setShowCursor(false);
        if (isExistingClient && actionNeedsTopicChips) {
          setActiveChipGroup('fade-topic');
          safeTimeout(() => {
            setActiveChipGroup('elaboration');
            scrollToBottom();
          }, 400);
        } else if (actionValue === 'ask a question') {
          setActiveChipGroup('fade-topic');
          safeTimeout(() => {
            setActiveChipGroup('question');
            scrollToBottom();
          }, 400);
        } else {
          setActiveChipGroup('complete');
          scrollToBottom();
        }
      });
    }
  }, [statusValue, actionValue, isExistingClient, actionNeedsTopicChips, scrollToBottom, safeTimeout]);

  const validateStep = useCallback((s: Step): boolean => {
    const errs: Record<string, string> = {};
    if (s === 'name') {
      if (!formData.name.trim()) errs.name = 'Please enter your name';
    }
    if (s === 'contact') {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10) errs.phone = 'Please enter a valid phone number';
      if (!formData.email.trim() || !validEmail(formData.email)) errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    if (step === 'name') {
      setStep('contact');
      safeTimeout(() => phoneRef.current?.focus(), 400);
    } else if (step === 'contact') {
      setStep('message');
    } else if (step === 'message') {
      setStep('extras');
    }
  }, [step, validateStep, safeTimeout]);

  const goBack = useCallback(() => {
    if (step === 'contact') setStep('name');
    else if (step === 'message') setStep('contact');
    else if (step === 'extras') setStep('message');
  }, [step]);

  const handleEnter = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); goNext(); }
  }, [goNext]);

  const toggleManual = useCallback(() => {
    if (!manualMode) {
      setManualMode(true);
      setActiveChipGroup('manual');
      typing.setText('');
      typing.setShowCursor(false);
    } else {
      setManualMode(false);
      setManualMessage('');
      if (!statusChosen) {
        setActiveChipGroup('status');
        typing.resetAndType('I am a ');
      } else if (!actionChosen) {
        const article = getArticle(statusValue);
        typing.setText('I am ' + article + ' ' + statusValue + ' and I would like to ');
        setActiveChipGroup(isExistingClient ? 'existingAction' : 'action');
        typing.setShowCursor(true);
      } else if (!topicChosen) {
        const article = getArticle(statusValue);
        const connector = isExistingClient ? 'regarding' : 'about';
        typing.setText('I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + ' ' + connector + ' ');
        setActiveChipGroup(isExistingClient ? 'existingTopic' : 'topic');
        typing.setShowCursor(true);
      } else {
        const article = getArticle(statusValue);
        const connector = isExistingClient ? 'regarding' : 'about';
        const tVal = topicValue === 'other' ? (otherTopicValue || '') : topicValue;
        if (isExistingClient && !actionNeedsTopicChips) {
          typing.setText('I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + '.');
        } else if (tVal) {
          typing.setText('I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + ' ' + connector + ' ' + tVal + '.');
        } else {
          typing.setText('I am ' + article + ' ' + statusValue + ' and I would like to ' + actionValue + ' ' + connector + ' ');
          setActiveChipGroup(isExistingClient ? 'existingTopic' : 'topic');
          typing.setShowCursor(true);
          return;
        }
        typing.setShowCursor(false);
        setActiveChipGroup('complete');
      }
    }
  }, [manualMode, statusChosen, actionChosen, topicChosen, statusValue, actionValue, topicValue, isExistingClient, actionNeedsTopicChips, otherTopicValue, typing]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    const now = Date.now();
    if (now - lastSubmitTime.current < 3000) {
      setDuplicateWarning(true);
      safeTimeout(() => setDuplicateWarning(false), 3000);
      return;
    }

    const msg = hiddenMessageRef.current;
    if (!msg) return;

    const hash = btoa(formData.name + formData.email + msg).substring(0, 20);
    if (recentSubs.current.has(hash) && now - recentSubs.current.get(hash)! < 30000) {
      setDuplicateWarning(true);
      safeTimeout(() => setDuplicateWarning(false), 3000);
      return;
    }

    setIsSubmitting(true);
    lastSubmitTime.current = now;
    recentSubs.current.set(hash, now);

    const tracking = getTrackingData();

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: msg,
        referralSource: formData.referralSource || formData.referralOther,
        textOptIn: formData.textOptIn,
        tracking,
      });
      if (result.success) {
        setStep('thankYou');
        reportConversion({ name: formData.name, email: formData.email, phone: formData.phone }, 'contact_submission', !isExistingClient, isExistingClient ? siteConfig.conversionValue.existingContact : siteConfig.conversionValue.newContact);
      } else {
        console.error('Form submission error:', result.error);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, formData]);

  const progress = getProgress();

  const renderChipGroup = (
    chips: { value: string; label: string }[],
    selectedValue: string,
    onSelect: (v: string) => void,
    groupId: string,
  ) => (
    <m.div
      key={groupId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4"
      data-testid={`chip-group-${groupId}`}
    >
      {chips.map((c, i) => (
        <button
          key={c.value}
          type="button"
          data-testid={`chip-${groupId}-${c.value.replace(/\s+/g, '-')}`}
          onClick={() => onSelect(c.value)}
          className="px-6 py-4 md:py-5 rounded-lg font-sans text-lg md:text-xl font-medium transition-all duration-200 cursor-pointer text-center flex items-center justify-center whitespace-nowrap"
          style={{
            background: selectedValue === c.value ? 'rgba(112,60,88,0.85)' : 'rgba(255,255,255,0.95)',
            color: selectedValue === c.value ? '#fff' : '#091a33',
            border: selectedValue === c.value ? '2px solid rgba(112,60,88,0.9)' : '2px solid rgba(255,255,255,0.6)',
            minHeight: '60px',
          }}
        >
          {c.label}
        </button>
      ))}
    </m.div>
  );

  const renderMessageStep = () => {
    const showCompletionUI = activeChipGroup === 'complete' || activeChipGroup === 'otherTopic' || activeChipGroup === 'question' || activeChipGroup === 'elaboration' || activeChipGroup === 'actionDetail';

    return (
      <div className="w-full max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-8" ref={messageScrollRef}>
        <div className="mb-6">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }}>
            Your Message
          </h2>
          <p className="mt-3 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {manualMode
              ? <>Type your message below, or <button type="button" onClick={toggleManual} className="underline underline-offset-2 bg-transparent border-0 cursor-pointer font-sans text-lg md:text-xl" style={{ color: 'rgba(255,255,255,0.8)' }} data-testid="link-toggle-guided">use the guided options</button></>
              : <>Tap the options below to build your message, or <button type="button" onClick={toggleManual} className="underline underline-offset-2 bg-transparent border-0 cursor-pointer font-sans text-lg md:text-xl" style={{ color: 'rgba(255,255,255,0.8)' }} data-testid="link-toggle-manual">click here to type your own</button></>
            }
          </p>
        </div>

        <div
          className="rounded-xl p-5 md:p-6 mb-6"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            minHeight: '160px',
            transition: 'min-height 0.3s ease',
          }}
          data-testid="sentence-card"
        >
          {!manualMode && (
            <div className="font-sans text-xl md:text-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.95)' }}>
              <span data-testid="typed-text">{typing.displayText}</span>
              {typing.showCursor && (
                <span
                  className="inline-block w-0.5 h-7 ml-0.5 align-middle"
                  style={{
                    background: '#fff',
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              )}

              <AnimatePresence>
                {activeChipGroup === 'otherTopic' && (
                  <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline">
                    <input
                      type="text"
                      data-testid="input-other-topic"
                      value={otherTopicValue}
                      onChange={(e) => setOtherTopicValue(e.target.value)}
                      placeholder="type a topic..."
                      maxLength={255}
                      className="inline-block text-xl md:text-2xl py-1 px-0 bg-transparent outline-hidden placeholder-white/35 font-sans"
                      style={{ color: '#fff', borderBottom: '1.5px dashed rgba(255,255,255,0.5)', width: Math.max(140, (otherTopicValue.length + 6) * 12) + 'px', maxWidth: '100%', caretColor: '#fff' }}
                      autoFocus
                    />
                    <span style={{ color: 'rgba(255,255,255,0.95)' }}>.</span>
                  </m.span>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeChipGroup === 'otherTopic' && otherTopicValue.trim() && actionValue === 'ask a question' && (
                  <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} className="mt-4">
                    <textarea
                      data-testid="input-question"
                      value={questionValue}
                      onChange={(e) => setQuestionValue(e.target.value)}
                      placeholder="Type your question here... (optional)"
                      rows={2}
                      className="w-full text-lg md:text-xl py-3 px-0 bg-transparent outline-hidden transition-colors duration-300 placeholder-white/35 font-sans resize-none"
                      style={{ color: '#fff', borderBottom: '1.5px dashed rgba(255,255,255,0.4)' }}
                    />
                  </m.div>
                )}
                {activeChipGroup === 'question' && (
                  <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4">
                    <textarea
                      data-testid="input-question-direct"
                      value={questionValue}
                      onChange={(e) => setQuestionValue(e.target.value)}
                      placeholder="Type your question here... (optional)"
                      rows={2}
                      className="w-full text-lg md:text-xl py-3 px-0 bg-transparent outline-hidden transition-colors duration-300 placeholder-white/35 font-sans resize-none"
                      style={{ color: '#fff', borderBottom: '1.5px dashed rgba(255,255,255,0.4)' }}
                      autoFocus
                    />
                  </m.div>
                )}
                {activeChipGroup === 'elaboration' && (
                  <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4">
                    <textarea
                      data-testid="input-elaboration"
                      value={elaborationValue}
                      onChange={(e) => setElaborationValue(e.target.value)}
                      placeholder="Anything else to share? (optional)"
                      rows={2}
                      className="w-full text-lg md:text-xl py-3 px-0 bg-transparent outline-hidden transition-colors duration-300 placeholder-white/35 font-sans resize-none"
                      style={{ color: '#fff', borderBottom: '1.5px dashed rgba(255,255,255,0.4)' }}
                      autoFocus
                    />
                  </m.div>
                )}
                {activeChipGroup === 'actionDetail' && (
                  <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-4">
                    <textarea
                      data-testid="input-action-detail"
                      value={actionDetailValue}
                      onChange={(e) => setActionDetailValue(e.target.value)}
                      placeholder={actionDetailPlaceholder}
                      rows={2}
                      className="w-full text-lg md:text-xl py-3 px-0 bg-transparent outline-hidden transition-colors duration-300 placeholder-white/35 font-sans resize-none"
                      style={{ color: '#fff', borderBottom: '1.5px dashed rgba(255,255,255,0.4)' }}
                      autoFocus
                    />
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {manualMode && (
            <textarea
              data-testid="input-manual-message"
              value={manualMessage}
              onChange={(e) => setManualMessage(e.target.value)}
              placeholder="Tell us how we can help..."
              rows={4}
              className="w-full text-xl md:text-2xl leading-relaxed py-0 px-0 bg-transparent outline-hidden placeholder-white/35 font-sans resize-none"
              style={{ color: '#fff', caretColor: '#fff' }}
              autoFocus
            />
          )}
        </div>

        {!manualMode && (
          <div className="mt-2" style={{ minHeight: '130px' }}>
            <AnimatePresence mode="wait">
              {activeChipGroup === 'status' && renderChipGroup(statusChips, '', handleStatusChipClick, 'status')}
              {activeChipGroup === 'action' && renderChipGroup(actionChips, '', handleActionChipClick, 'action')}
              {activeChipGroup === 'existingAction' && renderChipGroup(existingActionChips, '', handleActionChipClick, 'existingAction')}
              {activeChipGroup === 'topic' && renderChipGroup(topicChips, '', handleTopicChipClick, 'topic')}
              {activeChipGroup === 'existingTopic' && renderChipGroup(existingTopicChips, '', handleTopicChipClick, 'existingTopic')}
              {showCompletionUI && (
                <m.div
                  key="completion-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between pt-4"
                >
                  <button data-testid="button-back-message" type="button" onClick={goBack} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <ChevronLeft className="w-5 h-5" /> Back
                  </button>
                  <m.button
                    data-testid="button-next-message"
                    type="button"
                    onClick={goNext}
                    className="group flex items-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer"
                    style={{ background: '#fff', color: '#05285d' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Next step
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  </m.button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {manualMode && (
          <div className="flex items-center justify-between mt-6">
            <button data-testid="button-back-message" type="button" onClick={goBack} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <m.button
              data-testid="button-next-message"
              type="button"
              onClick={goNext}
              className="group flex items-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer"
              style={{ background: '#fff', color: '#05285d' }}
              whileTap={{ scale: 0.97 }}
            >
              Next step
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </m.button>
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 'name':
        return (
            <m.div key="name" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
              <div className="mb-8 md:mb-10">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }}>Contact Us</h2>
                <p className="mt-3 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Let us know how we can help. We'll get back to you within one business day.
                </p>
              </div>
              <div className="w-full">
                <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Your full name <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  ref={nameRef}
                  data-testid="input-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Smith"
                  autoComplete="name"
                  maxLength={120}
                  onKeyDown={handleEnter}
                  aria-label="Your full name"
                  className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
                  style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: errors.name ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
                />
                <AnimatePresence>
                  {errors.name && (
                    <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert" data-testid="error-name">{errors.name}</m.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-between mt-10 md:mt-12">
                <div />
                <m.button
                  data-testid="button-next"
                  type="button"
                  onClick={goNext}
                  disabled={!formData.name.trim()}
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

      case 'contact':
        return (
            <m.div key="contact" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
              <div className="mb-6 md:mb-8">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }}>Contact Information</h2>
                <p className="mt-2 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  So we can get back to you quickly.
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
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="john@example.com"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={100}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); phoneRef.current?.focus(); } }}
                    className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
                    style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: errors.email ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert" data-testid="error-email">{errors.email}</m.p>
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
                    value={formData.phone}
                    onChange={(e) => updateField('phone', formatPhone(e.target.value))}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={14}
                    onKeyDown={handleEnter}
                    className="w-full text-2xl md:text-3xl py-4 px-4 rounded-lg outline-hidden transition-colors duration-300 placeholder-white/40 font-sans"
                    style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: errors.phone ? '1.5px solid #ff6b6b' : '1.5px solid rgba(255,255,255,0.2)', caretColor: '#fff' }}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <m.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 text-base" style={{ color: '#ff6b6b' }} role="alert" data-testid="error-phone">{errors.phone}</m.p>
                    )}
                  </AnimatePresence>
                </div>
                <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
                  <input
                    type="checkbox"
                    data-testid="checkbox-text-optin"
                    checked={formData.textOptIn}
                    onChange={(e) => updateField('textOptIn', e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className="shrink-0 w-6 h-6 mt-0.5 rounded border-2 flex items-center justify-center transition-colors duration-200"
                    style={{
                      borderColor: formData.textOptIn ? '#fff' : 'rgba(255,255,255,0.4)',
                      background: formData.textOptIn ? 'rgba(255,255,255,0.2)' : 'transparent',
                    }}
                  >
                    {formData.textOptIn && <Check className="w-3.5 h-3.5" style={{ color: '#fff' }} />}
                  </span>
                  <span className="text-sm md:text-base font-sans leading-snug" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    I'd like to receive text messages from {siteConfig.businessName} regarding services, appointments, and updates.
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
                <button data-testid="button-back" type="button" onClick={goBack} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                <m.button
                  data-testid="button-next"
                  type="button"
                  onClick={goNext}
                  disabled={formData.phone.replace(/\D/g, '').length < 10 || !formData.email.trim()}
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

      case 'message':
        return (
            <m.div key="message" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full pt-12">
              {renderMessageStep()}
            </m.div>
        );

      case 'extras':
        return (
            <m.div key="extras" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
              <div className="mb-8 md:mb-10">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ color: '#fff' }}>Almost done!</h2>
                <p className="mt-3 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {isExistingClient ? "One last optional detail before you're all set." : "Just a couple more optional details before you're all set."}
                </p>
              </div>
              <div className="space-y-8">
                {!isExistingClient && (
                <div>
                  <label className="block text-base font-sans font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    How did you hear about us?
                  </label>
                  <select
                    data-testid="select-referral"
                    value={formData.referralSource}
                    onChange={(e) => updateField('referralSource', e.target.value)}
                    className="w-full text-lg md:text-xl py-4 px-4 rounded-lg outline-hidden font-sans cursor-pointer"
                    style={{
                      color: formData.referralSource ? '#fff' : 'rgba(255,255,255,0.55)',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1.5px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <option value="" disabled>Select an option...</option>
                    {referralOptions.map(o => (
                      <option key={o.value} value={o.value} style={{ color: '#091a33', background: '#fff' }}>{o.label}</option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {formData.referralSource === 'Other' && (
                      <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3">
                        <input
                          data-testid="input-referral-other"
                          type="text"
                          value={formData.referralOther}
                          onChange={(e) => updateField('referralOther', e.target.value)}
                          placeholder="Please specify..."
                          maxLength={255}
                          className="w-full text-lg py-3 px-4 rounded-lg outline-hidden placeholder-white/40 font-sans"
                          style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)' }}
                        />
                      </m.div>
                    )}
                    {formData.referralSource === 'Friend or Family Referral' && (
                      <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3">
                        <input
                          data-testid="input-referral-name"
                          type="text"
                          value={formData.referralName}
                          onChange={(e) => updateField('referralName', e.target.value)}
                          placeholder="Who referred you? e.g. John Smith"
                          maxLength={255}
                          className="w-full text-lg py-3 px-4 rounded-lg outline-hidden placeholder-white/40 font-sans"
                          style={{ color: '#fff', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)' }}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
                )}

              </div>

              <div className="flex items-center justify-between mt-10 md:mt-12">
                <button data-testid="button-back-extras" type="button" onClick={goBack} className="flex items-center gap-1 text-lg font-sans transition-opacity duration-200 cursor-pointer bg-transparent border-0 p-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                {duplicateWarning ? (
                  <m.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="px-8 py-4 rounded-xl font-sans text-lg font-semibold text-center"
                    style={{ background: '#ff6b6b', color: '#fff' }}
                  >
                    Already submitted!
                  </m.div>
                ) : (
                  <m.button
                    data-testid="button-submit"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group flex items-center justify-center gap-2 px-8 py-5 rounded-xl font-sans text-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </m.button>
                )}
              </div>
            </m.div>
        );

      case 'thankYou':
        return (
            <m.div key="thankYou" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="w-full max-w-xl mx-auto px-6 md:px-8 my-auto pt-8">
              <div className="text-center py-8 md:py-12">
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                  style={{ background: 'rgba(112,60,88,0.4)', border: '2px solid rgba(255,255,255,0.2)' }}
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
                  data-testid="text-thank-you-title"
                >
                  Thank you, we're on it!
                </m.h2>
                <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-5">
                  <p className="text-lg md:text-xl font-sans leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    We're grateful for the opportunity to assist you and will reach out as soon as possible, typically within one business day.
                  </p>
                  <p className="text-base md:text-lg font-sans italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Thanks again for choosing {siteConfig.businessName}. We look forward to speaking with you soon.
                  </p>
                  <p className="text-base md:text-lg font-sans leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    If this is urgent, call{' '}
                    <a href={siteConfig.phone.href} className="inline-flex items-center gap-1 underline underline-offset-4" style={{ color: '#fff' }} data-testid="link-phone">
                      <Phone className="w-4 h-4" /> {siteConfig.phone.display}
                    </a>
                  </p>
                </m.div>
              </div>
            </m.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ fontFamily: "'Mulish', system-ui, sans-serif" }}>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
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
          <picture>
            <source media="(min-width: 601px)" srcSet={siteConfig.images.contactDesktop} />
            <m.img
              src={siteConfig.images.contactMobile}
              alt=""
              className="w-full h-full"
              style={{ objectFit: 'cover', scale: 1.15, transform: 'translateZ(0)' }}
              animate={{ objectPosition: getBgPosition() }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              loading="eager"
              onLoad={() => setBgLoaded(true)}
            />
          </picture>
        </m.div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(9,26,51,0.72) 0%, rgba(9,26,51,0.62) 15%, rgba(9,26,51,0.66) 35%, rgba(9,26,51,0.74) 55%, rgba(9,26,51,0.85) 75%, rgba(9,26,51,0.95) 100%), radial-gradient(ellipse at 30% 20%, rgba(112,60,88,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(9,26,51,0.2) 0%, transparent 50%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <div data-testid="progress-bar" className="fixed top-0 left-0 right-0 z-50 h-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <m.div
          className="h-full rounded-r-sm"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>

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
        className="relative flex-1 flex justify-center items-start overflow-y-auto"
        style={{ zIndex: 2, paddingBottom: '2rem' }}
      >
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div data-testid="progress-bar-bottom" className="fixed bottom-0 left-0 right-0 z-50 h-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <m.div
          className="h-full rounded-r-sm"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>
    </div>
  );
}