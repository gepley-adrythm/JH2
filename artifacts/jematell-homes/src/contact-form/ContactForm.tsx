import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Phone, ArrowRight, ChevronLeft, Send, X } from "lucide-react";
import { loadGTM, reportConversion, getTrackingData } from "./analytics";
import { submitContactForm } from "./submit";
import { siteConfig } from "./siteConfig";
import { useSafeTimeouts } from "./useSafeTimeouts";
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
  actionDetailConfigs,
} from "./formData";

type Step = "name" | "contact" | "message" | "extras" | "submitting" | "thankYou";

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

function useTypingAnimation() {
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef("");

  const clearTyping = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const appendTo = useCallback((fullText: string, onComplete?: () => void, hideCursorAfter = false) => {
    clearTyping();
    setShowCursor(true);
    if (reducedRef.current) {
      textRef.current = fullText;
      setDisplayText(fullText);
      if (hideCursorAfter) setShowCursor(false);
      onComplete?.();
      return;
    }
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
    textRef.current = "";
    setDisplayText("");
    setShowCursor(true);
    if (reducedRef.current) {
      textRef.current = text;
      setDisplayText(text);
      onComplete?.();
      return;
    }
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

interface ContactFormProps {
  onClose?: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps = {}) {
  const reduced = useReducedMotion();
  const slideTransition = reduced
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const tapProps = reduced ? {} : { whileTap: { scale: 0.97 } };
  const { safeTimeout } = useSafeTimeouts();
  const [step, setStep] = useState<Step>("name");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    referralSource: "",
    referralOther: "",
    referralName: "",
    textOptIn: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [statusValue, setStatusValue] = useState("");
  const [actionValue, setActionValue] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [statusChosen, setStatusChosen] = useState(false);
  const [actionChosen, setActionChosen] = useState(false);
  const [topicChosen, setTopicChosen] = useState(false);
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [actionNeedsTopicChips, setActionNeedsTopicChips] = useState(false);

  const [otherTopicValue, setOtherTopicValue] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [elaborationValue, setElaborationValue] = useState("");
  const [actionDetailValue, setActionDetailValue] = useState("");
  const [actionDetailPlaceholder, setActionDetailPlaceholder] = useState("");

  const [manualMode, setManualMode] = useState(false);
  const [manualMessage, setManualMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [, setSentenceComplete] = useState(false);
  const [activeChipGroup, setActiveChipGroup] = useState<string>("none");
  const [step3Initialized, setStep3Initialized] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const lastSubmitTime = useRef(0);
  const recentSubs = useRef(new Map<string, number>());
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageScrollRef = useRef<HTMLDivElement>(null);
  const hiddenMessageRef = useRef("");

  const typing = useTypingAnimation();

  useEffect(() => {
    loadGTM();
    safeTimeout(() => nameRef.current?.focus(), 400);
    return () => typing.clearTyping();
  }, [safeTimeout]);

  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  }, []);

  const getProgress = useCallback(() => {
    if (step === "name") return 0.2;
    if (step === "contact") return 0.4;
    if (step === "message") return 0.6;
    if (step === "extras") return 0.85;
    if (step === "thankYou") return 1;
    return 0.6;
  }, [step]);

  const getBgPosition = useCallback(() => {
    if (step === "name") return "30% 48%";
    if (step === "contact") return "42% 46%";
    if (step === "message") return "54% 44%";
    if (step === "extras") return "66% 46%";
    if (step === "thankYou") return "75% 48%";
    return "50% 46%";
  }, [step]);

  const computeMessage = useCallback(() => {
    if (manualMode) {
      let msg = manualMessage.trim() || "No message";
      if (formData.referralName) msg += " Referral from " + formData.referralName + ".";
      return msg;
    }
    const tVal = topicValue === "other" && otherTopicValue.trim() ? otherTopicValue.trim() : topicValue;
    if (isExistingClient && actionValue && !actionNeedsTopicChips && actionChosen) {
      const article = getArticle(statusValue);
      let msg = "I am " + article + " " + statusValue + " and I would like to " + actionValue + ".";
      if (actionDetailValue.trim()) msg += " Details: " + actionDetailValue.trim();
      if (formData.referralName) msg += " Referral from " + formData.referralName + ".";
      return msg;
    } else if (statusValue && actionValue && tVal) {
      const article = getArticle(statusValue);
      const connector = isExistingClient ? "regarding" : "about";
      let msg = "I am " + article + " " + statusValue + " and I would like to " + actionValue + " " + connector + " " + tVal + ".";
      if (actionValue === "ask a question" && questionValue.trim()) msg += " Question: " + questionValue.trim();
      if (isExistingClient && actionNeedsTopicChips && elaborationValue.trim()) msg += " Additional details: " + elaborationValue.trim();
      if (formData.referralName) msg += " Referral from " + formData.referralName + ".";
      return msg;
    }
    return "";
  }, [manualMode, manualMessage, statusValue, actionValue, topicValue, otherTopicValue, isExistingClient, actionNeedsTopicChips, actionChosen, actionDetailValue, questionValue, elaborationValue, formData.referralName]);

  useEffect(() => {
    const msg = computeMessage();
    hiddenMessageRef.current = msg;
    setSentenceComplete(msg.length > 0 && !manualMode ? true : manualMode && manualMessage.trim().length > 0);
  }, [computeMessage, manualMode, manualMessage]);

  const scrollToBottom = useCallback(() => {
    safeTimeout(() => {
      messageScrollRef.current?.scrollTo({ top: messageScrollRef.current.scrollHeight, behavior: "smooth" });
    }, 300);
  }, [safeTimeout]);

  const typingRef = useRef(typing);
  typingRef.current = typing;

  const initializeStep3 = useCallback(() => {
    setStatusValue("");
    setActionValue("");
    setTopicValue("");
    setStatusChosen(false);
    setActionChosen(false);
    setTopicChosen(false);
    setIsExistingClient(false);
    setActionNeedsTopicChips(false);
    setOtherTopicValue("");
    setQuestionValue("");
    setElaborationValue("");
    setActionDetailValue("");
    setManualMode(false);
    setManualMessage("");
    setSentenceComplete(false);
    setActiveChipGroup("status");
    typing.resetAndType("I am a ");
  }, [typing]);

  useEffect(() => {
    if (step === "message" && !step3Initialized) {
      setStep3Initialized(true);
      safeTimeout(initializeStep3, 500);
    }
  }, [step, step3Initialized]);

  const handleStatusChipClick = useCallback((value: string) => {
    setStatusValue(value);
    setStatusChosen(true);
    const isExisting = value === "existing client";
    setIsExistingClient(isExisting);
    const article = getArticle(value);
    const prefix = "I am " + article + " " + value;
    typingRef.current.appendTo(prefix, () => {
      setActiveChipGroup("fade-status");
      safeTimeout(() => {
        typingRef.current.appendTo(prefix + " and I would like to ", () => {
          setActiveChipGroup(isExisting ? "existingAction" : "action");
        });
      }, 400);
    });
  }, [safeTimeout]);

  const handleActionChipClick = useCallback((value: string) => {
    setActionValue(value);
    setActionChosen(true);

    if (isExistingClient && value === "discuss a change to my build") {
      setActionNeedsTopicChips(true);
      const article = getArticle(statusValue);
      const prefix = "I am " + article + " " + statusValue + " and I would like to ";
      typingRef.current.appendTo(prefix + value, () => {
        setActiveChipGroup("fade-action");
        safeTimeout(() => {
          typingRef.current.appendTo(prefix + value + " regarding ", () => {
            setActiveChipGroup("existingTopic");
          });
        }, 400);
      });
    } else if (isExistingClient) {
      setActionNeedsTopicChips(false);
      setTopicChosen(true);
      setTopicValue("");
      const cfg = actionDetailConfigs[value] || { label: "Tell us more", placeholder: "" };
      setActionDetailPlaceholder(cfg.placeholder);
      const article = getArticle(statusValue);
      const prefix = "I am " + article + " " + statusValue + " and I would like to ";
      typingRef.current.appendTo(prefix + value, () => {
        setActiveChipGroup("fade-action");
        safeTimeout(() => {
          typingRef.current.appendTo(prefix + value + ".", () => {});
          setActiveChipGroup("actionDetail");
          scrollToBottom();
        }, 400);
      });
    } else {
      setActionNeedsTopicChips(false);
      const article = getArticle(statusValue);
      const prefix = "I am " + article + " " + statusValue + " and I would like to ";
      typingRef.current.appendTo(prefix + value, () => {
        setActiveChipGroup("fade-action");
        safeTimeout(() => {
          typingRef.current.appendTo(prefix + value + " about ", () => {
            setActiveChipGroup("topic");
          });
        }, 400);
      });
    }
  }, [statusValue, isExistingClient, scrollToBottom, safeTimeout]);

  const handleTopicChipClick = useCallback((value: string) => {
    setTopicValue(value);
    setTopicChosen(true);
    const article = getArticle(statusValue);
    const connector = isExistingClient ? "regarding" : "about";
    const prefix = "I am " + article + " " + statusValue + " and I would like to " + actionValue + " " + connector + " ";

    if (value === "other") {
      setActiveChipGroup("fade-topic");
      safeTimeout(() => {
        typingRef.current.setShowCursor(false);
        setActiveChipGroup("otherTopic");
        scrollToBottom();
      }, 300);
    } else {
      typingRef.current.appendTo(prefix + value + ".", () => {
        typingRef.current.setShowCursor(false);
        if (isExistingClient && actionNeedsTopicChips) {
          setActiveChipGroup("fade-topic");
          safeTimeout(() => {
            setActiveChipGroup("elaboration");
            scrollToBottom();
          }, 400);
        } else if (actionValue === "ask a question") {
          setActiveChipGroup("fade-topic");
          safeTimeout(() => {
            setActiveChipGroup("question");
            scrollToBottom();
          }, 400);
        } else {
          setActiveChipGroup("complete");
          scrollToBottom();
        }
      });
    }
  }, [statusValue, actionValue, isExistingClient, actionNeedsTopicChips, scrollToBottom, safeTimeout]);

  const validateStep = useCallback((s: Step): boolean => {
    const errs: Record<string, string> = {};
    if (s === "name") {
      if (!formData.name.trim()) errs.name = "Please enter your name";
    }
    if (s === "contact") {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 10) errs.phone = "Please enter a valid phone number";
      if (!formData.email.trim() || !validEmail(formData.email)) errs.email = "Please enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const goNext = useCallback(() => {
    if (!validateStep(step)) return;
    if (step === "name") {
      setStep("contact");
      safeTimeout(() => phoneRef.current?.focus(), 400);
    } else if (step === "contact") {
      setStep("message");
    } else if (step === "message") {
      setStep("extras");
    }
  }, [step, validateStep, safeTimeout]);

  const goBack = useCallback(() => {
    if (step === "contact") setStep("name");
    else if (step === "message") setStep("contact");
    else if (step === "extras") setStep("message");
  }, [step]);

  const handleEnter = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goNext();
    }
  }, [goNext]);

  const toggleManual = useCallback(() => {
    if (!manualMode) {
      setManualMode(true);
      setActiveChipGroup("manual");
      typing.setText("");
      typing.setShowCursor(false);
    } else {
      setManualMode(false);
      setManualMessage("");
      if (!statusChosen) {
        setActiveChipGroup("status");
        typing.resetAndType("I am a ");
      } else if (!actionChosen) {
        const article = getArticle(statusValue);
        typing.setText("I am " + article + " " + statusValue + " and I would like to ");
        setActiveChipGroup(isExistingClient ? "existingAction" : "action");
        typing.setShowCursor(true);
      } else if (!topicChosen) {
        const article = getArticle(statusValue);
        const connector = isExistingClient ? "regarding" : "about";
        typing.setText("I am " + article + " " + statusValue + " and I would like to " + actionValue + " " + connector + " ");
        setActiveChipGroup(isExistingClient ? "existingTopic" : "topic");
        typing.setShowCursor(true);
      } else {
        const article = getArticle(statusValue);
        const connector = isExistingClient ? "regarding" : "about";
        const tVal = topicValue === "other" ? otherTopicValue || "" : topicValue;
        if (isExistingClient && !actionNeedsTopicChips) {
          typing.setText("I am " + article + " " + statusValue + " and I would like to " + actionValue + ".");
        } else if (tVal) {
          typing.setText("I am " + article + " " + statusValue + " and I would like to " + actionValue + " " + connector + " " + tVal + ".");
        } else {
          typing.setText("I am " + article + " " + statusValue + " and I would like to " + actionValue + " " + connector + " ");
          setActiveChipGroup(isExistingClient ? "existingTopic" : "topic");
          typing.setShowCursor(true);
          return;
        }
        typing.setShowCursor(false);
        setActiveChipGroup("complete");
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

    const dedupeSource = formData.name + formData.email + msg;
    let h = 0;
    for (let i = 0; i < dedupeSource.length; i++) {
      h = (h * 31 + dedupeSource.charCodeAt(i)) | 0;
    }
    const hash = String(h);
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
        setStep("thankYou");
        reportConversion(
          { name: formData.name, email: formData.email, phone: formData.phone },
          "contact_submission",
          !isExistingClient,
          isExistingClient ? siteConfig.conversionValue.existingContact : siteConfig.conversionValue.newContact,
        );
      } else {
        console.error("Form submission error:", result.error);
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, formData, isExistingClient, safeTimeout]);

  const progress = getProgress();

  const renderChipGroup = (
    chips: { value: string; label: string }[],
    selectedValue: string,
    onSelect: (v: string) => void,
    groupId: string,
  ) => (
    <motion.div
      key={groupId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.3 }}
      className="cf-chips"
      data-testid={`chip-group-${groupId}`}
    >
      {chips.map((c) => (
        <button
          key={c.value}
          type="button"
          data-testid={`chip-${groupId}-${c.value.replace(/\s+/g, "-")}`}
          onClick={() => onSelect(c.value)}
          className={`cf-chip ${selectedValue === c.value ? "cf-chip--selected" : ""}`}
        >
          {c.label}
        </button>
      ))}
    </motion.div>
  );

  const renderMessageStep = () => {
    const showCompletionUI =
      activeChipGroup === "complete" ||
      activeChipGroup === "otherTopic" ||
      activeChipGroup === "question" ||
      activeChipGroup === "elaboration" ||
      activeChipGroup === "actionDetail";

    return (
      <div className="cf-step cf-step--wide" ref={messageScrollRef}>
        <div className="cf-step-head">
          <h2 className="cf-h2">Your message</h2>
          <p className="cf-sub">
            {manualMode ? (
              <>
                Type your message below, or{" "}
                <button type="button" onClick={toggleManual} className="cf-toggle" data-testid="link-toggle-guided">
                  use the guided options
                </button>
              </>
            ) : (
              <>
                Tap the options below to build your message, or{" "}
                <button type="button" onClick={toggleManual} className="cf-toggle" data-testid="link-toggle-manual">
                  click here to type your own
                </button>
              </>
            )}
          </p>
        </div>

        <div className="cf-msg-card" data-testid="sentence-card">
          {!manualMode && (
            <div className="cf-typed">
              <span data-testid="typed-text">{typing.displayText}</span>
              {typing.showCursor && <span className="cf-cursor" />}

              <AnimatePresence>
                {activeChipGroup === "otherTopic" && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="cf-inline-wrap">
                    <input
                      type="text"
                      data-testid="input-other-topic"
                      value={otherTopicValue}
                      onChange={(e) => setOtherTopicValue(e.target.value)}
                      placeholder="type a topic..."
                      maxLength={255}
                      className="cf-inline-input"
                      style={{ width: Math.max(140, (otherTopicValue.length + 6) * 12) + "px" }}
                      autoFocus
                    />
                    <span>.</span>
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeChipGroup === "otherTopic" && otherTopicValue.trim() && actionValue === "ask a question" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }}>
                    <textarea
                      data-testid="input-question"
                      value={questionValue}
                      onChange={(e) => setQuestionValue(e.target.value)}
                      placeholder="Type your question here... (optional)"
                      rows={2}
                      className="cf-build-textarea"
                    />
                  </motion.div>
                )}
                {activeChipGroup === "question" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                    <textarea
                      data-testid="input-question-direct"
                      value={questionValue}
                      onChange={(e) => setQuestionValue(e.target.value)}
                      placeholder="Type your question here... (optional)"
                      rows={2}
                      className="cf-build-textarea"
                      autoFocus
                    />
                  </motion.div>
                )}
                {activeChipGroup === "elaboration" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                    <textarea
                      data-testid="input-elaboration"
                      value={elaborationValue}
                      onChange={(e) => setElaborationValue(e.target.value)}
                      placeholder="Anything else to share? (optional)"
                      rows={2}
                      className="cf-build-textarea"
                      autoFocus
                    />
                  </motion.div>
                )}
                {activeChipGroup === "actionDetail" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                    <textarea
                      data-testid="input-action-detail"
                      value={actionDetailValue}
                      onChange={(e) => setActionDetailValue(e.target.value)}
                      placeholder={actionDetailPlaceholder}
                      rows={2}
                      className="cf-build-textarea"
                      autoFocus
                    />
                  </motion.div>
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
              className="cf-manual-textarea"
              autoFocus
            />
          )}
        </div>

        {!manualMode && (
          <div className="cf-chiparea">
            <AnimatePresence mode="wait">
              {activeChipGroup === "status" && renderChipGroup(statusChips, "", handleStatusChipClick, "status")}
              {activeChipGroup === "action" && renderChipGroup(actionChips, "", handleActionChipClick, "action")}
              {activeChipGroup === "existingAction" && renderChipGroup(existingActionChips, "", handleActionChipClick, "existingAction")}
              {activeChipGroup === "topic" && renderChipGroup(topicChips, "", handleTopicChipClick, "topic")}
              {activeChipGroup === "existingTopic" && renderChipGroup(existingTopicChips, "", handleTopicChipClick, "existingTopic")}
              {showCompletionUI && (
                <motion.div
                  key="completion-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                  className="cf-completion"
                >
                  <button data-testid="button-back-message" type="button" onClick={goBack} className="cf-back">
                    <ChevronLeft size={20} /> Back
                  </button>
                  <motion.button data-testid="button-next-message" type="button" onClick={goNext} className="cf-next" {...tapProps}>
                    Next step
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {manualMode && (
          <div className="cf-completion">
            <button data-testid="button-back-message" type="button" onClick={goBack} className="cf-back">
              <ChevronLeft size={20} /> Back
            </button>
            <motion.button data-testid="button-next-message" type="button" onClick={goNext} className="cf-next" {...tapProps}>
              Next step
              <ArrowRight size={20} />
            </motion.button>
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case "name":
        return (
          <motion.div key="name" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="cf-step cf-step--center">
            <div className="cf-step-head">
              <h2 className="cf-h2">Let's get started</h2>
              <p className="cf-sub">Tell us a bit about your project and we'll be in touch within one business day.</p>
            </div>
            <div className="cf-field">
              <label className="cf-label">
                Your full name <span className="cf-req">*</span>
              </label>
              <input
                ref={nameRef}
                data-testid="input-name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="John Smith"
                autoComplete="name"
                maxLength={120}
                onKeyDown={handleEnter}
                aria-label="Your full name"
                className={`cf-input ${errors.name ? "cf-input--error" : ""}`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="cf-error" role="alert" data-testid="error-name">
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="cf-actions">
              <div />
              <motion.button data-testid="button-next" type="button" onClick={goNext} disabled={!formData.name.trim()} className="cf-next" {...tapProps}>
                Next step
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        );

      case "contact":
        return (
          <motion.div key="contact" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="cf-step">
            <div className="cf-step-head">
              <h2 className="cf-h2">Contact information</h2>
              <p className="cf-sub">So we can get back to you quickly.</p>
            </div>
            <div>
              <div className="cf-field">
                <label className="cf-label">
                  Email address <span className="cf-req">*</span>
                </label>
                <input
                  ref={emailRef}
                  data-testid="input-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="john@example.com"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={100}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      phoneRef.current?.focus();
                    }
                  }}
                  className={`cf-input ${errors.email ? "cf-input--error" : ""}`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="cf-error" role="alert" data-testid="error-email">
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="cf-field">
                <label className="cf-label">
                  Phone number <span className="cf-req">*</span>
                </label>
                <input
                  ref={phoneRef}
                  data-testid="input-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", formatPhone(e.target.value))}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={14}
                  onKeyDown={handleEnter}
                  className={`cf-input ${errors.phone ? "cf-input--error" : ""}`}
                />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="cf-error" role="alert" data-testid="error-phone">
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <label className="cf-check-row">
                <input type="checkbox" data-testid="checkbox-text-optin" checked={formData.textOptIn} onChange={(e) => updateField("textOptIn", e.target.checked)} className="cf-check-input" />
                <span className={`cf-check-box ${formData.textOptIn ? "cf-check-box--checked" : ""}`}>{formData.textOptIn && <Check size={14} />}</span>
                <span className="cf-check-text">
                  I'd like to receive text messages from {siteConfig.businessName} regarding my project, appointments, and updates.
                </span>
              </label>
              <p className="cf-fineprint">
                Messaging frequency may vary. Message and data rates may apply. You can opt out any time by texting STOP. For our privacy policy, visit{" "}
                <a href={siteConfig.links.privacy} target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="cf-actions">
              <button data-testid="button-back" type="button" onClick={goBack} className="cf-back">
                <ChevronLeft size={20} /> Back
              </button>
              <motion.button
                data-testid="button-next"
                type="button"
                onClick={goNext}
                disabled={formData.phone.replace(/\D/g, "").length < 10 || !formData.email.trim()}
                className="cf-next"
                {...tapProps}
              >
                Next step
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        );

      case "message":
        return (
          <motion.div key="message" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="cf-message-wrap">
            {renderMessageStep()}
          </motion.div>
        );

      case "extras":
        return (
          <motion.div key="extras" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="cf-step">
            <div className="cf-step-head">
              <h2 className="cf-h2">Almost done!</h2>
              <p className="cf-sub">
                {isExistingClient ? "One last optional detail before you're all set." : "Just one more optional detail before you're all set."}
              </p>
            </div>
            <div>
              {!isExistingClient && (
                <div className="cf-field">
                  <label className="cf-label">How did you hear about us?</label>
                  <select
                    data-testid="select-referral"
                    value={formData.referralSource}
                    onChange={(e) => updateField("referralSource", e.target.value)}
                    className="cf-select"
                    style={{ color: formData.referralSource ? "#fff" : "rgba(255,255,255,0.55)" }}
                  >
                    <option value="" disabled>
                      Select an option...
                    </option>
                    {referralOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {formData.referralSource === "Other" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 12, overflow: "hidden" }}>
                        <input
                          data-testid="input-referral-other"
                          type="text"
                          value={formData.referralOther}
                          onChange={(e) => updateField("referralOther", e.target.value)}
                          placeholder="Please specify..."
                          maxLength={255}
                          className="cf-input"
                        />
                      </motion.div>
                    )}
                    {formData.referralSource === "Friend or Family Referral" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 12, overflow: "hidden" }}>
                        <input
                          data-testid="input-referral-name"
                          type="text"
                          value={formData.referralName}
                          onChange={(e) => updateField("referralName", e.target.value)}
                          placeholder="Who referred you? e.g. John Smith"
                          maxLength={255}
                          className="cf-input"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <div className="cf-actions">
              <button data-testid="button-back-extras" type="button" onClick={goBack} className="cf-back">
                <ChevronLeft size={20} /> Back
              </button>
              {duplicateWarning ? (
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="cf-dup">
                  Already submitted!
                </motion.div>
              ) : (
                <motion.button data-testid="button-submit" type="button" onClick={handleSubmit} disabled={isSubmitting} className="cf-next" {...tapProps}>
                  {isSubmitting ? (
                    <>
                      <span className="cf-spinner" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <Send size={20} />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        );

      case "thankYou":
        return (
          <motion.div key="thankYou" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition} className="cf-step">
            <div className="cf-ty">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="cf-ty-icon"
                data-testid="icon-success"
              >
                <Check size={44} color="#fff" />
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.3 }} className="cf-ty-title" data-testid="text-thank-you-title">
                Thank you — we're on it!
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.6 }} className="cf-ty-body">
                <p>We're grateful for the opportunity and will reach out as soon as possible, typically within one business day.</p>
                <p className="cf-ty-italic">Thanks again for choosing {siteConfig.businessName}. We look forward to speaking with you soon.</p>
                <p>
                  If this is urgent, call{" "}
                  <a href={siteConfig.phone.href} className="cf-ty-phone" data-testid="link-phone">
                    <Phone size={16} /> {siteConfig.phone.display}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cf-overlay">
      <div className="cf-bg">
        <motion.div
          className="cf-bg-pan"
          initial={{ scale: 1.08, x: 0, y: 0, opacity: 0 }}
          animate={
            reduced
              ? { opacity: bgLoaded ? 1 : 0 }
              : { scale: [1.08, 1.09, 1.07, 1.09, 1.08], x: [0, 2, -2, 1, 0], y: [0, -1, 2, -1, 0], opacity: bgLoaded ? 1 : 0 }
          }
          transition={
            reduced
              ? { opacity: { duration: 0.35 } }
              : { duration: 35, ease: "easeInOut", repeat: Infinity, delay: 2, opacity: { duration: 0.35, delay: 0 } }
          }
        >
          <picture>
            <source media="(min-width: 601px)" srcSet={siteConfig.images.contactDesktop} />
            <motion.img
              src={siteConfig.images.contactMobile}
              alt=""
              className="cf-bg-img"
              style={{ transform: "scale(1.15) translateZ(0)" }}
              animate={{ objectPosition: getBgPosition() }}
              transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
              loading="eager"
              onLoad={() => setBgLoaded(true)}
            />
          </picture>
        </motion.div>
        <div className="cf-bg-gradient" />
      </div>

      <div data-testid="progress-bar" className="cf-progress">
        <motion.div className="cf-progress-fill" animate={{ width: `${progress * 100}%` }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 20 }} />
      </div>

      {onClose && (
        <button type="button" onClick={onClose} data-testid="button-modal-close" aria-label="Close" className="cf-close">
          <X size={20} />
        </button>
      )}

      <div className="cf-scroll">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>

      <div data-testid="progress-bar-bottom" className="cf-progress cf-progress--bottom">
        <motion.div className="cf-progress-fill" animate={{ width: `${progress * 100}%` }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 20 }} />
      </div>
    </div>
  );
}
