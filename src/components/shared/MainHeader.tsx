import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

interface MainHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
}

export default function MainHeader({
  sidebarOpen,
  setSidebarOpen,
}: MainHeaderProps) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const getUserDisplayName = () => {
    if (isLoading) return "Loading...";
    if (user?.username) return user.username;
    return "User";
  };

  const getUserInfo = () => {
    if (isLoading) return "Loading...";
    if (user?.major) return user.major;
    if (user?.email) return user.email;
    return "Member";
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    // Menyesuaikan material agar senada dengan efek glassmorphic pada komponen utama
    <header className="fixed top-0 z-50 w-full border-b border-white/80 bg-white/60 shadow-sm shadow-indigo-100/10 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 rounded-md p-2 text-gray-500 hover:bg-indigo-50/50 focus:outline-none dark:hover:bg-slate-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </button>

            <Link href="/dashboard" className="flex items-center gap-2">
              <h1 className="font-heading relative z-50 text-xl font-extrabold">
                <span className="text-indigo-600">CarPath</span>
                <span className="text-[#0f9488]">Mu</span>
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 font-normal text-slate-700 hover:bg-white/50 dark:text-slate-300"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                    <User className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-normal">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {getUserInfo()}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 dark:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
