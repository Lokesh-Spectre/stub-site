import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface TestResult {
  id: string;
  target: string;
  status: 'success' | 'warning' | 'error';
  responseTime: number;
  timestamp: Date;
}

const NetworkTestPanel = () => {
  const [target, setTarget] = useState('8.8.8.8');
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const { toast } = useToast();

  const simulateNetworkTest = async (targetUrl: string) => {
    setTesting(true);
    
    // Simulate network test delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result: TestResult = {
      id: Date.now().toString(),
      target: targetUrl,
      status: Math.random() > 0.2 ? 'success' : Math.random() > 0.5 ? 'warning' : 'error',
      responseTime: Math.floor(Math.random() * 200) + 10,
      timestamp: new Date(),
    };

    setResults(prev => [result, ...prev].slice(0, 5));
    setTesting(false);

    toast({
      title: "Network Test Complete",
      description: `${targetUrl}: ${result.responseTime}ms`,
      variant: result.status === 'success' ? 'default' : 'destructive',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'status-online';
      case 'warning': return 'status-warning';
      case 'error': return 'status-offline';
      default: return 'status-online';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold font-display mb-4">Network Testing</h3>
          
          <div className="flex gap-2">
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter IP or domain..."
              className="bg-input/50 border-border/50 font-cyber"
            />
            <Button
              onClick={() => simulateNetworkTest(target)}
              disabled={testing || !target}
              className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow"
            >
              {testing ? 'Testing...' : 'Test'}
            </Button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground font-cyber">Recent Tests</h4>
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
              >
                <div className="flex items-center gap-3">
                  <Badge className={getStatusBadge(result.status)}>
                    {result.status}
                  </Badge>
                  <span className="font-cyber text-sm">{result.target}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{result.responseTime}ms</div>
                  <div className="text-xs text-muted-foreground">
                    {result.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default NetworkTestPanel;