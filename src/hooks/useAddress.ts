import { getAddressFromDid } from '@orbisclub/orbis-sdk/utils';
import { Details } from '../helpers/interfaces';

export function useAddress (details?: Details) {
  const { address } = getAddressFromDid(details?.did);
  return {
    address
  };
}
