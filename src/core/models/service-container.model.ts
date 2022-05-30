import { Container } from "inversify";

export type ServiceListType = { 
  [name: string]: {key: string, value: any} 
}

export interface ContainerContext {
  container: Container | null;
}

export interface ContainerProviderProps {
  container: Container;
  children: any;
}