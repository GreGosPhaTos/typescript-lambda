import { LambdaHandler } from '../../shared/api'

export interface HelloController {
  greeting: LambdaHandler;
}

export type HelloControllerFactory = {
  (dependencies: { }): HelloController;
}

// Models
export type Greeting = {
  greeting: string;
}
