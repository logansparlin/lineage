'use client';

import { FC } from "react";
import { Root as SliderRoot, Range, Track, Thumb } from '@radix-ui/react-slider';

interface ProgressBarProps {
  progress: number;
  setProgress: (progress: number) => void;
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { progress, setProgress } = props;

  const handleProgressChange = (value: number[]) => {
    console.log('setting progress', value)
    setProgress(value[0]);
  }

  return (
    <div
      className="flex-1 overflow-hidden"
    >
      <SliderRoot
        orientation="horizontal"
        className="w-full h-auto flex select-none items-center justify-center disable-cursor cursor-pointer py-12"
        defaultValue={[]}
        min={0}
        max={100}
        value={[progress]}
        step={0.1}
        onValueChange={handleProgressChange}
      >
        <Track className="relative h-4 w-full bg-white/30 rounded-full overflow-hidden disable-cursor cursor-pointer">
          <Range className="absolute h-full rounded-full bg-step-200 disable-cursor cursor-pointer" />
        </Track>
        <Thumb
          className="block w-10 h-10 bg-transparent disable-cursor cursor-pointer outline-none border-none focus:outline-none"
          aria-label="Volume"
        />
      </SliderRoot>
    </div>
  )
}