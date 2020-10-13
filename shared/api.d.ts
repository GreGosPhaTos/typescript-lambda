import { APIGatewayEvent, Callback, Context, Handler, ProxyCallback, ProxyResult } from 'aws-lambda';  // tslint:disable-line no-implicit-dependencies (Using only the type information from the @types package.)

// Type aliases to hide the 'aws-lambda' package and have consistent, short naming.
export type LambdaCallback<TResult = any> = Callback<TResult>;
export type LambdaContext = Context;
export type LambdaHandler<TEvent = any, TResult = { body: string }> = Handler<TEvent, TResult>;
export type LambdaResponse = ProxyResult;

export interface ApiPayload<T> {
  data: T;
  user?: { id: string };
}

export interface ApiResponse<T> {
  data: T[];
  links?: {
    [key: string]: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    links: {
      first: string;
      next?: string;
    };
    page_size: number;
    total: number;
  };
}

export interface ApiErrorResponseBody {
  message: string;
  // Http status
  status: number;
}
export type SearchParameterOperators = 'e' | 'lte' | 'lt' | 'gte' | 'gt' | 'contains';

