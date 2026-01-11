import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpeg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-muted">
      <div className="container-brand section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 5,000+ Customers</span>
            </div>

            <h1 className="heading-display mb-6">
              Terrivo: Quality{" "}
              <span className="text-primary">You Can Trust</span>
            </h1>

            <p className="text-lead mb-8 max-w-lg">
              Terrivo designs durable, cotton canvas storage solutions and supports
              every product with a clear warranty and customer care process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">

              <Link
                to="/warranty"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card text-foreground border border-border rounded-lg font-semibold hover:bg-muted transition-all duration-300"
              >
                Register Warranty
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">6 Month Warranty</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-brand-xl">
              <img
                src={heroImage}
                alt="Terrivo premium electronics collection featuring wireless earbuds, smartwatch and power bank"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-brand-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Protected</p>
                  <p className="text-sm text-muted-foreground">6 Month Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
