'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ to, children, className, activeClassName = '', ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  
  // Handle className as function or string
  let finalClassName = '';
  if (typeof className === 'function') {
    finalClassName = className({ isActive });
  } else {
    finalClassName = isActive 
      ? `${className || ''} ${activeClassName || ''}`.trim()
      : (className || '');
  }
  
  return (
    <Link href={to} className={finalClassName || undefined} {...props}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  );
};

export default NavLink;