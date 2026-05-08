import { GlassCard } from "../shared/GlassCard";
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink } from "lucide-react";

const helpCategories = [
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive guides and tutorials",
    items: [
      "Getting Started Guide",
      "AI Auto-Heal Configuration",
      "Crew Management Best Practices",
      "API Integration Guide",
    ],
  },
  {
    icon: MessageCircle,
    title: "Community",
    description: "Connect with other users",
    items: [
      "User Forums",
      "Feature Requests",
      "Bug Reports",
      "Success Stories",
    ],
  },
];

const supportContacts = [
  {
    type: "Email Support",
    value: "support@smartcrew.ai",
    icon: Mail,
    description: "24/7 support team",
  },
  {
    type: "Emergency Hotline",
    value: "+1 (800) SMART-CREW",
    icon: MessageCircle,
    description: "Critical issues only",
  },
];

export function HelpSupport() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h1>Help & Support</h1>
        </div>
        <p className="text-muted-foreground">
          Get help and learn about Smart Crew features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {helpCategories.map((category, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <category.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3>{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              {category.items.map((item, j) => (
                <button
                  key={j}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span>{item}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-6">Contact Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportContacts.map((contact, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-secondary/30">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <contact.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="mb-1">{contact.type}</h4>
                <p className="text-accent mb-1">{contact.value}</p>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              q: "How does AI Auto-Heal work?",
              a: "AI Auto-Heal uses machine learning to detect and automatically resolve crew conflicts using pre-approved scenarios with high success rates.",
            },
            {
              q: "Can I customize Auto-Heal thresholds?",
              a: "Yes, you can configure cost thresholds, conflict types, and approval requirements in the Auto-Heal settings.",
            },
            {
              q: "How accurate is the crew matching algorithm?",
              a: "Our AI crew matching has a 96% success rate based on certification, availability, and historical performance data.",
            },
          ].map((faq, i) => (
            <div key={i} className="p-5 rounded-lg bg-secondary/30">
              <h4 className="mb-2">{faq.q}</h4>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
