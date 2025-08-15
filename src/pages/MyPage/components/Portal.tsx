import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const el = document.getElementById('portal-root');
  return el ? createPortal(children, el) : null;
};

export default Portal;
