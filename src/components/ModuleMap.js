import React, { useState, useEffect } from 'react';
import '../css/schema.css';

const GROUP_COLORS = {
  core: { fill: '#e0f2fe', stroke: '#0ea5e9', text: '#0c4a6e' },
  hazards: { fill: '#dbeafe', stroke: '#3b82f6', text: '#1e3a5f' },
  response: { fill: '#d1fae5', stroke: '#10b981', text: '#064e3b' },
  risk: { fill: '#ffedd5', stroke: '#f97316', text: '#7c2d12' },
  system: { fill: '#f3f4f6', stroke: '#9ca3af', text: '#374151' },
};

const GROUP_COLORS_DARK = {
  core: { fill: '#0c4a6e', stroke: '#38bdf8', text: '#bae6fd' },
  hazards: { fill: '#1e3a5f', stroke: '#60a5fa', text: '#bfdbfe' },
  response: { fill: '#064e3b', stroke: '#34d399', text: '#a7f3d0' },
  risk: { fill: '#7c2d12', stroke: '#fb923c', text: '#fed7aa' },
  system: { fill: '#1f2937', stroke: '#6b7280', text: '#d1d5db' },
};

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function StatusIndicator({ status, x, y }) {
  if (status === 'implemented') {
    return <circle cx={x} cy={y} r={4} fill="currentColor" />;
  }
  if (status === 'partial') {
    return (
      <>
        <circle cx={x} cy={y} r={4} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <path d={`M ${x} ${y - 4} A 4 4 0 0 1 ${x} ${y + 4} Z`} fill="currentColor" />
      </>
    );
  }
  return <circle cx={x} cy={y} r={4} fill="none" stroke="currentColor" strokeWidth={1.5} />;
}

function ModuleBox({ module, x, y, width = 130, height = 70, colors }) {
  return (
    <a href={module.href} className="module-map__box" style={{ textDecoration: 'none' }}>
      <g transform={`translate(${x}, ${y})`}>
        <rect width={width} height={height} rx={6} ry={6} fill={colors.fill} stroke={colors.stroke} strokeWidth={1.5} />
        <text x={width / 2} y={18} textAnchor="middle" fontSize={12} fontWeight="bold" fill={colors.text} fontFamily="var(--ifm-font-family-base)">
          {module.name}
        </text>
        <text x={width / 2} y={33} textAnchor="middle" fontSize={9} fill={colors.text} fontFamily="var(--ifm-font-family-base)" opacity={0.8}>
          {module.subtitle}
        </text>
        <text x={width / 2} y={50} textAnchor="middle" fontSize={10} fill={colors.text} fontFamily="var(--ifm-font-family-base)" opacity={0.6}>
          {module.tables} {module.tables === 1 ? 'table' : 'tables'}
        </text>
        <StatusIndicator status={module.status} x={width / 2} y={height - 10} />
      </g>
    </a>
  );
}

export default function ModuleMap({ modules, relationships, height }) {
  const isDark = useIsDarkMode();
  const palette = isDark ? GROUP_COLORS_DARK : GROUP_COLORS;

  const viewBoxWidth = 820;
  const viewBoxHeight = height || 420;

  const getModuleById = (id) => modules.find((m) => m.id === id);
  const getColors = (group) => palette[group] || palette.system;

  const coreModules = modules.filter((m) => m.group === 'core');
  const hazardModules = modules.filter((m) => m.group === 'hazards');
  const responseModules = modules.filter((m) => m.group === 'response');
  const riskModules = modules.filter((m) => m.group === 'risk');
  const systemModules = modules.filter((m) => m.group === 'system');

  // Layout
  const positions = {};
  let xOffset;

  xOffset = 20;
  coreModules.forEach((m, i) => { positions[m.id] = { x: xOffset + i * 150, y: 20 }; });

  xOffset = 320;
  hazardModules.forEach((m, i) => { positions[m.id] = { x: xOffset + i * 150, y: 20 }; });

  const pfmBoxWidth = 100;
  const pfmGap = 10;
  const responseGroupX = 20;
  const responseGroupY = 130;
  responseModules.forEach((m, i) => { positions[m.id] = { x: responseGroupX + 15 + i * (pfmBoxWidth + pfmGap), y: responseGroupY + 30 }; });

  xOffset = 20;
  riskModules.forEach((m, i) => { positions[m.id] = { x: xOffset + i * 150, y: 270 }; });

  xOffset = 20;
  systemModules.forEach((m, i) => { positions[m.id] = { x: xOffset + i * 150, y: 340 }; });

  return (
    <div className="module-map">
      <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--font-color)' }}>
        <defs>
          <marker id="arrowhead" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--ifm-color-primary)" />
          </marker>
        </defs>

        {/* Response group background */}
        {responseModules.length > 0 && (
          <>
            <rect
              x={responseGroupX} y={responseGroupY}
              width={responseModules.length * (pfmBoxWidth + pfmGap) + 20} height={85}
              rx={8} ry={8} fill="none"
              stroke={getColors('response').stroke} strokeWidth={1} strokeDasharray="4 2" opacity={0.5}
            />
            <text x={responseGroupX + 10} y={responseGroupY + 14} fontSize={10} fontWeight="bold" fill={getColors('response').text} fontFamily="var(--ifm-font-family-base)" opacity={0.7}>
              Failure Mode Response Modules
            </text>
          </>
        )}

        {/* System group background */}
        {systemModules.length > 0 && (
          <>
            <rect
              x={10} y={330}
              width={systemModules.length * 150 + 20} height={80}
              rx={8} ry={8} fill="none"
              stroke={getColors('system').stroke} strokeWidth={1} strokeDasharray="4 2" opacity={0.5}
            />
            <text x={20} y={344} fontSize={10} fontWeight="bold" fill={getColors('system').text} fontFamily="var(--ifm-font-family-base)" opacity={0.7}>
              System &amp; Administration
            </text>
          </>
        )}

        {/* Relationship lines */}
        {relationships &&
          relationships.map((rel, i) => {
            const fromPos = positions[rel.from];
            const toPos = positions[rel.to];
            if (!fromPos || !toPos) return null;

            const fromModule = getModuleById(rel.from);
            const toModule = getModuleById(rel.to);
            const fromWidth = responseModules.includes(fromModule) ? pfmBoxWidth : 130;
            const toWidth = responseModules.includes(toModule) ? pfmBoxWidth : 130;

            const x1 = fromPos.x + fromWidth / 2;
            const y1 = fromPos.y + 70;
            const x2 = toPos.x + toWidth / 2;
            const y2 = toPos.y;

            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ifm-color-primary)" strokeWidth={1.5} markerEnd="url(#arrowhead)" opacity={0.4} />
                {rel.label && (
                  <text x={(x1 + x2) / 2 + 5} y={(y1 + y2) / 2} fontSize={9} fill="var(--font-color)" opacity={0.5} fontFamily="var(--ifm-font-family-base)">
                    {rel.label}
                  </text>
                )}
              </g>
            );
          })}

        {/* Module boxes */}
        {coreModules.map((m) => <ModuleBox key={m.id} module={m} x={positions[m.id].x} y={positions[m.id].y} colors={getColors(m.group)} />)}
        {hazardModules.map((m) => <ModuleBox key={m.id} module={m} x={positions[m.id].x} y={positions[m.id].y} colors={getColors(m.group)} />)}
        {responseModules.map((m) => <ModuleBox key={m.id} module={m} x={positions[m.id].x} y={positions[m.id].y} width={pfmBoxWidth} height={55} colors={getColors(m.group)} />)}
        {riskModules.map((m) => <ModuleBox key={m.id} module={m} x={positions[m.id].x} y={positions[m.id].y} colors={getColors(m.group)} />)}
        {systemModules.map((m) => <ModuleBox key={m.id} module={m} x={positions[m.id].x} y={positions[m.id].y} colors={getColors(m.group)} />)}

        {/* Legend */}
        <g transform={`translate(${viewBoxWidth - 180}, ${viewBoxHeight - 60})`}>
          <text x={0} y={0} fontSize={10} fontWeight="bold" fill="var(--font-color)" fontFamily="var(--ifm-font-family-base)">Status Legend</text>
          <circle cx={8} cy={14} r={4} fill="var(--font-color)" />
          <text x={18} y={18} fontSize={9} fill="var(--font-color)" fontFamily="var(--ifm-font-family-base)">Implemented</text>
          <circle cx={8} cy={30} r={4} fill="none" stroke="var(--font-color)" strokeWidth={1.5} />
          <path d="M 8 26 A 4 4 0 0 1 8 34 Z" fill="var(--font-color)" />
          <text x={18} y={34} fontSize={9} fill="var(--font-color)" fontFamily="var(--ifm-font-family-base)">Partial</text>
          <circle cx={8} cy={46} r={4} fill="none" stroke="var(--font-color)" strokeWidth={1.5} />
          <text x={18} y={50} fontSize={9} fill="var(--font-color)" fontFamily="var(--ifm-font-family-base)">Planned</text>
        </g>
      </svg>
    </div>
  );
}
