import { useTheme } from '@/context/ThemeContext';

export default function StarBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at bottom, #dbeafe 0%, #e0f2fe 50%, #f0f9ff 100%)'
            : 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        }}
      />
      {!isLight && (
        <>
          <div id="stars" className="absolute inset-0" />
          <div id="stars2" className="absolute inset-0" />
          <div id="stars3" className="absolute inset-0" />
        </>
      )}
      {isLight && (
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle, #93c5fd 1px, transparent 1px), radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
            backgroundSize: '120px 120px, 200px 200px',
            backgroundPosition: '0 0, 60px 60px',
          }}
        />
      )}
    </div>
  );
}
