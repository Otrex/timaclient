import Api from "~/lib/core/Api";
import type { IRequestOptions } from "~/lib/interfaces/utils";


export class MockApi extends Api {
  constructor() {
    super()
    // Override methods or add mock-specific functionality here
  }

  // Example of overriding a method
  public async request<R, T = any>(options: IRequestOptions<T>): Promise<R> {
    // Implement mock behavior here
    console.log('Mock API request:', options)
    return {} as R; // Return mock data
  }

  // Add more mock methods as needed
}

export default MockApi
