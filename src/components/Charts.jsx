const W = 300;

function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

export function WaveChart({ data, height = 84, markerIndex }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 10;
  const usable = height - pad * 2;
  const points = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    pad + usable - ((v - min) / range) * usable,
  ]);
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${W} ${height} L 0 ${height} Z`;
  const mIdx = markerIndex ?? Math.floor(data.length / 2);
  const mx = points[mIdx]?.[0] ?? 0;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7f542" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d7f542" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#waveFill)" />
      <path d={linePath} fill="none" stroke="#b8db1f" strokeWidth="2" />
      <line x1={mx} y1="0" x2={mx} y2={height} stroke="#14140f" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx={mx} cy={points[mIdx][1]} r="4" fill="#14140f" />
    </svg>
  );
}

export function SpikeChart({ data, height = 84, markerIndex }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 10;
  const usable = height - pad * 2;
  const points = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    pad + usable - ((v - min) / range) * usable,
  ]);
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const mIdx = markerIndex ?? Math.floor(data.length / 2);
  const mx = points[mIdx]?.[0] ?? 0;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <path d={linePath} fill="none" stroke="#14140f" strokeWidth="1.6" strokeLinejoin="round" />
      <line x1={mx} y1="0" x2={mx} y2={height} stroke="#b8db1f" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}
