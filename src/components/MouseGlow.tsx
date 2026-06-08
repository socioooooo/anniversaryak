import { useMouseGlow } from '../hooks/useMouseGlow';

export default function MouseGlow() {
  const pos = useMouseGlow();

  return (
    <div
      className="fixed pointer-events-none z-[2] w-[600px] h-[600px] rounded-full opacity-[0.03]"
      style={{
        background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)',
        transform: `translate(${pos.x - 300}px, ${pos.y - 300}px)`,
      }}
    />
  );
}
