import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CenteredCap} from './Keycap';
import {ORIGINAL, byName} from './variants';
import {Stage} from './Stage';

// Colored caps fly in one by one; each impact flashes its color through the
// center cap before it settles back to the original pink.
const COMETS = byName('ocean', 'amber', 'emerald', 'coral', 'lavender', 'sky');

const clamped = (
  p: number,
  input: number[],
  output: number[],
  easing?: (t: number) => number,
) =>
  interpolate(p, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const Absorb: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const p = frame / durationInFrames;

  const R = width * 0.42;
  const N = COMETS.length;
  const capSize = width * 0.27;

  const impacts = COMETS.map((_, i) => 0.06 + i * 0.13 + 0.075);

  // Center squash: sum of small spikes around each impact, plus a settle glow.
  let squash = 0;
  for (const t of impacts) {
    squash += clamped(p, [t - 0.015, t, t + 0.03], [0, 1, 0], Easing.bezier(0.2, 0.8, 0.4, 1));
  }
  squash = Math.min(squash, 1);
  const settle = clamped(p, [0.9, 0.94, 1], [0, 1, 0]);

  return (
    <Stage>
      <CenteredCap
        variant={ORIGINAL}
        size={capSize}
        scale={1 + squash * 0.09 + settle * 0.06}
        scaleY={1 - squash * 0.06 + settle * 0.06}
        glow={settle}
      />
      {COMETS.map((v, i) => {
        const s = 0.06 + i * 0.13;
        const ang = (i / N) * Math.PI * 2 + 0.7;
        const fx = Math.cos(ang) * R;
        const fy = Math.sin(ang) * R * 0.62;

        const flight = clamped(p, [s + 0.018, s + 0.075], [0, 1], Easing.bezier(0.5, 0, 0.9, 0.6));
        const opacity =
          clamped(p, [s, s + 0.018], [0, 1]) * clamped(p, [s + 0.075, s + 0.09], [1, 0]);
        const scale = clamped(p, [s + 0.018, s + 0.075, s + 0.09], [0.85, 0.28, 0.05]);

        // Color flash on the center cap at impact.
        const flash =
          clamped(p, [s + 0.06, s + 0.078], [0, 0.95]) *
          clamped(p, [s + 0.095, s + 0.16], [1, 0]);

        return (
          <React.Fragment key={v.name}>
            <CenteredCap
              variant={v}
              size={width * 0.105}
              x={fx * (1 - flight)}
              y={fy * (1 - flight)}
              scale={scale}
              rotate={(fx > 0 ? -14 : 14) * (1 - flight)}
              opacity={opacity}
            />
            <CenteredCap
              variant={v}
              size={capSize}
              scale={1 + squash * 0.09}
              scaleY={1 - squash * 0.06}
              opacity={flash}
            />
          </React.Fragment>
        );
      })}
    </Stage>
  );
};
