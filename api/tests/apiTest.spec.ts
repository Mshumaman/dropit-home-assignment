import {expect, test} from "@playwright/test";
import {Logger} from "tslog";
import {PetApiClient} from "../apiClients/PetApiClient";


interface IResponse {
    name?: string;
    status?: string;
    id?: string;
}

const logger: Logger<any> = new Logger({name: "PetStoreAPI"});

test.describe('API Testing for Dropit Assignment', {tag:'@apiTests'} , () => {
    let createdPetId: string;
    let petApiClient: PetApiClient;

    test.beforeEach(async ({ request }) => {
        petApiClient = new PetApiClient(request, 'https://petstore.swagger.io/v2');
    });

    test('Create new pet and update status', async () => {

        await test.step('Create a new pet with "status": "available"', async () => {
            const petData = {
                id: 9876,
                name: "doggie",
                status: "available"
            };

            const petCreationResponse = await petApiClient.createPet(petData);
            expect(petCreationResponse.status()).toBe(200);

            const jsonResponse: IResponse = await petCreationResponse.json();
            createdPetId = jsonResponse.id;

            logger.info(`Pet created with ID: ${createdPetId}`);
            expect(jsonResponse.name).toEqual(petData.name);
            expect(jsonResponse.status).toEqual(petData.status);
        });

        await test.step('Update the pet to "status": "sold"', async () => {
            const updatedPetData = {id: createdPetId, status: 'sold'};

            const petUpdateResponse = await petApiClient.updatePet(updatedPetData);
            expect(petUpdateResponse.status()).toBe(200);
            const jsonResponse: IResponse = await petUpdateResponse.json();

            logger.info(`Pet with ID ${createdPetId} updated to status "sold"`, jsonResponse);
            expect(jsonResponse.status).toEqual('sold');
        });
    });

    test('Find a pet by status', async () => {

        await test.step('Find a pet by status: “available”', async () => {

            const petResponse = await petApiClient.findPetsByStatus('available');
            expect(petResponse.status()).toBe(200);

            const jsonResponse: IResponse[] = await petResponse.json();
            const puffPet = jsonResponse.find(pet => pet.name === 'Puff');
            const fourthPet = jsonResponse[3];

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

    test('Find another pet by status', async () => {

        await test.step('Find a pet by status: “sold”', async () => {

            const petResponse = await petApiClient.findPetsByStatus('sold');
            expect(petResponse.status()).toBe(200);

            const jsonResponse: IResponse[] = await petResponse.json();
            expect(jsonResponse.length).toBeGreaterThan(0);

            for (const pet of jsonResponse) {
                expect(pet.status).toBe('sold');
            }
        });
    });

});
