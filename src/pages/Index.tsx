import { PersonaCard } from "@/components/PersonaCard";
import { personas } from "@/data/personas";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Conversations</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Choose Your AI Persona
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with specialized AI assistants tailored to your needs. Each persona brings unique expertise and personality to help you achieve your goals.
            </p>
          </div>
        </div>
      </header>

      {/* Personas Grid */}
      <section className="container mx-auto px-4 py-12">
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
      </section>
    </div>
  );
};

export default Index;
