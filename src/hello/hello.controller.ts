import { APIGatewayEvent } from 'aws-lambda'; // tslint:disable-line no-implicit-dependencies (Using only the type information from the @types package.)

import { LambdaCallback, LambdaContext, LambdaHandler } from '../../shared/api';

import { HelloController, HelloControllerFactory } from './hello.d';

// tslint:disable-next-line: typedef
export const greeting = (options: {}): LambdaHandler<APIGatewayEvent> =>
  (event: APIGatewayEvent, context: LambdaContext, callback: LambdaCallback) => {
    const name: string = event && event.pathParameters && event.pathParameters.name
      ? event.pathParameters.name
      : '';
    callback(undefined, {
      body: JSON.stringify({
        data: [
          {
            greeting: `Hello ${name}!`
          }
        ],
      }),
      statusCode: 200,
    });
  };

export const helloControllerFactory: HelloControllerFactory = (options: { }): HelloController => ({
  greeting: greeting({}),
});
