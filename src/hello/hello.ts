import { LambdaHandler } from '../../shared/api';

import { helloControllerFactory } from './hello.controller';
import { HelloController } from './hello.d';

// Dependencies (build the options object here)
const options: {} = {};
const helloController: HelloController = helloControllerFactory(options);

export const greeting: LambdaHandler = helloController.greeting;
