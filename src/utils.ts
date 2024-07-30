import { MERCURY_USERS, THIRD_PARTY_LINKS } from "./data";
import { ComparisonResult, MercuryCustomer, ThirdPartyLink } from "./types";

/**
 * Optimization: Separate GMAIL from other email providers
 * as gmail can have dots or plus characters in the email address
 */
const normalizeEmail = (email: string): string => email.trim().toLowerCase();

/**
 * Optimization: Should think of the geographic location and demography of the users.
 * Lot's of names accept accents or numbers etc.
 * For simplicity, we are only removing spaces and converting to lowercase but this can be greatly improved.
 * Ideally we incorporate fuzzy string matching, so that "john smith" vs. "john smyth" should be considered a match.
 */
const normalizeName = (name: string): string => name.trim().toLowerCase();

/**
 *
 * Optimization: Phone numbers can have different formats based on the country.
 * Ideally we'd use the country code to normalize the phone number.
 * For this first simple case we only keep digits but do not consider the
 * country code or the size of the phone number.
 */
const normalizePhoneNumber = (phone: string): string =>
  phone.replace(/[^\d]/g, "");

/**
 *
 * Optimization: This is a very simple implementation of comparing names.
 * We should use the nickname.txt file to compare nicknames as well.
 * But even there, we should go further and accept accents.
 */
const compareNames = (names: string[], fullName: string): boolean => {
  return names.some((name) => normalizeName(name) === fullName);
};

/**
 *
 * Build the hashMap using mercury data as the source.
 * HashMap will allow us to make constant lookup time.
 * We use the mercuryCompanyId as the key to make it easier to find the data.
 * We normalize the data before adding it to the Map to make it easier to compare.
 */
export const buildHashMap = (
  mercuryData: MercuryCustomer[]
): Map<number, { fullName: string[]; emails: string[]; phones: string[] }> => {
  const hashMap = new Map<
    number,
    { fullName: string[]; emails: string[]; phones: string[] }
  >();

  mercuryData.forEach((customer) => {
    const fullName = customer.users.map(
      (user) =>
        `${normalizeName(user.firstName)} ${normalizeName(user.lastName)}`
    );
    const emails = customer.users.map((user) => normalizeEmail(user.email));
    const phones = [normalizePhoneNumber(customer.contactPhoneNumber)];

    hashMap.set(customer.mercuryCompanyId, {
      fullName,
      emails,
      phones,
    });
  });

  return hashMap;
};

/**
 *
 * Compare the users from the third party link with the mercury data.
 * We check if the email, phone or name match.
 * If any of these match we consider the users to be the same.
 */
export const compareUsers = (
  hashMap: Map<
    number,
    { fullName: string[]; emails: string[]; phones: string[] }
  >,
  link: ThirdPartyLink
): boolean => {
  const customerData = hashMap.get(link.mercuryCompanyId);

  if (!customerData) {
    return false;
  }

  const emailMatch = link.emails.some((email) =>
    customerData.emails.includes(normalizeEmail(email))
  );

  const phoneMatch = link.phoneNumbers.some((phone) =>
    customerData.phones.includes(normalizePhoneNumber(phone))
  );

  const nameMatch = link.names.some((name) =>
    customerData.fullName.some((fullName) => compareNames([name], fullName))
  );

  return emailMatch || phoneMatch || nameMatch;
};

const compareData = (
  mercuryData: MercuryCustomer[],
  thirdPartyData: ThirdPartyLink[]
): ComparisonResult => {
  const hashMap = buildHashMap(mercuryData);

  let totalMatches = 0;
  let totalMismatches = 0;
  const results: { linkId: number; result: "Match" | "Mismatch" }[] = [];

  thirdPartyData.forEach((link) => {
    const userMatches = compareUsers(hashMap, link);

    if (userMatches) {
      totalMatches++;
      results.push({ linkId: link.linkId, result: "Match" });
    } else {
      totalMismatches++;
      results.push({ linkId: link.linkId, result: "Mismatch" });
    }
  });

  return { totalMatches, totalMismatches, results };
};

export function testResults() {
  const result = compareData(MERCURY_USERS, THIRD_PARTY_LINKS);
  console.log(result);
}

/**
 * Other edge cases:
 * nicknames.txt file should allow us to build a Map.
 * The Map should probably bi bidirectional.
 * The key should be each name and nickname.
 * The value should be a set containing all names and nicknames associated with the key.
 *
 * Given the line bill,william,billy,robert,willie,fred, the goal is to create a map where:
 * "bill" maps to {"william", "billy", "robert", "willie", "fred"}
 * "william" maps to {"bill", "billy", "robert", "willie", "fred"}
 * and so on for each name/nickname.
 */

/**
 * Better system:
 * Option 1:
 * Add scores to the global comparison result, like a confidence result.
 * Company name comparison should probably have a lower score than email or phone number or user name.
 * Then make it a match only if the score is above a certain threshold.
 * The best way would probably to train a machine learning model to give the best weights to each comparison.
 *
 * Option 2 (other ways to prevent this type of fraud):
 * Mercury takes a tiny dollar amount from the third party link and then returns the amount once they verified the bank account.
 * cons:
 * - not all banks support this feature.
 * - asynchronous
 */
