import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={"/login"}>
          <p>Login</p>
        </NextLink>
        <NextLink href={"/register"}>
          <p>Register</p>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <div>{data.me.username}</div>
        <button
          onClick={() => logout()}
          className={`${logoutFetching ? "opacity-50" : ""}`}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <nav className="flex gap-4 w-full p-4 bg-red-500 text-white justify-end">
      {body}
    </nav>
  );
};
