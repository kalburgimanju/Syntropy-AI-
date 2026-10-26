import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, MessageSquare, Shield, Cpu, Target, HelpCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiSimulationLab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('board-pitch');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to your AI Coaching Simulation Lab. I am Coach Syntropy. Before your live session or your high-stakes executive meeting, we can stress-test your arguments, architecture choices, or pitch. Select a scenario and let's begin with your opening statement."
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios = [
    {
      id: 'board-pitch',
      title: 'Board AI Investment Rehearsal',
      icon: <Target className="w-4 h-4 text-indigo-400" />,
      description: 'Defend your $400k AI budget request against skeptical CFO scrutiny.'
    },
    {
      id: 'system-design',
      title: 'Architectural Trade-Off Defense',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      description: 'Defend choosing RAG with frontier reasoning vs. fine-tuning an open-weight model.'
    },
    {
      id: 'prompt-teardown',
      title: 'Prompt & Guardrail Teardown',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      description: 'Practice writing zero-hallucination structured system prompts for multi-step tools.'
    },
    {
      id: 'compliance-audit',
      title: 'Enterprise Compliance Defense',
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      description: 'Address strict EU AI Act and customer data privacy requirements.'
    }
  ];

  const currentScenarioObj = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    const scen = scenarios.find(s => s.id === scenarioId);
    setMessages([
      {
        role: 'assistant',
        content: `Switched scenario to: ${scen?.title}. ${scen?.description} How would you frame your primary thesis or position to get started?`
      }
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/gemini/coaching-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          scenario: `${currentScenarioObj.title}: ${currentScenarioObj.description}`
        })
      });

      const data = await response.json();
      const reply = data.reply || "Understood. Let's delve deeper into that strategic lever.";
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Simulation error:', err);
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: "Solid opening point. Now consider: what is your precise quantitative metric for error recovery when this agent fails in production? How will you demonstrate cost predictability to your stakeholders?"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-1">
            Asynchronous Rehearsal
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            AI Coaching Simulation Lab
          </h2>
          <p className="text-sm text-slate-300">
            Hone your strategic arguments, prompt engineering, and executive pitch in real time with our simulated AI coaching partner before your live 1:1 call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scenario Selectors */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Practice Scenario
            </div>

            {scenarios.map(scen => (
              <div
                key={scen.id}
                onClick={() => handleSelectScenario(scen.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedScenario === scen.id
                    ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {scen.icon}
                  <span className="text-xs sm:text-sm font-semibold text-white">{scen.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {scen.description}
                </p>
              </div>
            ))}

            {/* Quick tips box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Coach Simulation Rules</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Be specific with figures, constraints, and architecture. Coach Syntropy will identify ambiguities and test your defensive reasoning.
              </p>
            </div>
          </div>

          {/* Right Column: Chat Box */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col h-[580px] overflow-hidden shadow-xl">
            
            {/* Chat Header */}
            <div className="px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Coach Syntropy Interactive Drill</div>
                  <div className="text-[10px] text-slate-400">{currentScenarioObj.title}</div>
                </div>
              </div>

              <button
                onClick={() => handleSelectScenario(selectedScenario)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                title="Reset drill"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Drill</span>
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    <span>Coach Syntropy is analyzing your answer...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="State your position, explain your architectural rationale, or ask a question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isSending}
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
