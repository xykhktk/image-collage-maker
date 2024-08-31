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
              {/* <NavbarItem>
                <DownloadButton/>
              </NavbarItem> */}
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

    // <NextUINavbar maxWidth="xl" position="sticky">
    //   <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
    //     <NavbarBrand as="li" className="gap-3 max-w-fit">
    //       <NextLink className="flex justify-start items-center gap-1" href="/">
    //         <Logo />
    //         <p className="font-bold text-inherit">ACME</p>
    //       </NextLink>
    //     </NavbarBrand>
    //     <ul className="hidden lg:flex gap-4 justify-start ml-2">
    //       {siteConfig.navMenu.map((item) => (
    //         <NavbarItem key={item.href}>
    //           <NextLink
    //             className={clsx(
    //               linkStyles({ color: "foreground" }),
    //               "data-[active=true]:text-primary data-[active=true]:font-medium",
    //             )}
    //             color="foreground"
    //             href={item.href}
    //           >
    //             {item.label}
    //           </NextLink>
    //         </NavbarItem>
    //       ))}
    //
    //         {/*<NavbarItem>*/}
    //         {/*    <TemplateButton />*/}
    //         {/*</NavbarItem>*/}
    //     </ul>
    //   </NavbarContent>
    //
    //   <NavbarContent
    //     className="hidden sm:flex basis-1/5 sm:basis-full"
    //     justify="end"
    //   >
    //     <NavbarItem className="hidden sm:flex gap-2">
    //       <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
    //         <TwitterIcon className="text-default-500" />
    //       </Link>
    //       <Link isExternal aria-label="Github" href={siteConfig.links.github}>
    //         <GithubIcon className="text-default-500" />
    //       </Link>
    //       <ThemeSwitch />
    //     </NavbarItem>
    //     <NavbarItem className="hidden md:flex">
    //       <Button
    //         isExternal
    //         as={Link}
    //         className="text-sm font-normal text-default-600 bg-default-100"
    //         href={siteConfig.links.sponsor}
    //         startContent={<HeartFilledIcon className="text-danger" />}
    //         variant="flat"
    //       >
    //         Sponsor
    //       </Button>
    //     </NavbarItem>
    //   </NavbarContent>
    //
    //   <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
    //     {/*<Link isExternal aria-label="Github" href={siteConfig.links.github}>*/}
    //     {/*  <GithubIcon className="text-default-500" />*/}
    //     {/*</Link>*/}
    //     <ThemeSwitch />
    //     <NavbarMenuToggle />
    //   </NavbarContent>
    //
    //   <NavbarMenu>
    //     <div className="mx-4 mt-2 flex flex-col gap-2">
    //       {siteConfig.navMenuItems.map((item, index) => (
    //         <NavbarMenuItem key={`${item}-${index}`}>
    //           <Link
    //             color={
    //               index === 2
    //                 ? "primary"
    //                 : index === siteConfig.navMenuItems.length - 1
    //                   ? "danger"
    //                   : "foreground"
    //             }
    //             href="#"
    //             size="lg"
    //           >
    //             {item.label}
    //           </Link>
    //         </NavbarMenuItem>
    //       ))}
    //     </div>
    //   </NavbarMenu>
    // </NextUINavbar>
  );
};
