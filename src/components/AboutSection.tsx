import { Shield, Users, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Tested for Everyday Use",
    description: "Each product is tested for durability, fit, and long-term use — not just factory approval.",
  },
  {
    icon: Users,
    title: "Hassle-Free Warranty",
    description: "Simple warranty registration and quick resolution — no long email threads, no confusion.",
  },
  {
    icon: Award,
    title: "Thoughtfully Engineered",
    description: "Material selection, structure, and finish are optimized for daily handling — not showroom looks.",
  },
  {
    icon: Heart,
    title: "Made for Real Homes",
    description: "Designed to blend into modern homes while solving everyday problems — without overcomplication.",
  },
];

const AboutSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-brand">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-section mb-4">
            What Makes TERRIVO <span className="text-primary">Worth Trusting</span>
          </h2>
          <p className="text-lead">
            Every Terrivo product goes through multi-stage quality checks and real-world usage testing before it reaches your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group p-6 bg-background rounded-xl border border-border card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
