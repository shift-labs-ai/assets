import React from 'react';
import {AbsoluteFill} from 'remotion';

// Shared backdrop: deep Shift navy with a soft brand-pink core glow.
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(circle at 50% 50%, rgba(244,183,188,0.14) 0%, rgba(244,183,188,0.04) 38%, transparent 65%), #121626',
    }}
  >
    {children}
  </AbsoluteFill>
);
