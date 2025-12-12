import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow-primary">
      <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-cyber flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
