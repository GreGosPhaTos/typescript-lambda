import * as axios from 'axios';

import { Urls } from '../../configs/api.urls';
import { ApiResponse } from '../../shared/api';
import { Greeting } from '../../src/hello/hello.d';

const apiUrl: string = Urls[process.env.ENV || 'local'];
describe(`Running GET Greeting tests on ${apiUrl}`, () => {
  it('should greet the tests !', async () => {
    const res: axios.AxiosResponse<ApiResponse<Greeting>> =
      await axios.default.get<ApiResponse<Greeting>>(`${apiUrl}/hello/tests`);
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    expect(res.data.data[0].greeting).toEqual('Hello tests!');
  });
});
