export interface Profile {
  pfp: string
  username: string
  description: string
  pfpIsNft: {
    chain: string
    tokenId: string
    contract: string
    timestamp: string
  }
}

export interface Details {
  did: string
  profile: Profile
  metadata: Metadata
}

export interface Metadata {
  address: string
  chain: string
  ensName: string
}

export interface User {
  did: string
  details: Details
  metadata: Metadata
  status: number
  profile: Details
}
