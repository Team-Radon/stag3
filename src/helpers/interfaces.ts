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
  username: string
  details: Details
  metadata: Metadata
  status: number
  profile: Details
  count_followers: number
  count_following: number
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
      cover: string
      description_long: string
      whitepaper: string
      status: Tag
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
