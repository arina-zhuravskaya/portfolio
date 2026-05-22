// tweaks.jsx — Arina's portfolio
// Three knobs: type pair, accent color, density.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typePair": "editorial",
  "accent": "#B8451F",
  "density": "regular"
}/*EDITMODE-END*/;

// Type pairings — each swaps serif + sans + mono together.
const TYPE_PAIRS = {
  editorial: {
    label: "Editorial",
    sub: "Instrument Serif · Geist · Geist Mono",
    serif: '"Instrument Serif", "Times New Roman", Georgia, serif',
    sans: '"Geist", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
  },
  studio: {
    label: "Studio",
    sub: "Fraunces · DM Sans · JetBrains Mono",
    serif: '"Fraunces", "Times New Roman", Georgia, serif',
    sans: '"DM Sans", -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  technical: {
    label: "Technical",
    sub: "Geist · Geist · Geist Mono",
    serif: '"Geist", -apple-system, sans-serif',
    sans: '"Geist", -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
  },
};

// Accent presets — same chroma, varying hue. The current burnt-orange anchors it.
const ACCENTS = [
  "#B8451F", // burnt orange (default)
  "#1F4E8C", // ink blue
  "#1F6B4A", // pine
  "#7A3F8C", // plum
  "#A8B81F", // olive citron
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks as CSS variables + data attributes.
  React.useEffect(() => {
    const pair = TYPE_PAIRS[t.typePair] || TYPE_PAIRS.editorial;
    const root = document.documentElement;
    root.style.setProperty('--serif', pair.serif);
    root.style.setProperty('--sans', pair.sans);
    root.style.setProperty('--mono', pair.mono);
    root.style.setProperty('--accent', t.accent);
    // derive a soft accent for backgrounds
    root.style.setProperty('--accent-soft', t.accent + '1F');
    document.body.dataset.density = t.density;
  }, [t.typePair, t.accent, t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Type pairing" />
      <TweakRadio
        label="Pair"
        value={t.typePair}
        options={[
          { label: "Editorial", value: "editorial" },
          { label: "Studio", value: "studio" },
          { label: "Technical", value: "technical" },
        ]}
        onChange={(v) => setTweak('typePair', v)}
      />
      <div style={{ fontSize: 10, color: 'rgba(41,38,27,.5)', letterSpacing: '.04em', marginTop: -4 }}>
        {(TYPE_PAIRS[t.typePair] || TYPE_PAIRS.editorial).sub}
      </div>

      <TweakSection label="Accent" />
      <TweakColor
        label="Editorial colour"
        value={t.accent}
        options={ACCENTS}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Density" />
      <TweakRadio
        label="Spacing"
        value={t.density}
        options={[
          { label: "Compact", value: "compact" },
          { label: "Regular", value: "regular" },
          { label: "Comfy", value: "comfy" },
        ]}
        onChange={(v) => setTweak('density', v)}
      />
    </TweaksPanel>
  );
}

// Mount
const __tweaksRoot = document.createElement('div');
document.body.appendChild(__tweaksRoot);
ReactDOM.createRoot(__tweaksRoot).render(<App />);
