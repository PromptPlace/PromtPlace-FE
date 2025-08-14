import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const el = document.body;
  return createPortal(children, el);
};

export default Portal;