import {useServerRequest} from '../ServerRequestProvider';

export function useServerPerformance(data?: any): any {
  const request = useServerRequest();
  if (data)
    request.ctx.performanceData = Object.assign(
      {},
      request.ctx.performanceData,
      data
    );
  return request.ctx.performanceData;
}
