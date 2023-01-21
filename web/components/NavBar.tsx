import React from "react";
import NextLink from "next/link";
import { NavUserSection } from "./NavUserSection";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <header className="sticky z-10 bg-red-500">
      <nav className="max-w-3xl mx-auto flex justify-between gap-4 w-full p-4 text-white">
        <NextLink href={"/"}>
          <h1 className="text-2xl mr-4">LiReddit</h1>
        </NextLink>
        <div className="flex gap-4 items-center">
          <NextLink href={"/create-post"}>
            <span>Create post</span>
          </NextLink>
          <NavUserSection />
        </div>
      </nav>
    </header>
  );
};
