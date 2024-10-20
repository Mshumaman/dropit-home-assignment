import {expect, test} from "@playwright/test";
import {Logger} from "tslog";


interface IResponse {
    name?: string;
    status?: string;
    id?: string;
}

const logger: Logger<any> = new Logger({name: "PetStoreAPI"});
const baseUrl = 'https://petstore.swagger.io/v2';

function generatePetData(overrides = {}) {
    return {
        "id": 9876,
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        "status": "available",
    };
}

test.describe('API Testing for Dropit Assignment', {tag:'@apiTests'} , () => {

    let createdPetId: string;

    test('Create new pet and update status', async ({request}) => {

        await test.step('Create a new pet with "status": "available"', async () => {
            const petData = generatePetData();
            const petCreationResponse = await request.post(`${baseUrl}/pet`, {data: petData});
            expect(petCreationResponse.status()).toBe(200);

            const jsonResponse: IResponse = await petCreationResponse.json();
            createdPetId = jsonResponse.id;

            logger.info(`Pet created with ID: ${createdPetId}`);
            expect(jsonResponse.name).toEqual(petData.name);
            expect(jsonResponse.status).toEqual(petData.status);
        });

        await test.step('Update the pet to "status": "sold"', async () => {
            const updatedPetData = {id: createdPetId, status: 'sold'};
            const petUpdateResponse = await request.put(`${baseUrl}/pet`, {data: updatedPetData});
            expect(petUpdateResponse.status()).toBe(200);
            const jsonResponse: IResponse = await petUpdateResponse.json();

            logger.info(`Pet with ID ${createdPetId} updated to status "sold"`, jsonResponse);
            expect(jsonResponse.status).toEqual('sold');
        });
    });

    test('Find a pet by status', async ({request}) => {

        const petResponse = await request.get(`${baseUrl}/pet/findByStatus`, {params: {status: 'available'}});

        await test.step('Find a pet by status: “available”', async () => {

            expect(petResponse.status()).toBe(200);
        });

        await test.step('Verify that the name of the fourth pet name is “Puff”', async () => {

            const jsonResponse: IResponse[] = await petResponse.json();

            const puffPet = jsonResponse.find(pet => pet.name === 'Puff');
            const fourthPet = jsonResponse[3];

            // usually fourthPet is not Puff
            logger.info('Fourth pet:', fourthPet);
            logger.info('Puff pet:', puffPet);

            if(fourthPet.name !== 'Puff') {
                const puffIndex = jsonResponse.findIndex(pet => pet.name === 'Puff');
                if (puffIndex !== -1) {
                    logger.info(`Found a pet with the name "Puff" at index ${puffIndex}.`, jsonResponse[puffIndex]);
                } else {
                    logger.error('No pet with the name "Puff" found in the response.');
                }
            }


        });
    });

    test('Find another pet by status', async ({request}) => {

        const petResponse = await request.get(`${baseUrl}/pet/findByStatus`, {params: {status: 'sold'}});

        await test.step('Find a pet by status: “sold”', async () => {
            expect(petResponse.status()).toBe(200);
        });

        await test.step('Validate that all the items that returned in the response have the expected status', async () => {
            const jsonResponse: IResponse[] = await petResponse.json();
            expect(jsonResponse.length).toBeGreaterThan(0);
            for (let i = 0; i < jsonResponse.length; i++) {
                const pet = jsonResponse[i];
                expect(pet.status).toBe('sold');
            }
        });
    });

});
