import React from 'react';

const ErrorFallback: React.FC<{ fallback?: string; reset: () => void }> = ({ fallback, reset }) => {
  const [seconds, setSeconds] = React.useState(5);

  React.useEffect(() => {
    if (seconds <= 0) {
      window.location.reload();
      return;
    }
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #F7931A 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="max-w-2xl w-full bg-white border-8 border-ink p-12 text-center relative z-10 shadow-[-24px_24px_0_0_#F7931A]">
        <div className="text-ink text-8xl mb-8 font-display font-black leading-none">!!</div>
        
        <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase tracking-tight mb-4 leading-tight">
          System <span className="text-brand">Interruption</span>
        </h2>
        
        <p className="text-ink/60 font-body text-lg mb-10 max-w-md mx-auto leading-relaxed">
          {fallback || 'A critical strategic error occurred. The system is attempting a self-recovery protocol.'}
        </p>

        <div className="mb-12 p-8 bg-ink text-brand border-4 border-ink inline-block">
          <div className="text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-2 opacity-60">Automatic Refresh In</div>
          <div className="text-6xl font-display font-black tabular-nums leading-none">
            {formatTime(seconds)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="btn-brutalist bg-brand px-12 py-4 text-lg"
          >
            Refresh Now
          </button>
          <button
            onClick={reset}
            className="btn-brutalist bg-ink text-brand px-12 py-4 text-lg"
          >
            Back to Safety
          </button>
        </div>
      </div>
    </div>
  );
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: string }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[BK Career Academy Error]', error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          fallback={this.props.fallback} 
          reset={() => this.setState({ hasError: false, error: null })} 
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
