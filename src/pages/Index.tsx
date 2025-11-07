import { PersonaCard } from "@/components/PersonaCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { personas } from "@/data/personas";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Shield, Users, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Next-Generation AI Conversations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Meet Your Perfect AI Companion
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Connect with specialized AI personas designed for your unique needs. From creative brainstorming to technical guidance, find the perfect assistant to elevate your work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow text-lg px-8">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Personas
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">No credit card required • Free forever</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Choose Persona AI?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the future of AI-powered conversations with cutting-edge features
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Zap}
            title="Instant Responses"
            description="Get lightning-fast, intelligent responses powered by advanced AI technology for seamless conversations."
          />
          <FeatureCard
            icon={Users}
            title="Specialized Personas"
            description="Choose from expertly crafted AI personalities, each with unique skills and knowledge domains."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Private"
            description="Your conversations are encrypted and private. We prioritize your data security above all."
          />
          <FeatureCard
            icon={MessageSquare}
            title="Natural Conversations"
            description="Experience human-like interactions with context-aware AI that understands nuance and intent."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Continuous Learning"
            description="Our AI personas improve over time, adapting to provide better, more personalized assistance."
          />
          <FeatureCard
            icon={Sparkles}
            title="Multi-Purpose"
            description="From creative writing to technical support, find the perfect AI companion for any task."
          />
        </div>
      </section>

      {/* Personas Section */}
      <section id="personas" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our AI Personas
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet the diverse team of AI assistants ready to help you succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((persona, index) => (
              <div
                key={persona.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PersonaCard persona={persona} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4 shadow-glow">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Choose Your Persona</h3>
            <p className="text-muted-foreground">
              Browse our collection of specialized AI assistants and select the one that matches your needs.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center text-secondary-foreground text-2xl font-bold mx-auto mb-4 shadow-glow">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Start Conversing</h3>
            <p className="text-muted-foreground">
              Begin chatting immediately. Ask questions, seek advice, or brainstorm ideas together.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4 shadow-glow">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Achieve Your Goals</h3>
            <p className="text-muted-foreground">
              Get expert assistance and insights to help you accomplish tasks faster and better.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users already experiencing the power of specialized AI personas
            </p>
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
