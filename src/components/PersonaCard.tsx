import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  avatar?: string;
}

interface PersonaCardProps {
  persona: Persona;
}

export const PersonaCard = ({ persona }: PersonaCardProps) => {
  return (
    <Link to={`/chat/${persona.id}`} className="block">
      <Card className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group border-border bg-card">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            {persona.avatar ? (
              <img src={persona.avatar} alt={persona.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <Bot className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-1 text-foreground">{persona.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{persona.role}</p>
            <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{persona.description}</p>
            <div className="flex flex-wrap gap-2">
              {persona.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
