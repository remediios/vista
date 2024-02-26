import Link from 'next/link';
import DesktopLogo from './DesktopLogo';

const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <DesktopLogo />
        </Link>
        <div className="rounded-full border px-5 py-2">
          <h1>Hello from the search</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
