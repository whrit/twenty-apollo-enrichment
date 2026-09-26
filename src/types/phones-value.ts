export type PhonesValue = {
  primaryPhoneNumber: string;
  primaryPhoneCountryCode: string;
  primaryPhoneCallingCode: string;
  additionalPhones: Array<{
    number: string;
    countryCode: string;
    callingCode: string;
  }> | null;
};
