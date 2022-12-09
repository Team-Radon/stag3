import { getAddressFromDid } from '@orbisclub/orbis-sdk/utils';
import { shorten } from '../helpers/utils';
import { Details } from '../helpers/interfaces';

export function useUsername (details?: Details) {
  const { address } = getAddressFromDid(details?.did);

  return {
    username:
      details?.profile?.username ??
      details?.metadata?.ensName ??
      shorten(address)
  };
}
