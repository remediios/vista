import Link from 'next/link';
import DesktopLogo from './DesktopLogo';
import UserNav from './UserNav';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <DesktopLogo />
        </Link>

        <SearchBar />

        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
