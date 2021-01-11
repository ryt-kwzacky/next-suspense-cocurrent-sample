import { FC, useState, useEffect, useMemo } from 'react';
import GuardLazyComponentToSSR from './guardLazyComponentToSSR';

export type User = {
  id: number;
  name: string;
};

const user1: User = {
  id: 1,
  name: 'user1',
};
const user2: User = {
  id: 2,
  name: 'user2',
};

const App: FC = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const setToSpecificNumber = (n: number) => setCount(n);
  const reset = () => setCount(0);
  const checkMultiple = (n: number): boolean => n !== 0 && n % 3 === 0;
  const multiple = useMemo(() => checkMultiple(count), [count]);

  const [users, setUsers] = useState<User[]>([]);
  const setUser = () => setUsers([user1, user2]);

  // 再レンダリングの度実行される
  useEffect(() => {
    console.log('test1!');
  });

  // 空配列を渡すと初回レンダリングの時のみ実行される
  useEffect(() => {
    console.log('test2!');
  }, []);

  // countに差分があった時実行される
  // この第二引数のことを依存配列と言う
  useEffect(() => {
    console.log('test3!');
  }, [count]);

  // ifでさらにタイミング指定できる
  useEffect(() => {
    if (multiple) {
      console.log('test4!');
    }
  }, [multiple]);

  return (
    <>
      <h1>Hello Suspense</h1>
      <GuardLazyComponentToSSR />
      <p>count: {count}</p>
      <button type="button" onClick={increment}>
        increment
      </button>
      <button type="button" onClick={() => setToSpecificNumber(4)}>
        setToSpecificNumber
      </button>
      <button type="button" onClick={reset}>
        reset
      </button>
      <p>users:</p>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
      <button type="button" onClick={setUser}>
        setUser
      </button>
    </>
  );
};

export default App;
