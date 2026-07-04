import React from 'react';
import type {Variant} from './variants';

// The Shift keycap mark — same paths as avatars/generate.sh.
export const Keycap: React.FC<{
  variant: Variant;
  size: number;
  style?: React.CSSProperties;
}> = ({variant, size, style}) => (
  <svg
    viewBox="14 14 176 158"
    width={size}
    height={(size * 158) / 176}
    style={{display: 'block', ...style}}
  >
    <path
      d="m165.8 27.89c-3.52-4.67-7.19-6.18-13.6-6.18h-113.8c-9.45 0-16.59 8.52-16.59 17.22v110.2c0 10.5 6.43 18.04 16.91 18.04h111.1c10.48 0 16.96-7.46 16.96-17.13v-111.1c0-4.45 0.24-8.75-0.93-11.04z"
      fill={variant.shadow}
    />
    <path
      d="m150.8 21.71h-112.1c-9.35 0-16.47 8.46-16.47 17.09v96.34c0 10.97 7.2 18.05 16.69 18.05h109.9c10.05 0 16.6-7.53 16.6-17.69v-96.7c0-8.82-6.51-17.09-14.59-17.09z"
      fill={variant.face}
    />
    <path
      d="M64.38 97.93 94.38 62.94 124.38 97.93H108.38V117.42H80.38V97.93Z"
      fill={variant.arrow}
      stroke={variant.arrow}
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      strokeWidth={3}
    />
  </svg>
);

// Positions a keycap by its center at stage center + (x, y).
export const CenteredCap: React.FC<{
  variant: Variant;
  size: number;
  x?: number;
  y?: number;
  scale?: number;
  scaleY?: number;
  rotate?: number;
  opacity?: number;
  glow?: number; // 0..1 brand-pink glow strength
}> = ({variant, size, x = 0, y = 0, scale = 1, scaleY, rotate = 0, opacity = 1, glow = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      opacity,
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale}, ${scaleY ?? scale})`,
      filter: glow > 0 ? `drop-shadow(0 10px ${40 * glow}px rgba(244,183,188,${0.65 * glow}))` : undefined,
    }}
  >
    <Keycap variant={variant} size={size} />
  </div>
);
