import {faker} from "@faker-js/faker/locale/en";


export default class RandomGenerator {

    public get getRandomFirstName(): string {
        return faker.person.firstName();
    }

    public get getRandomLastName(): string {
        return faker.person.lastName();
    }

    public get getRandomAddress(): string {
        return faker.location.streetAddress();
    }

    public get getRandomCity(): string {
        return faker.location.city();
    }

    public get getRandomMail(): string {
        return faker.internet.email();
    }

}



