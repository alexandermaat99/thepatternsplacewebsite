export interface PubSubService {
  publish: (topic: string, payload: Record<string, unknown>) => Promise<string>;
  validatePayLoad(payLoad: Record<string, any>): boolean;
}
