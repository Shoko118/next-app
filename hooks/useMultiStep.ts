import { useState } from "react";

export function useMultistep(steps: React.ReactNode[]) {
  const [componentIndex, setComponentIndex] = useState<number>(0);

  const lastStep = steps.length - 1;

  function next() {
    if (componentIndex >= lastStep) return componentIndex;

    setComponentIndex(componentIndex + 1);
  }

  function back() {
    if (componentIndex <= 0) return componentIndex;

    setComponentIndex(componentIndex - 1);
  }

  function goTo(indexNumber: number) {
    setComponentIndex(indexNumber);
  }

  return {
    componentIndex,
    step: steps[componentIndex],
    goTo,
    next,
    back,
    steps,
  };
}
