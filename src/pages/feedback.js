import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

const FEEDBACK_EMAIL = 'Adam.c.gohs@usace.army.mil';

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
(Screenshots, steps to reproduce, or anything else that might help)

---------------------------------------------------------------------`,
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
(References, sources, or other information that supports the change)

---------------------------------------------------------------------`,
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
(Any other details that might help us answer your question)

---------------------------------------------------------------------`,
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
(Do you have specific suggestions for improvement?)

---------------------------------------------------------------------`,
  },
];

function buildMailtoHref(category) {
  return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(category.subject)}&body=${encodeURIComponent(category.body)}`;
}

function FeedbackCard({ category }) {
  return (
    <a href={buildMailtoHref(category)} className="feedback-card group" aria-label={`${category.title} - opens your email client`}>
      <div className="feedback-card-icon">{category.icon}</div>
      <div className="feedback-card-content">
        <h3 className="feedback-card-title">{category.title}</h3>
        <p className="feedback-card-description">{category.description}</p>
      </div>
      <div className="feedback-card-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </a>
  );
}

export default function Feedback() {
  return (
    <Layout title="Feedback" description="Provide feedback on the RMC Software Documentation site.">
      <main className="feedback-page">
        <div className="feedback-header">
          <h1>Feedback</h1>
          <p>
            Help us improve the RMC Software Documentation. Choose a category below to send us your feedback via email. Your input helps us maintain
            accurate, useful, and accessible documentation.
          </p>
        </div>
        <div className="feedback-grid">
          {feedbackCategories.map((category) => (
            <FeedbackCard key={category.id} category={category} />
          ))}
        </div>
        <div className="feedback-footer">
          <p>
            Clicking a button above will open your default email application with a pre-filled template. Fill in the details and send the email to
            submit your feedback.
          </p>
        </div>
      </main>
    </Layout>
  );
}
