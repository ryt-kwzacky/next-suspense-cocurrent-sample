import { FC, useState, useEffect, Suspense, lazy } from 'react';

const GuardLazyComponentToSSR: FC = () => {
  const delay = (time) => (result) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(result), time);
    });
  const Test = lazy(() => import('./test').then(delay(1000)));

  const [isFront, setIsFront] = useState(false);

  useEffect(() => {
    process.nextTick(() => {
      if (globalThis.window ?? false) {
        setIsFront(true);
      }
    });
  }, []);

  if (!isFront) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Test />
    </Suspense>
  );
};

export default GuardLazyComponentToSSR;
