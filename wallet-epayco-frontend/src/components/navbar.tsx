import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { useWallet } from "../context/walletContext";

import { LogoutIcon } from "./icons";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const location = useLocation();
  const { logout } = useWallet();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img alt="Logo" height={150} src="/logo_epayco.png" width={150} />
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-green-600 data-[active=true]:font-medium",
                  location.pathname === item.href
                    ? "text-green-600 font-bold text-lg"
                    : "",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2" />
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-green-600 text-xl font-bold text-sm bg-default-100 hover:bg-green-500 hover:text-white"
            startContent={
              <LogoutIcon />
            }
            variant="flat"
            onPress={handleLogout}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <Button
              className="text-sm font-normal text-default-600 bg-default-100 hover:bg-green-500 hover:text-white"
              startContent={
                <LogoutIcon className="text-green-600 text-xl font-bold" />
              }
              variant="flat"
              onPress={handleLogout}
            >
              Logout
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
