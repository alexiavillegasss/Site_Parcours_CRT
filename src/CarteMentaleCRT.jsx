import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

// Les données initiales de la carte
const initialNodes = [
  {
    id: '1',
    data: { label: 'Centre de Ressources Territorial' },
    position: { x: 850, y: 50 },
    style: { background: '#fde047', borderRadius: 10, padding: 10, fontWeight: 'bold' },
  },
  {
    id: '2',
    data: { label: 'CRT Provence Verdon' },
    position: { x: 450, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
  {
    id: '3',
    data: { label: 'CRT Felix Pey' },
    position: { x: 650, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
  {
    id: '4',
    data: { label: 'CRT CHITS' },
    position: { x: 850, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
  {
    id: '5',
    data: { label: 'CRT Marvivo' },
    position: { x: 1050, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
  {
    id: '6',
    data: { label: 'CRT Le Beausset' },
    position: { x: 1250, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
];

const initialEdges = [ { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#888' }, draggable: false },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#888' }, draggable: false },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#888' }, draggable: false },
  { id: 'e1-5', source: '1', target: '5', animated: true, style: { stroke: '#888' }, draggable: false },
  { id: 'e1-6', source: '1', target: '6', animated: true, style: { stroke: '#888' }, draggable: false },];


const childrenMap = {
  '2': [
    {
      id: '2a',
      data: { label: 'Compte rendu des actions' },
      style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
      position: { x: 0, y: 400 },
      draggable: false,
    },
    {
      id: '2b',
      data: { label: "L'équipe de votre CRT" },
      style: { background: '#bbf7d0', borderRadius: 10 },
      position: { x: 100, y: 400 },
      draggable: false,
    },
    {
      id: '2c',
      data: { label: 'Informations' },
      style: { background: '#a5f3fc', borderRadius: 10 },
      position: { x: 200, y: 500 },
      draggable: false,
    },
  ],
  '2a': [
    {
      id: 'CR-2a',
      data: {
        label: 'Visualisez le compte rendu de votre CRT',
        url: 'CR-PV.PDF',
      },
      style: { background: '#fef08a', borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false,
    },
  ],
  '2b': [
    {
      id: 'équip-2b',
      data: {
        label: "Visualisez l'équipe de votre CRT",
        url: 'equip-PV.pdf',
      },
      style: { background: '#fef08a', borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false,
    },
  ],
  '2c': [
    {
      id: 'info-flyer-2c',
      data: {
        label: '📄 Voir le flyer explicatif',
        url: 'Plaquette_CRT_PV_1.pdf',
      },
      style: { background: '#a2d7ff', borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false,
    },
    {
      id: 'info-ppt-2c',
      data: {
        label: '📄 Voir le Powerpoint explicatif',
        url: 'ppt présentation CRT PV.pdf',
      },
      style: { background: '#a2d7ff', borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false,
    },
  ],
  "3": [
  {
    id: "3a",
    data: { label: "Compte rendu des actions" },
    style: { background: "#bbf7d0", borderRadius: 10, whiteSpace: "pre-line" },
    position: { x: 0, y: 400 },
    draggable: false
  },
  {
    id: "3b",
    data: { label: "L'équipe de votre CRT" },
    style: { background: "#bbf7d0", borderRadius: 10 },
    position: { x: 100, y: 400 },
    draggable: false
  },
  {
    id: "3c",
    data: { label: "Informations" },
    style: { background: "#a5f3fc", borderRadius: 10 },
    position: { x: 200, y: 500 },
    draggable: false
  }
],
"3a": [
  {
    id: "CR-3a",
    data: {
      label: "Visualisez le compte rendu de votre CRT",
      url: "CR-FP.PDF"
    },
    style: { background: "#fef08a", borderRadius: 10 },
    position: { x: 0, y: 0 },
    draggable: false
  }
],
"3b": [
  {
    id: "équip-3b",
    data: {
      label: "Visualisez l'équipe de votre CRT",
      url: "equip-FP.pdf"
    },
    style: { background: "#fef08a", borderRadius: 10 },
    position: { x: 0, y: 0 },
    draggable: false
  }
],
"3c": [
  {
    id: "info-flyer-3c",
    data: {
      label: "📄 Voir le flyer explicatif",
      url: "Plaquette_CRT_FELIX_PEY_1.pdf"
    },
    style: { background: "#a2d7ff", borderRadius: 10 },
    position: { x: 0, y: 0 },
    draggable: false
  },
  {
    id: "info-ppt-3c",
    data: {
      label: "📄 Voir le Powerpoint explicatif",
      url: "ppt présentation CRT Félix Pey.pdf"
    },
    style: { background: "#a2d7ff", borderRadius: 10 },
    position: { x: 0, y: 0 },
    draggable: false
  }
],
  "4": [
    {
      id: "4a",
      data: { label: "Compte rendu des actions" },
      style: { background: "#bbf7d0", borderRadius: 10, whiteSpace: "pre-line" },
      position: { x: 0, y: 400 },
      draggable: false
    },
    {
      id: "4b",
      data: { label: "L'équipe de votre CRT" },
      style: { background: "#bbf7d0", borderRadius: 10 },
      position: { x: 100, y: 400 },
      draggable: false
    },
    {
      id: "4c",
      data: { label: "Informations" },
      style: { background: "#a5f3fc", borderRadius: 10 },
      position: { x: 200, y: 500 },
      draggable: false
    }
  ],
  "4a": [
    {
      id: "CR-4a",
      data: {
        label: "Visualisez le compte rendu de votre CRT",
        url: "CR-CHITS.PDF"
      },
      style: { background: "#fef08a", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "4b": [
    {
      id: "équip-4b",
      data: {
        label: "Visualisez l'équipe de votre CRT",
        url: "equip-CHITS.pdf"
      },
      style: { background: "#fef08a", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "4c": [
    {
      id: "info-flyer-4c",
      data: {
        label: "📄 Voir le flyer explicatif",
        url: "Plaquette_CRT_CHITS_1.pdf"
      },
      style: { background: "#a2d7ff", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    },
    {
      id: "info-ppt-4c",
      data: {
        label: "📄 Voir le Powerpoint explicatif",
        url: "ppt présentation CRT CHITS.pdf"
      },
      style: { background: "#a2d7ff", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "5": [
    {
      id: "5a",
      data: { label: "Compte rendu des actions" },
      style: { background: "#bbf7d0", borderRadius: 10, whiteSpace: "pre-line" },
      position: { x: 0, y: 400 },
      draggable: false
    },
    {
      id: "5b",
      data: { label: "L'équipe de votre CRT" },
      style: { background: "#bbf7d0", borderRadius: 10 },
      position: { x: 100, y: 400 },
      draggable: false
    },
    {
      id: "5c",
      data: { label: "Informations" },
      style: { background: "#a5f3fc", borderRadius: 10 },
      position: { x: 200, y: 500 },
      draggable: false
    }
  ],
  "5a": [
    {
      id: "CR-5a",
      data: {
        label: "Visualisez le compte rendu de votre CRT",
        url: "CR-MAR.PDF"
      },
      style: { background: "#fef08a", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "5b": [
    {
      id: "équip-5b",
      data: {
        label: "Visualisez l'équipe de votre CRT",
        url: "equip-MAR.pdf"
      },
      style: { background: "#fef08a", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "5c": [
    {
      id: "info-flyer-5c",
      data: {
        label: "📄 Voir le flyer explicatif",
        url: "Plaquette_CRT_MAR_1.pdf"
      },
      style: { background: "#a2d7ff", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    },
    {
      id: "info-ppt-5c",
      data: {
        label: "📄 Voir le Powerpoint explicatif",
        url: "ppt présentation CRT MAR.pdf"
      },
      style: { background: "#a2d7ff", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "6": [
    {
      id: "6a",
      data: { label: "Compte rendu des actions" },
      style: { background: "#bbf7d0", borderRadius: 10, whiteSpace: "pre-line" },
      position: { x: 0, y: 400 },
      draggable: false
    },
    {
      id: "6b",
      data: { label: "L'équipe de votre CRT" },
      style: { background: "#bbf7d0", borderRadius: 10 },
      position: { x: 100, y: 400 },
      draggable: false
    },
    {
      id: "6c",
      data: { label: "Informations" },
      style: { background: "#a5f3fc", borderRadius: 10 },
      position: { x: 200, y: 500 },
      draggable: false
    }
  ],
  "6a": [
    {
      id: "CR-6a",
      data: {
        label: "Visualisez le compte rendu de votre CRT",
        url: "CR-MAR.PDF"
      },
      style: { background: "#fef08a", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "6b": [
    {
      id: "équip-6b",
      data: {
        label: "Visualisez l'équipe de votre CRT",
        url: "equip-LB.pdf"
      },
      style: { background: "#fef08a", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
  "6c": [
    {
      id: "info-flyer-6c",
      data: {
        label: "📄 Voir le flyer explicatif",
        url: "Plaquette_CRT_LB_1.pdf"
      },
      style: { background: "#a2d7ff", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    },
    {
      id: "info-ppt-6c",
      data: {
        label: "📄 Voir le Powerpoint explicatif",
        url: "ppt présentation CRT LB.pdf"
      },
      style: { background: "#a2d7ff", borderRadius: 10 },
      position: { x: 0, y: 0 },
      draggable: false
    }
  ],
}





function FlowWrapper() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [expandedNodes, setExpandedNodes] = useState({});
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    const timeout = setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.3, includeHiddenNodes: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleNodeClick = useCallback((event, node) => {
    if (node.data?.url) {
      window.open(node.data.url, '_blank');
      return;
    }

    const children = childrenMap[node.id];
    const isCRT = ['2', '3', '4', '5', '6'].includes(node.id);
    if (!children) return;

    const isExpanded = expandedNodes[node.id];
    setExpandedNodes((prev) => ({ ...prev, [node.id]: !isExpanded }));

    if (isCRT) {
      const newExpanded = {};
      newExpanded[node.id] = true;

      const visibleChildren = Object.keys(expandedNodes).flatMap((id) =>
        childrenMap[id]?.map((c) => c.id) || []
      );

      setNodes((nds) => nds.filter((n) => !visibleChildren.includes(n.id)));
      setEdges((eds) => eds.filter((e) => !visibleChildren.includes(e.target)));
      setExpandedNodes(newExpanded);

      const newNodes = children.map((child, i) => ({
        id: child.id,
        data: {
          ...child.data,
          label: child.data.description
            ? `${child.data.label || ''}\n\n${child.data.description}`
            : child.data.label,
        },
        position: {
          x: node.position.x - 180 + i * 180,
          y: node.position.y + 100,
        },
        style: { ...child.style },
        draggable: false,
      }));

      const newEdges = children.map((child) => ({
        id: `e${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        animated: true,
        style: { stroke: '#888' },
      }));

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);
    } else {
      if (!isExpanded) {
        const newNodes = children.map((child, i) => ({
          id: child.id,
          data: {
            ...child.data,
            label: child.data.description
              ? `${child.data.label || ''}\n\n${child.data.description}`
              : child.data.label,
          },
          position: {
            x: node.position.x - 180 + i * 180,
            y: node.position.y + 100,
          },
          style: { ...child.style },
          draggable: false,
        }));

        const newEdges = children.map((child) => ({
          id: `e${node.id}-${child.id}`,
          source: node.id,
          target: child.id,
          animated: true,
          style: { stroke: '#888' },
        }));

        setNodes((nds) => [...nds, ...newNodes]);
        setEdges((eds) => [...eds, ...newEdges]);
      } else {
        setNodes((nds) => nds.filter((n) => !children.find((c) => c.id === n.id)));
        setEdges((eds) => eds.filter((e) => !children.find((c) => c.id === e.target)));
      }
    }
  }, [expandedNodes, setExpandedNodes, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={handleNodeClick}
      nodesDraggable={false}
      zoomOnScroll={false}
      panOnDrag={false}
      panOnScroll={false}
      zoomOnPinch={false}
      fitView={false}
    >
      <Background variant="dots" gap={12} size={1} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

function CarteMentaleCRT() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <header style={{
        background: '#ffffff',
        padding: '20px 40px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img src="/logo-dac.png" alt="Logo DAC Var Ouest" style={{ height: '60px', marginRight: '20px' }} />
        <h1 style={{ fontSize: 26, fontWeight: 600, color: '#0c4a6e' }}>
          Les missions des CRT du Var Ouest
        </h1>
      </header>

      <div style={{
        backgroundColor: '#0ea5e9',
        color: 'white',
        padding: '20px 40px',
        textAlign: 'center',
      }}>
        Cette carte mentale retrace les missions principales des Centres de Ressources Territoriaux (CRT) du Var Ouest, leurs volets d'action et documents associés.
      </div>

      <ReactFlowProvider>
        <div id="flow-container" style={{
          height: 'calc(100vh - 160px)',
          width: '100%',
          overflow: 'auto',
          position: 'relative'
        }}>
          <div style={{ width: 2000, height: 1500 }}>
            <FlowWrapper />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default CarteMentaleCRT;
