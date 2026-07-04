import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CenteredCap} from './Keycap';
import {ORIGINAL, byName} from './variants';
import {Stage} from './Stage';

const SATELLITES = byName(
  'ocean',
  'emerald',
  'amber',
  'coral',
  'lavender',
  'mint',
  'sky',
  'peach',
  'rose',
  'midnight',
);

// The variants orbit the mark, spiral inward, and the original pops as they merge.
export const Converge: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width, height} = useVideoConfig();
  const p = frame / durationInFrames;

  const rx = width * 0.36;
  const ry = height * 0.30;

  const centerScale = interpolate(
    p,
    [0, 0.32, 0.52, 0.62, 0.78, 1],
    [0.55, 0.6, 1.14, 1.0, 1.0, 0.55],
    {easing: Easing.bezier(0.3, 0.7, 0.4, 1)},
  );
  const centerOpacity = interpolate(p, [0, 0.32, 0.5, 0.78, 1], [0.35, 0.45, 1, 1, 0.35]);
  const glow = interpolate(p, [0.45, 0.52, 0.62, 0.78, 0.9], [0, 1, 0.4, 0.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Stage>
      {SATELLITES.map((v, i) => {
        const a0 = (i / SATELLITES.length) * Math.PI * 2 - Math.PI / 2;

        // Orbit → spiral in (0..0.54), hidden (0.54..0.76), fly back out (0.76..1).
        const angle =
          a0 +
          (p < 0.76
            ? interpolate(p, [0, 0.3, 0.42, 0.5, 0.54], [0, 0.3, 0.85, 1.5, 1.5], {
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.4, 0, 0.8, 0.6),
              })
            : interpolate(p, [0.76, 1], [-0.6, 0], {easing: Easing.bezier(0.2, 0.6, 0.4, 1)}));
        const radius = interpolate(
          p,
          [0, 0.3, 0.42, 0.5, 0.54, 0.76, 0.86, 1],
          [1, 1, 0.55, 0.12, 0, 0, 0.4, 1],
        );
        const scale = interpolate(
          p,
          [0, 0.42, 0.5, 0.54, 0.76, 0.86, 1],
          [1, 0.7, 0.25, 0.05, 0.05, 0.5, 1],
        );
        const opacity = interpolate(p, [0, 0.5, 0.54, 0.76, 0.86, 1], [1, 0.9, 0, 0, 0.7, 1]);

        return (
          <CenteredCap
            key={v.name}
            variant={v}
            size={width * 0.12}
            x={Math.cos(angle) * rx * radius}
            y={Math.sin(angle) * ry * radius}
            scale={scale}
            rotate={Math.cos(a0 + i) * 6}
            opacity={opacity}
          />
        );
      })}
      <CenteredCap
        variant={ORIGINAL}
        size={width * 0.28}
        scale={centerScale}
        opacity={centerOpacity}
        glow={glow}
      />
    </Stage>
  );
};
