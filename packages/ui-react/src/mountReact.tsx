import React, { JSX } from 'react';
import { createRoot, Root } from 'react-dom/client';

export function mountReact<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  el: HTMLElement,
  props?: P
): () => void {
  const root: Root = createRoot(el);

  root.render(<Component {...(props as P)} />);

  return () => {
    root.unmount();
  };
}
