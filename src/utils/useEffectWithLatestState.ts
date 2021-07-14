import React from 'react';

export function useEffectWithLatestState<T>(
  effect: (latest: T) => void,
  state: T,
) {
  const ref = React.useRef({ ...state, effect });
  Object.assign(ref.current, { ...state, effect });
  React.useEffect(() => ref.current.effect(ref.current), []);
}
