import { Suspense, useState, useEffect } from 'react';

let membersCache = null;

const membersResource = (orgCode: string) => {
  if (membersCache) return membersCache;

  const promise = fetch(`https://api.github.com/orgs/${orgCode}/members`)
    .then((response) => response.json())
    .then((members) => {
      setTimeout(() => {
        membersCache = members;
      }, 2000);
    });

  throw promise;
};

const MemberList = ({ orgCode }) => {
  const members = membersResource(orgCode);

  return (
    <ul>
      {members.map((member) => (
        <li key={member.id}>{member.login}</li>
      ))}
    </ul>
  );
};

const List = () => {
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
      <MemberList orgCode="facebook" />
    </Suspense>
  );
};

export default List;
