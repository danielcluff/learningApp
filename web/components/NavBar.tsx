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

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   console.log(data);
  //   setIsLoggedIn(!!data?.me);
  //   console.log(isLoggedIn);
  // }, [data]);

  return (
    <nav className="sticky z-10 flex gap-4 w-full p-4 bg-red-500 text-white justify-end">
      {!data?.me ? (
        <>
          <NextLink href={"/login"}>
            <p>Login</p>
          </NextLink>
          <NextLink href={"/register"}>
            <p>Register</p>
          </NextLink>
        </>
      ) : (
        <>
          <div>{data?.me.username}</div>
          <button
            onClick={() => logout()}
            className={`${logoutFetching ? "opacity-50" : ""}`}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};
