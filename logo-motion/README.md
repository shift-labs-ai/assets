# Shift Logo Motion

Looping Remotion animations that gather the keycap color variants (from
`../avatars/generate.sh`) into the original pink mark. Three compositions,
all seamless loops at 1080×1080 / 30fps:

- **Converge** (6.4s) — the variants orbit like satellites, spiral inward,
  and the original cap pops as they merge.
- **Shuffle** (6.8s) — the caps fan out like a hand of cards, collapse into
  one stack with the original landing on top, bounce, and fan back out.
- **Absorb** (7.6s) — the original holds the center while variants fly in
  one by one; each impact flashes its color through the face before it
  settles back to pink.

## Develop

```bash
npm install
npm run dev          # Remotion Studio
```

## Render

```bash
npx remotion render Converge out/converge.mp4
npx remotion render Shuffle out/shuffle.mp4
npx remotion render Absorb out/absorb.mp4

# transparent background (drop the Stage backdrop first or make it a prop)
npx remotion render Converge out/converge.mov --codec=prores --prores-profile=4444
```

Colors live in `src/variants.ts`; the mark itself is `src/Keycap.tsx`
(same SVG paths as the production avatars).
