import NetworkVisualization from '@/components/NetworkVisualization';
import NetworkStatusCard from '@/components/NetworkStatusCard';
import NetworkTestPanel from '@/components/NetworkTestPanel';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background network */}
      <NetworkVisualization />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-16 animate-float">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent font-display">
            NETWORK ARTLAB
          </h1>
          <p className="text-xl text-muted-foreground mb-8 font-cyber max-w-2xl mx-auto">
            Artistic cloud instance testing and network debugging environment
          </p>
          <div className="flex justify-center gap-4">
            <div className="network-node" />
            <div className="network-node" style={{ animationDelay: '0.5s' }} />
            <div className="network-node" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <NetworkStatusCard />
          <NetworkTestPanel />
        </div>

        {/* Footer info */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex justify-center gap-8 text-sm text-muted-foreground font-cyber">
            <span>Instance: cloud-01</span>
            <span>Region: Global</span>
            <span>Uptime: 99.9%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Real-time network visualization and testing interface
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
