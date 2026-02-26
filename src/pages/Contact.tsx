import { FormEvent, useState } from "react";

const ARTIST_EMAIL = "sykilliarts@gmail.com";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "Commission Request",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitMessage(null);
    setSubmitError(null);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ARTIST_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _captcha: "true",
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to send message right now.");
      }

      setSubmitMessage("Message sent. Syki will be in touch soon.");
      setForm({
        name: "",
        email: "",
        subject: "Commission Request",
        message: "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-enter min-h-screen">
      <div className="pt-28 lg:pt-36 pb-12 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-medium text-foreground leading-tight">
            Commission <em>a Piece</em>
          </h1>
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-display text-3xl font-medium text-foreground mb-6 leading-tight">
                Let us create something <em>just for you.</em>
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                Fill out the form and Syki will get back to you within 2-3 business days.
                Please share as much detail as possible - size, medium preference, color palette,
                and the story or feeling behind the piece.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Email", value: ARTIST_EMAIL },
                  { label: "Response time", value: "2-3 business days" },
                  { label: "Commissions", value: "Open" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="font-body text-xs uppercase tracking-widest text-muted-foreground w-32">
                      {label}
                    </span>
                    <span className="font-body text-sm text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Commission Request</option>
                  <option>Purchase Inquiry</option>
                  <option>Collaboration</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Your vision
                </label>
                <textarea
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-card border border-border rounded font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell Syki about the piece you would love to have - size, style, colors, what it means to you..."
                />
              </div>
              {submitMessage && (
                <p className="font-body text-xs text-accent">{submitMessage}</p>
              )}
              {submitError && (
                <p className="font-body text-xs text-destructive">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded transition-all hover:bg-terracotta-600 hover:shadow-lg"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-xs text-muted-foreground">
            (c) {new Date().getFullYear()} Syki-Arts Studio - All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
