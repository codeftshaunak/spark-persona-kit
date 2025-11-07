import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, X, MessageCircle, Minimize2, Maximize2 } from "lucide-react";
import { chatAPI, ChatMessage } from "@/services/api";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hey there! I'm Seanie, a serial entrepreneur from Dublin. Whether you're starting your first business, scaling up, or just need some entrepreneurial advice - I'm here to help! What's on your mind?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const conversationHistory = messages.slice();

      let response;
      try {
        response = await chatAPI.chatWithPersona({
          persona_id: "seanie",
          message: userMessage.content,
          conversation_history: conversationHistory,
          temperature: 0.8,
          max_tokens: 300
        });
      } catch (openaiError) {
        console.log('OpenAI failed, falling back to test mode:', openaiError);
        response = await chatAPI.testChatWithPersona({
          persona_id: "seanie",
          message: userMessage.content
        });
      }

      if (response.success && response.message) {
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: response.message,
          timestamp: response.timestamp
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(response.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry mate, having a bit of trouble right now. Give it another go!",
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90 shadow-glow hover:shadow-xl transition-all duration-300 group p-0.5"
        >
          <div className="relative w-full h-full">
            <img
              src="/seanie-profile.jpg"
              alt="Seanie"
              className="w-full h-full rounded-full object-cover border border-primary-foreground"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border border-primary-foreground animate-pulse"></div>
          </div>
        </Button>
        <div className="absolute bottom-20 right-0 bg-card rounded-lg shadow-card p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-border">
          <p className="text-sm font-medium text-foreground">Chat with Seanie!</p>
          <p className="text-xs text-muted-foreground">Get entrepreneurial advice</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-card border border-border shadow-glow transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/seanie-profile.jpg"
                alt="Seanie"
                className="w-10 h-10 rounded-full object-cover border border-primary-foreground"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border border-primary-foreground"></div>
            </div>
            <div>
              <h3 className="font-semibold">Seanie</h3>
              <p className="text-xs opacity-90">Serial Entrepreneur</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-primary-foreground hover:bg-primary-foreground/20 p-1 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20 p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <img
                      src="/seanie-profile.jpg"
                      alt="Seanie"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <img
                    src="/seanie-profile.jpg"
                    alt="Seanie"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Seanie anything..."
                  className="flex-1 border-input focus:border-ring"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="bg-gradient-primary hover:opacity-90 flex-shrink-0"
                  disabled={isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                💡 Ask about startups, scaling, funding, or any business advice!
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}