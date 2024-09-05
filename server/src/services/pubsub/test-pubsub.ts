import { PubSubService } from "./types";

export class TestPubSub implements PubSubService {
  publish: (topic: string, payload: Record<string, unknown>) => Promise<string>;
  validatePayLoad(payLoad: Record<string, any>): boolean {
    throw new Error("Method not implemented.");
  }
}
