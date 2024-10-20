import { APIRequestContext } from '@playwright/test';

export class PetApiClient {
    constructor(private request: APIRequestContext, private baseUrl: string) {}

    async createPet(petData: object) {
        const response = await this.request.post(`${this.baseUrl}/pet`, { data: petData });
        return response;
    }

    async updatePet(petData: object) {
        const response = await this.request.put(`${this.baseUrl}/pet`, { data: petData });
        return response;
    }

    async findPetsByStatus(status: string) {
        const response = await this.request.get(`${this.baseUrl}/pet/findByStatus`, { params: { status } });
        return response;
    }
}
