import { Container } from "inversify";

const servicesContainerInjector = new Container();

export function initInjector(serviceProviders: any[]) {
  serviceProviders.forEach(service => {
    servicesContainerInjector.bind<typeof service>(service)
      .toConstantValue(new service());
  });
}

export default servicesContainerInjector;