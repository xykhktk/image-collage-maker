import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "@/src/components/theme-switch";
import TemplateButton from "@/src/components/Button/templateButton"
import SetConvanSizeButton from "@/src/components/Button/setConvanSizeButton"
import SetBorderButton from "@/src/components/Button/setBorderButton"
import DownloadButton from "@/src/components/Button/downloadButton";

import React from "react";

export const Navbar = () => {

  return (

      <NextUINavbar maxWidth="xl" position="sticky">
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
              <NavbarItem>
                <TemplateButton/>
              </NavbarItem>
              <NavbarItem>
                <SetConvanSizeButton/>
              </NavbarItem>
              <NavbarItem>
                <SetBorderButton/>
              </NavbarItem>
          </NavbarContent>


          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
              {/*<Link isExternal aria-label="Github" href={siteConfig.links.github}>*/}
              {/*  <GithubIcon className="text-default-500" />*/}
              {/*</Link>*/}
              <NavbarItem>
                <DownloadButton/>
              </NavbarItem>
              <NavbarItem>
                <ThemeSwitch/>
              </NavbarItem>
              <NavbarMenuToggle/>
          </NavbarContent>

          <NavbarMenu>
              <div className="mx-4 mt-2 flex flex-col gap-2">
                  <TemplateButton/>
              </div>
              <div className="mx-4 mt-2 flex flex-col gap-2">
                  <DownloadButton/>
              </div>
          </NavbarMenu>

      </NextUINavbar>

  );
};
