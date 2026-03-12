import Layout from '@theme/Layout';
import { useCallback, useEffect, useRef, useState } from 'react';

const FEEDBACK_EMAIL = 'RMCSoftwareDocs@usace.army.mil';

const feedbackCategories = [
  {
    id: 'bug',
    title: 'Report a Bug',
    description: 'Found a broken link, formatting issue, missing image, or something that does not display correctly? Let us know.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    ),
    subject: '[Bug Report] RMC Documentation',
    body: `Thank you for reporting a bug. Please fill in the details below.
---------------------------------------------------------------------

PAGE URL:
(Paste the URL of the page where you found the issue)

DESCRIPTION OF THE ISSUE:
(What did you see? What is wrong?)

EXPECTED BEHAVIOR:
(What did you expect to see instead?)

BROWSER AND DEVICE:
(e.g., Chrome on Windows 11, Safari on iPad)

ADDITIONAL DETAILS:
(Screenshots, steps to reproduce, or anything else that might help)`,
  },
  {
    id: 'content',
    title: 'Suggest a Content Change',
    description: 'See something inaccurate, outdated, or unclear in the documentation? Suggest an improvement.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    ),
    subject: '[Content Suggestion] RMC Documentation',
    body: `Thank you for suggesting a content improvement. Please fill in the details below.
---------------------------------------------------------------------

PAGE OR SECTION:
(Which page or section does this relate to? Include the URL if possible)

WHAT NEEDS TO CHANGE:
(Describe the current content and what is inaccurate, outdated, or unclear)

SUGGESTED REVISION:
(How should the content read? Provide your suggested text if possible)

ADDITIONAL CONTEXT:
(References, sources, or other information that supports the change)`,
  },
  {
    id: 'question',
    title: 'Ask a Question',
    description: "Can't find what you're looking for, or need clarification on something in the documentation?",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    ),
    subject: '[Question] RMC Documentation',
    body: `Thank you for reaching out. Please fill in the details below.
---------------------------------------------------------------------

YOUR QUESTION:
(What would you like to know?)

RELEVANT PAGE OR TOPIC:
(Which page, tool, or topic does this relate to?)

WHAT YOU HAVE TRIED:
(Have you searched the documentation? What did you find or not find?)

ADDITIONAL CONTEXT:
(Any other details that might help us answer your question)`,
  },
  {
    id: 'general',
    title: 'General Feedback',
    description: 'Have an idea, comment, or general feedback about the documentation site? We want to hear from you.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
    subject: '[General Feedback] RMC Documentation',
    body: `Thank you for your feedback. Please fill in the details below.
---------------------------------------------------------------------

YOUR FEEDBACK:
(Share your thoughts, ideas, or comments)

WHAT PROMPTED THIS FEEDBACK:
(Is this about a specific page, feature, or your overall experience?)

SUGGESTIONS:
(Do you have specific suggestions for improvement?)`,
  },
];

/* ---------- Feedback Modal ---------- */

const ANIMATION_MS = 250;

const BACKDROP_BASE = 'fixed inset-0 z-50 overflow-y-auto bg-black/35 px-4 py-8 sm:px-16 sm:py-16 transition-opacity';
const BACKDROP_VISIBLE = 'opacity-100';
const BACKDROP_HIDDEN = 'opacity-0';

const DIALOG_BASE = 'bg-[var(--ifm-background-surface-color)] mx-auto max-w-lg rounded-md shadow-lg transition-all px-5 sm:px-7';
const DIALOG_VISIBLE = 'translate-y-0 scale-100 opacity-100';
const DIALOG_HIDDEN = '-translate-y-2 scale-95 opacity-0';

const HEADER = 'flex items-start justify-between border-b border-border-color -mx-5 sm:-mx-7 px-5 sm:px-7';
const TITLE = 'flex items-center gap-2 py-4 font-usace text-lg font-semibold text-font-color';
const CLOSE_BUTTON = 'cursor-pointer px-2 py-2 -mr-4 text-[1.5rem] leading-none text-slate-400 hover:text-red-500';
const BODY = 'pt-5 pb-4 sm:pt-6';

function FeedbackModal({ isOpen, category, onClose }) {
  const dialogRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      closingRef.current = false;
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  const animateClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      onCloseRef.current();
      closingRef.current = false;
    }, ANIMATION_MS);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        animateClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, animateClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !category) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) animateClose();
  };

  return (
    <div className={`${BACKDROP_BASE} duration-500 ${visible ? BACKDROP_VISIBLE : BACKDROP_HIDDEN}`} onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        className={`${DIALOG_BASE} duration-500 ${visible ? DIALOG_VISIBLE : DIALOG_HIDDEN}`}
      >
        {/* Header */}
        <div className={HEADER}>
          <div id="feedback-modal-title" className={TITLE}>
            {category.title}
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={animateClose} className={CLOSE_BUTTON} aria-label="Close modal">
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={BODY}>
          <p className="m-0 mb-4 font-usace text-sm leading-normal text-font-color-description">
            Copy the details below into a new email to submit your feedback.
          </p>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block font-usace text-xs font-semibold uppercase tracking-wide text-font-color-description">To</label>
              <div className="select-all rounded-md border border-border-color bg-[var(--ifm-background-surface-color)] px-3 py-2 font-usace text-sm text-font-color">
                {FEEDBACK_EMAIL}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-usace text-xs font-semibold uppercase tracking-wide text-font-color-description">Subject</label>
              <div className="select-all rounded-md border border-border-color bg-[var(--ifm-background-surface-color)] px-3 py-2 font-usace text-sm text-font-color">
                {category.subject}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-usace text-xs font-semibold uppercase tracking-wide text-font-color-description">Body</label>
              <div className="overflow-hidden rounded-md border border-border-color bg-[var(--ifm-background-surface-color)]">
                <pre
                  className="select-all overflow-auto whitespace-pre-wrap bg-transparent px-3 py-2 font-usace text-sm leading-relaxed text-font-color"
                  style={{ maxHeight: '250px' }}
                >
                  {category.body}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Feedback Card ---------- */

function FeedbackCard({ category, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className="group relative flex cursor-pointer flex-col items-start gap-3 rounded-[10px] border border-border-color bg-[var(--ifm-background-color-theme)] p-6 text-inherit !no-underline transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ifm-primary hover:text-inherit hover:shadow-[0_4px_16px_rgba(74,124,155,0.15)] dark:hover:shadow-[0_4px_16px_rgba(127,181,208,0.12)]"
      aria-label={`${category.title} - view email template`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-ifm-primary-lightest text-ifm-primary dark:bg-[rgba(127,181,208,0.12)] dark:text-ifm-primary-light">
        {category.icon}
      </div>
      <div className="flex-1">
        <h3 className="m-0 mb-1 font-usace text-[1.05rem] font-semibold text-font-color">{category.title}</h3>
        <p className="m-0 font-usace text-sm leading-normal text-font-color-description">{category.description}</p>
      </div>
      <div className="absolute right-5 top-5 text-border-color transition-[color,transform] duration-200 group-hover:translate-x-[3px] group-hover:text-ifm-primary">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </button>
  );
}

/* ---------- Page ---------- */

export default function Feedback() {
  const [modalCategory, setModalCategory] = useState(null);

  return (
    <Layout title="Feedback" description="Provide feedback on the RMC Software Documentation site.">
      <main>
        <div className="border-b border-border-color bg-ifm-primary-lightest px-6 py-4 text-center dark:bg-surface-card lg:py-10">
          <div className="mx-auto max-w-[600px]">
            <h1 className="m-0 mb-3 font-usace text-h1 font-bold text-font-color">Feedback</h1>
            <p className="m-0 font-usace text-base leading-relaxed text-font-color-description">
              Help us improve the RMC Software Documentation. Choose a category below to send us your feedback via email. Your input helps us maintain
              accurate, useful, and accessible documentation.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[800px] px-6 pb-16 pt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {feedbackCategories.map((category) => (
              <FeedbackCard key={category.id} category={category} onSelect={setModalCategory} />
            ))}
          </div>
          <div className="mt-6 border-t border-border-color pt-4 text-center">
            <p className="m-0 font-usace text-[0.8rem] leading-normal text-font-color-description">
              Clicking a category above will display a pre-filled email template. Copy the details into a new email and send it to submit your
              feedback.
            </p>
          </div>
        </div>
      </main>

      <FeedbackModal isOpen={!!modalCategory} category={modalCategory} onClose={() => setModalCategory(null)} />
    </Layout>
  );
}
