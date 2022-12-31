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
  profile_details: Details
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

export interface Post {
  stream_id: string
  creator_details: Details
  creator: string
  timestamp: number
  count_likes: number
  count_haha: number
  count_downvotes: number
  count_replies: number
}

export interface Project extends Post {
  content: {
    stream_id?: string
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
}

export interface Comment extends Post {
  content: {
    body: string
  }
  master: string
  reply_to: string
  reply_to_creator_details: Details
  reply_to_details: {
    body: string
    type: string
    master: string
    mentions: User[]
  }
  count_likes: number
}

export interface Discussion extends Post {
  content: {
    title: string
    body: string
    tags: Tag[]
  }
}

export interface Notification {
  user_notifiying_details: Details
  type: string
  family: string
  content: {
    did: string
    active: boolean
  }
  post_details: Post & {
    content: {
      body: string
    }
  }
  status: string
}
