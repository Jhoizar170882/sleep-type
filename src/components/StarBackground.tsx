import { memo } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default memo(function StarBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at top, #f0f4ff 0%, #e8eeff 30%, #f5f3ff 60%, #fdf4ff 100%)'
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
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #818cf8 1px, transparent 1px), radial-gradient(circle, #c084fc 0.8px, transparent 0.8px)',
            backgroundSize: '80px 80px, 130px 130px',
            backgroundPosition: '0 0, 40px 40px',
          }}
        />
      )}
    </div>
  );
});
