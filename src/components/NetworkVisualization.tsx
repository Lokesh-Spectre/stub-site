import { useEffect, useState } from 'react';

const NetworkVisualization = () => {
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number; connected: boolean }>>([]);
  const [connections, setConnections] = useState<Array<{ from: number; to: number; active: boolean }>>([]);

  useEffect(() => {
    // Generate random network nodes
    const newNodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connected: Math.random() > 0.3,
    }));

    // Generate connections between nearby nodes
    const newConnections: Array<{ from: number; to: number; active: boolean }> = [];
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j && Math.random() > 0.85) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 30) {
            newConnections.push({
              from: node.id,
              to: otherNode.id,
              active: Math.random() > 0.5,
            });
          }
        }
      });
    });

    setNodes(newNodes);
    setConnections(newConnections);

    // Animate connection states
    const interval = setInterval(() => {
      setConnections(prev =>
        prev.map(conn => ({
          ...conn,
          active: Math.random() > 0.4,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={conn.active ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
              strokeWidth="0.1"
              opacity={conn.active ? 0.8 : 0.3}
              className="transition-all duration-1000"
            >
              {conn.active && (
                <animate
                  attributeName="stroke-opacity"
                  values="0.3;1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}

        {/* Network nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.connected ? "0.3" : "0.15"}
            fill={node.connected ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
            className="transition-all duration-500"
          >
            {node.connected && (
              <animate
                attributeName="r"
                values="0.3;0.5;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default NetworkVisualization;