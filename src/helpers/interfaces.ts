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

export interface Tag {
  title: string
  slug: string
}

export interface Project {
  stream_id: string
  content: {
    title: string
    body: string
    tags: Tag[]
    data: {
      logo: string
      description_long: string
      whitepaper: string
      website: string
      twitter: string
      github: string
      gitcoin: string
      discord: string
    }
  }
  creator_details: Details
  creator: string
  timestamp: number
}
