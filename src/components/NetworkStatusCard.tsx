import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NetworkStats {
  status: 'online' | 'warning' | 'offline';
  latency: number;
  uptime: string;
  region: string;
  connections: number;
  serverIp: string;
  webpageUptime: string;
}

const NetworkStatusCard = () => {
  const [stats, setStats] = useState<NetworkStats>({
    status: 'online',
    latency: 42,
    uptime: '99.9%',
    region: 'Global',
    connections: 1247,
    serverIp: '192.168.1.101',
    webpageUptime: '0d 0h 0m',
  });

  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      
      setStats(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * 100) + 20,
        connections: Math.floor(Math.random() * 500) + 1000,
        status: Math.random() > 0.1 ? 'online' : Math.random() > 0.5 ? 'warning' : 'offline',
        webpageUptime: `${days}d ${hours}h ${minutes}m`,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'warning': return 'status-warning';
      case 'offline': return 'status-offline';
      default: return 'status-online';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 cyber-glow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-display">Network Status</h3>
          <Badge className={`${getStatusColor(stats.status)} transition-all duration-500`}>
            <div className="network-node mr-2" />
            {stats.status.toUpperCase()}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-cyber">Latency</p>
            <p className="text-xl font-bold text-primary">{stats.latency}ms</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-cyber">Server Uptime</p>
            <p className="text-xl font-bold text-success">{stats.uptime}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-cyber">Server IP</p>
            <p className="text-lg font-medium text-accent">{stats.serverIp}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-cyber">Connections</p>
            <p className="text-xl font-bold text-accent">{stats.connections.toLocaleString()}</p>
          </div>
          
          <div className="col-span-2 space-y-1">
            <p className="text-sm text-muted-foreground font-cyber">Page Uptime</p>
            <p className="text-lg font-bold text-primary">{stats.webpageUptime}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NetworkStatusCard;