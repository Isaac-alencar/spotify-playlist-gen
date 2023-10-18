import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  authenticateUser,
  refreshAuthToken,
} from "@/infra/auth/authenticate-user";
import { requestUserAuth as infraRequestUserAuth } from "@/infra/auth/request-user-auth";

type User = {
  display_name: string;
  images: {
    url: string;
  };
};

type AuthenticationContextProps = {
  signIn: (code: string) => Promise<void>;
  requestUserAuth: () => Promise<void>;
  user: User | undefined;
  isLogged: boolean;
};

export const AuthenticationContext = createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps
);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<any>();

  const signIn = useCallback(
    async (code: string) => {
      if (user) return;

      const response = await authenticateUser({ code });
      if (response) {
        setIsLogged(true);
        setCredentials(response);

        window.localStorage.setItem("isLogged", JSON.stringify(isLogged));
      }
    },
    [user, isLogged]
  );

  const requestUserAuth = useCallback(
    async () => await infraRequestUserAuth(),
    []
  );

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const isLogged = window.localStorage.getItem("isLogged");

    if (user && isLogged) {
      setUser(JSON.parse(user) as User);
      setIsLogged(JSON.parse(isLogged));
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (credentials?.access_token && credentials?.refresh_token && !user) {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${credentials?.access_token}`,
          },
        });

        if (response.status === 200) {
          const user = await response.json();
          window.localStorage.setItem("user", JSON.stringify(user));

          setUser(user);
          return;
        }

        const newCredentials = await refreshAuthToken({
          refresh_token: credentials?.refresh_token,
        });

        setCredentials(newCredentials);

        return;
      }
    })();
  }, [credentials?.access_token, credentials?.refresh_token, user]);

  const value = useMemo(
    () => ({
      signIn,
      requestUserAuth,
      user,
      isLogged,
    }),
    [isLogged, user, signIn, requestUserAuth]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error("useAuth must be inside AuthenticationProvider!");
  }

  return context;
};
