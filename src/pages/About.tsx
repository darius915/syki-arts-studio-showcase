import artistPhoto from "@/assets/artist-photo.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="page-enter min-h-screen">
      {/* Header */}
      <div className="pt-28 lg:pt-36 pb-0">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-3">
            The Artist
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-medium text-foreground leading-tight">
            About <em>Syki</em>
          </h1>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Photo */}
            <div className="relative animate-slide-in-left" style={{ opacity: 0 }}>
              <img
                src={artistPhoto}
                alt="Syki in her studio"
                className="w-full rounded object-cover aspect-[4/5] shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-5 rounded hidden lg:block">
                <p className="font-display text-sm italic">"Every canvas is a conversation."</p>
              </div>
            </div>

            {/* Text */}
            <div className="animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-6 leading-tight">
                Where emotion becomes art,
                <em> and art becomes identity.</em>
              </h2>
              <div className="space-y-5 font-body text-sm lg:text-base text-muted-foreground leading-relaxed">
                <p>
                  Syki is a self-taught contemporary artist whose work explores the raw, 
                  unfiltered language of human emotion. Drawing inspiration from nature, 
                  personal experience, and the quiet moments between words, each piece 
                  is a deeply personal act of creation.
                </p>
                <p>
                  Working across mediums — from watercolor and ink to bold acrylic and 
                  oil — Syki's style is defined by bold gestural marks, a fearless 
                  relationship with color, and an intuitive sense of composition that 
                  turns chaos into poetry.
                </p>
                <p>
                  Syki-Arts Studio was founded with a simple belief: that art should 
                  be accessible, emotional, and alive. Whether it's a commissioned 
                  portrait, an abstract exploration, or a delicate botanical study, 
                  every work is made with intention and love.
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-border" />

              {/* Skills */}
              <div className="mb-8">
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  Mediums & Techniques
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Watercolor", "Acrylic", "Oil Painting", "Ink Drawing", "Mixed Media", "Gold Leaf", "Botanical Illustration"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground font-body text-xs rounded border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-block px-7 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded transition-all hover:bg-terracotta-600 hover:shadow-lg"
              >
                Commission a Piece
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-3">How It Works</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground">
              The Commission <em>Process</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect",
                desc: "Share your vision, the space it's for, colors you love, and the feeling you want it to evoke.",
              },
              {
                step: "02",
                title: "Create",
                desc: "Syki works with you through sketches and color studies, keeping you involved every step of the way.",
              },
              {
                step: "03",
                title: "Deliver",
                desc: "Your unique, signed original artwork is carefully packaged and delivered to your door.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="font-display text-6xl font-medium text-primary/20 mb-3">{step}</div>
                <h3 className="font-display text-2xl font-medium text-foreground mb-3">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Syki-Arts Studio · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
