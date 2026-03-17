import type { UserProfile as Profile } from 'oidc-client-ts';

import type { UserProfile } from './loginSlice';

// TODO: Depending on your client subscriptions you may want to map
//       additional properties from the OAuth profile
export const mapUserProfile = (profile: Profile): UserProfile => {
    const { family_name: familyName, given_name: givenName, client_id: _clientId, ...rest } = profile;

    return {
        ...rest,
        givenName,
        familyName,
    };
};
