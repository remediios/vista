import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';

const UserNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <>
          <DropdownMenuItem>Register</DropdownMenuItem>
          <DropdownMenuItem>Login</DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
