'use client';

import { signOut, useSession } from 'next-auth/react';

function One() {
  const { data } = useSession();

  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
      <button onClick={() => signOut()}>sign out</button>
    </div>
  );
}

export default One;
