import React from "react";
import { ContainerContext } from "../models/service-container.model";

export const InversifyContext = React.createContext<ContainerContext>(
  { container: null },
);