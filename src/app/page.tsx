import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  const routes = ['signup', 'mypage', 'community', 'subscription'];
  return (
    <div>
      home
      {routes.map((route) => (
        <Button key={route}>
          <Link href={`/${route}`}>{route}</Link>
        </Button>
      ))}
    </div>
  );
}
