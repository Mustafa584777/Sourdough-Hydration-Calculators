'use client';

import { useState } from 'react';
import { Check, Mail, Send } from 'lucide-react';

const RECIPIENT_EMAIL = 'htmlcup@gmail.com';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Calculator Feedback');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const buildMailtoHref = () => {
    const subject = `[${topic}] Message from ${name.trim() || 'Reader'}`;
    const body = `Name: ${name.trim()}\nReply-To: ${email.trim()}\nTopic: ${topic}\n\n${message.trim()}`;
    return `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email address, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const href = buildMailtoHref();
    setSubmitted(true);
    window.location.href = href;
  };

  const mailtoHref = buildMailtoHref();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 lg:col-span-7">
        {submitted ? (
          <div className="space-y-4 py-4">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
              Message Ready to Send
            </h2>
            <p className="text-sm leading-relaxed text-stone-600">
              Your email app has been triggered with your message pre-filled. If it did
              not open automatically, click the button below to launch your mail client
              and complete sending.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={mailtoHref}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C2410C] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#9A3412] whitespace-nowrap"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Open Email App</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                }}
                className="inline-flex h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-[#1C1917] hover:bg-stone-50 cursor-pointer"
              >
                Edit Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
              Send a Message
            </h2>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-900"
              >
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-500"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Clara Vance"
                  className="mt-1.5 h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-500"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="baker@example.com"
                  className="mt-1.5 h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-500"
              >
                Topic
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-[#1C1917] focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
              >
                <option value="Calculator Feedback">Calculator Feedback</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Formula Question">Formula or Math Question</option>
                <option value="Bug Report">Bug Report</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-500"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a formula suggestion, report an issue, or ask about sourdough hydration math..."
                className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white p-3 text-sm text-[#1C1917] focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C2410C] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#9A3412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] cursor-pointer"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

      <aside className="space-y-6 lg:col-span-5">
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
            How Messages Work
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            Fill out the form and click Send Message. Your message stays private—nothing
            is stored in a third-party database—and opens directly in your email app for
            delivery.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-[#1C1917]">
            What We Love Hearing About
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li>• Requests for regional bread presets or specialty flours</li>
            <li>• Suggestions for baker&apos;s percentage workflow improvements</li>
            <li>• Corrections or edge cases in starter hydration math</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
