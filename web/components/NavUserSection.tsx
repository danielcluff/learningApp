import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
// import { isServer } from "../utils/isServer";
import { useHasMounted } from "../utils/useHasMounted";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Login = () => (
  <>
    <NextLink href={"/login"}>
      <p>Login</p>
    </NextLink>
    <NextLink href={"/register"}>
      <p>Register</p>
    </NextLink>
  </>
);

export const NavUserSection: React.FC = () => {
  const hasMounted = useHasMounted();
  const [{ data }] = useMeQuery({
    // pause: isServer(),
  });
  const [{ fetching }, logout] = useLogoutMutation();
  const router = useRouter();

  if (!hasMounted) {
    return <Login />;
  }

  if (!data?.me) {
    return <Login />;
  }

  return (
    <>
      <p>{data?.me.username}</p>
      <button
        onClick={async () => {
          await logout();
          router.reload();
        }}
        className={`${fetching ? "opacity-50" : ""}`}
      >
        Logout
      </button>
    </>
  );
};
