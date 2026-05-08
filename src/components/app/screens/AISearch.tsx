import { useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { Send, Paperclip, Sparkles, Bot, User, BarChart3, TrendingUp, AlertCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  data?: any;
};

const examplePrompts = [
  "Show me all delayed flights in the last 6 hours",
  "Which crews are available for international flights tomorrow?",
  "Analyze conflict resolution trends this month",
  "Recommend optimal crew assignments for peak hours",
];

export function AISearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date(),
        data: generateDataCard(input),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("delayed")) {
      return "I found 4 delayed flights in the last 6 hours. The primary causes are crew shortages (2 flights) and weather conditions (2 flights). AI Auto-Heal successfully resolved 2 of these conflicts automatically.";
    }
    if (query.toLowerCase().includes("crew")) {
      return "Based on current availability and certifications, I've identified 12 crew members qualified for international flights tomorrow. Captain Sarah Chen and Captain Alex Rivera have the highest on-time performance ratings at 98% and 96% respectively.";
    }
    return "I've analyzed your request. Here's a comprehensive breakdown of the data with actionable insights.";
  };

  const generateDataCard = (query: string): any => {
    if (query.toLowerCase().includes("delayed")) {
      return {
        type: "flights",
        data: [
          { id: "AA-1523", delay: "45 min", cause: "Crew Shortage", status: "Auto-Resolved" },
          { id: "DL-8847", delay: "32 min", cause: "Weather", status: "Pending" },
          { id: "UA-2901", delay: "18 min", cause: "Crew Shortage", status: "Auto-Resolved" },
          { id: "BA-7742", delay: "55 min", cause: "Weather", status: "Review" },
        ],
      };
    }
    if (query.toLowerCase().includes("crew")) {
      return {
        type: "crew",
        data: [
          { name: "Captain Sarah Chen", cert: "Boeing 787", rating: "98%", status: "Available" },
          { name: "Captain Alex Rivera", cert: "Airbus A350", rating: "96%", status: "Available" },
          { name: "Captain Maria Santos", cert: "Boeing 777", rating: "94%", status: "Available" },
        ],
      };
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2>AI Command Center</h2>
            <p className="text-sm text-muted-foreground">Powered by Smart Crew AI Engine</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto space-y-8 py-12">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Bot className="w-8 h-8 text-accent" />
              </div>
              <h1>How can I help you today?</h1>
              <p className="text-muted-foreground">
                Ask me anything about flights, crew, conflicts, or analytics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examplePrompts.map((prompt, i) => (
                <GlassCard
                  key={i}
                  hover
                  className="p-4 cursor-pointer"
                  onClick={() => setInput(prompt)}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span className="text-sm">{prompt}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, i) => (
              <div key={i} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div className={`flex flex-col gap-2 max-w-2xl ${message.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.data && (
                    <GlassCard className="p-4 w-full">
                      {message.data.type === "flights" && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-4 h-4 text-accent" />
                            <span className="font-medium">Delayed Flights Analysis</span>
                          </div>
                          {message.data.data.map((flight: any, j: number) => (
                            <div
                              key={j}
                              onClick={() => navigate({ to: `/flight/${flight.id}` as never })}
                              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                            >
                              <div>
                                <div className="font-medium">{flight.id}</div>
                                <div className="text-sm text-muted-foreground">{flight.cause}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{flight.delay}</div>
                                <div
                                  className={`text-xs ${
                                    flight.status === "Auto-Resolved" ? "text-accent" : "text-muted-foreground"
                                  }`}
                                >
                                  {flight.status}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {message.data.type === "crew" && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            <span className="font-medium">Available Crew Members</span>
                          </div>
                          {message.data.data.map((crew: any, j: number) => (
                            <div
                              key={j}
                              onClick={() => navigate({ to: "/crew/profiles" })}
                              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                            >
                              <div>
                                <div className="font-medium">{crew.name}</div>
                                <div className="text-sm text-muted-foreground">{crew.cert}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-accent">{crew.rating}</div>
                                <div className="text-xs text-muted-foreground">{crew.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </GlassCard>
                  )}
                  <span className="text-xs text-muted-foreground px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-card border border-border">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-secondary/50 rounded-lg border border-border focus-within:border-accent transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask AI anything..."
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI can make mistakes. Verify critical flight information.
          </p>
        </div>
      </div>
    </div>
  );
}
