import React from "react";
import { ApplicationApi } from "../services/web-api/application-api";
import { ApplicationRestApi } from "../services/web-api/rest/application-rest-api";

export interface UserSession {
  name: string;
  email: string;
}

export interface ApplicationContextProps {
  webApi: ApplicationApi<ApplicationRestApi> | null;
  communicationToken: string | null;
  setCommunicationToken: (token: string | null) => void;
  userSession: UserSession | null;
  setUserSession: (user: UserSession | null) => void;
}

export const ApplicationContext = React.createContext<ApplicationContextProps>({
  webApi: null,
  communicationToken: null,
  setCommunicationToken: () => {},
  userSession: null,
  setUserSession: () => {},
} as ApplicationContextProps);
