export default function StarBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        }}
      />
      <div id="stars" className="absolute inset-0" />
      <div id="stars2" className="absolute inset-0" />
      <div id="stars3" className="absolute inset-0" />
    </div>
  );
}
