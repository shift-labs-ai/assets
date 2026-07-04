import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CenteredCap} from './Keycap';
import {ORIGINAL, byName} from './variants';
import {Stage} from './Stage';

// Fan of cards collapses into one stack — the original lands on top with a bounce.
const HAND = [...byName('ocean', 'emerald', 'amber', 'lavender', 'coral', 'sky'), ORIGINAL];

const snap = Easing.bezier(0.35, 0, 0.15, 1);

export const Shuffle: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();
  const p = frame / durationInFrames;

  const N = HAND.length;
  const mid = (N - 1) / 2;

  return (
    <Stage>
      {HAND.map((v, i) => {
        const d = i - mid;
        const fan = {x: d * width * 0.135, y: Math.abs(d) * 24 + 30, rot: d * 11};
        const stack = {x: 0, y: -i * 3, rot: 0};
        const cIn = 0.14 + i * 0.045; // collapse start — original (last) lands on top, last
        const cOut = 0.72 + (N - 1 - i) * 0.028;

        const between = (a: number, b: number, from: number, to: number, ease = snap) =>
          interpolate(p, [a, b], [from, to], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: ease,
          });

        let x: number, y: number, rot: number;
        if (p < cIn + 0.1) {
          // fan → stack
          x = between(cIn, cIn + 0.1, fan.x, stack.x);
          y = between(cIn, cIn + 0.1, fan.y, stack.y);
          rot = between(cIn, cIn + 0.1, fan.rot, stack.rot);
        } else if (p < 0.65) {
          // stacked, with a bounce at 0.56–0.65
          const bounce =
            between(0.56, 0.6, 0, -18, Easing.bezier(0.3, 1.6, 0.5, 1)) +
            between(0.6, 0.65, 0, 18, Easing.bezier(0.3, 1.6, 0.5, 1));
          x = stack.x;
          y = stack.y + bounce;
          rot = stack.rot;
        } else {
          // stack → fan
          x = between(cOut, cOut + 0.1, stack.x, fan.x);
          y = between(cOut, cOut + 0.1, stack.y, fan.y);
          rot = between(cOut, cOut + 0.1, stack.rot, fan.rot);
        }

        return (
          <CenteredCap key={v.name} variant={v} size={width * 0.2} x={x} y={y} rotate={rot} />
        );
      })}
    </Stage>
  );
};
