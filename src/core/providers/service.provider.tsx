import React from "react";
import { InversifyContext } from "../contexts/inversify-services.context";
import { ContainerProviderProps } from "../models/service-container.model";

export const InjectorContainerProvider: React.FC<ContainerProviderProps> = (
  { container, children },
) => (
  <InversifyContext.Provider value={{ container }}>
    {children}
  </InversifyContext.Provider>
);