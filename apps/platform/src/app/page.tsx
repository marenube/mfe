'use client';

import Counter from '@repo/ui-react/Counter';
import { counterStore } from '@repo/store';

export default function PlatformHomePage() {
  return <Counter counter={counterStore} />;
}
