import React from 'react';
import {Composition} from 'remotion';
import {Converge} from './Converge';
import {Shuffle} from './Shuffle';
import {Absorb} from './Absorb';

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Converge"
        component={Converge}
        durationInFrames={192}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="Shuffle"
        component={Shuffle}
        durationInFrames={204}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="Absorb"
        component={Absorb}
        durationInFrames={228}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
