import { faker } from '@faker-js/faker';

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9 ]/g, ''); // removes special characters
}

export const testData = {
  admin: {
    orgName: sanitizeName(faker.company.name()),  // ✅ sanitized
    contactCode: "India",
    countryCode1: "+91",
    contactNumber: faker.phone.number("9#########"),
    pincode: faker.address.zipCode("######"),
    country: "India",
    city: faker.address.city(),
    state: "MH",
    industry: "Finance",
    website: faker.internet.url()
  },
  employee: {
    employeeName: faker.name.fullName()
  }
};
