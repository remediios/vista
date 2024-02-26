import logo from '@/public/vista-logo.svg';
import Image from 'next/image';

const DesktopLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt="Desktop Logo"
        className="w-9 h-9 hidden sm:block"
      />
      <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 via-green-400 to-green-300 text-transparent bg-clip-text hidden sm:block">
        VISTA
      </h1>
      <Image
        src={logo}
        alt="Desktop Logo"
        className="w-9 h-9 block sm:hidden"
      />
    </div>
  );
};

export default DesktopLogo;
