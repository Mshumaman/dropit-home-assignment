import {APIRequestContext} from '@playwright/test';

export class PetApiClient {
    constructor(private request: APIRequestContext, private baseUrl: string) {}

    async createPet(petData: object) {
        return await this.request.post(`${this.baseUrl}/pet`, {data: petData});
    }

    async updatePet(petData: object) {
        return await this.request.put(`${this.baseUrl}/pet`, {data: petData});
    }

    async findPetsByStatus(status: string) {
        return await this.request.get(`${this.baseUrl}/pet/findByStatus`, {params: {status}});
    }
}
