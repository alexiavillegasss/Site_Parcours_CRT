import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import '../App.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'EHPAD'},
    position: { x: 850, y: 50 },
    style: { background: '#fde047', borderRadius: 10, padding: 10, fontWeight: 'bold' },
  },
  {
    id: '2',
    data: { label: "Qu est ce qu'un EHPAD ?" },
    position: { x: 550, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
  {
    id: '3',
    data: { label: 'Trouver un EHPAD dans votre secteur' },
    position: { x: 850, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
  {
    id: '4',
    data: { label: 'Découvrez les dispositifs portés par les EHPAD' },
    position: { x: 1150, y: 200 },
    style: { background: '#fca5a5', borderRadius: 10 },
    parent: '1'
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#888' }, draggable: false },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#888' }, draggable: false },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#888' }, draggable: false },
  ];

const childrenMap = {
    '2': [
      {
        id: '2a',
        data: {
          label: 'Télechargé le flyer explicatif'
        },
        style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
        position: { x: 0, y: 400 },
        draggable: false
      },
      {
        id: '2b',
        data: {
          label: 'Voire la capsule vidéo explicative'
        },
        style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
        position: { x: 100, y: 400 },
        draggable: false
      },
    ],

    '3': [
      {
        id: '3a',
        data: {
          label: 'Voir la carte des EHPAD du territoire'
        },
        style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
        position: { x: 0, y: 0 },
        draggable: false
      },
      {
        id: '3b',
        data: {
          label: "Trouver l'EHPAD la plus proche de chez moi"
        },
        style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
        position: { x: 0, y: 0 },
        draggable: false
      },
    ],

    '4': [
      {
  id: '4a',
  data: {
    label: 'CRT : Centre de Ressource Territoriale',
    url: '/dispositifs/crt' // 🔗 Redirige vers la carte mentale CRT
  },
  style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
  position: { x: 0, y: 0 },
  draggable: false,
},

      {
        id: '4b',
        data: {
          label: 'Autre Dispositif'
        },
        style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
        position: { x: 0, y: 0 },
        draggable: false
      },
      {
        id: '4c',
        data: {
          label: 'Autre Dispositif'
        },
        style: { background: '#bbf7d0', borderRadius: 10, whiteSpace: 'pre-line' },
        position: { x: 0, y: 0 },
        draggable: false
      }
    ],
  };

  function FlowWrapper() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [expandedNodes, setExpandedNodes] = useState({});

   const reactFlowInstance = useReactFlow();

useEffect(() => {
  if (!reactFlowInstance) return;

  const timeout = setTimeout(() => {
    reactFlowInstance.fitView({
      padding: 0.3,
      includeHiddenNodes: true,
    });
  }, 100);

  return () => clearTimeout(timeout);
}, [reactFlowInstance]);



  const handleNodeClick = useCallback(
  (event, node) => {
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
      // Fermer tous les autres CRT déjà ouverts
      const newExpanded = {};
      newExpanded[node.id] = true;

      const visibleChildren = Object.keys(expandedNodes).flatMap((id) =>
        childrenMap[id]?.map((c) => c.id) || []
      );

      setNodes((nds) => nds.filter((n) => !visibleChildren.includes(n.id)));
      setEdges((eds) => eds.filter((e) => !visibleChildren.includes(e.target)));
      setExpandedNodes(newExpanded);

      // Ajouter les enfants du CRT sélectionné
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
      // Gérer les clics sur Volet 1, Volet 2, Informations...
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
  },
  [expandedNodes, setExpandedNodes, setNodes, setEdges]
);


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
      fitView={false}  // désactivé pour éviter qu'il recalcule la vue
    >

      <Background variant="dots" gap={12} size={1} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <header
        style={{
          background: '#ffffff',
          padding: '20px 40px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src="/logo-dac.png" alt="Logo DAC Var Ouest" style={{ height: '60px', marginRight: '20px' }} />
        <h1 style={{ fontSize: 26, fontWeight: 600, color: '#0c4a6e' }}>Les missions des EHPAD du Var Ouest</h1>
      </header>

      <div
        style={{
          backgroundColor: '#0ea5e9',
          color: 'white',
          padding: '20px 40px',
          textAlign: 'center',
        }}
      >
        Cette carte mentale retrace les missions principales des EHPAD (Établissement d'Hébergement pour Personnes Âgées Dépendantes) du Var Ouest, leurs volets d'action et documents associés.
      </div>

      <ReactFlowProvider>
        <div
          id="flow-container"
          style={{
            height: 'calc(100vh - 160px)', // ajuste selon la hauteur de ton header + bandeau bleu
            width: '100%',
            overflow: 'auto',            // scroll si besoin
            position: 'relative'
          }}
        >
          <div
            style={{
              width: 2000,              // largeur étendue pour permettre le scroll horizontal
              height: 1500              // hauteur étendue pour permettre le scroll vertical
            }}
          >
            <FlowWrapper />
          </div>
        </div>
      </ReactFlowProvider>

    </div>
  );
}

export default App;