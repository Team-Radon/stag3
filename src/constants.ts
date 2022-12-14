import { Tag } from './helpers/interfaces';

export const TAGS: Tag[] = [
  { title: 'OrbisHackathon', slug: 'orbis-hackathon' },
  { title: 'Privacy', slug: 'privacy' },
  { title: 'DeFi', slug: 'defi' },
  { title: 'Marketplace', slug: 'marketplace' },
  { title: 'Wallet', slug: 'wallet' },
  { title: 'DAO', slug: 'dao' },
  { title: 'Social', slug: 'social' },
  { title: 'Gaming', slug: 'gaming' },
  { title: 'Metaverse', slug: 'metaverse' },
  { title: 'NFT', slug: 'nft' },
  { title: 'Tool', slug: 'tool' },
  { title: 'Analytics', slug: 'analytics' },
  { title: 'Content', slug: 'content' },
  { title: 'Other', slug: 'other' }
];

export const PROJECT_STATUS: Tag[] = [
  { title: 'Idea and Concept', slug: 'ideas' },
  { title: 'Pre-launch', slug: 'pre-launch' },
  { title: 'Alpha', slug: 'alpha' },
  { title: 'Beta', slug: 'beta' },
  { title: 'Public launch', slug: 'public-launch' }
];

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif'
];

export const LOGO_PLACEHOLDER = '/stag3-grayscale.png'

// Hashmap utility type
interface ScoringHashMap { [key: string]: number }
export const GITCOIN_PASSPORT_SCORES: ScoringHashMap = {
  Signer: 1,
  Google: 1,
  Ens: 1,
  Poh: 5,
  Twitter: 1,
  TwitterTweetGT10: 1,
  TwitterFollowerGT100: 1,
  TwitterFollowerGT500: 1,
  TwitterFollowerGTE1000: 2,
  TwitterFollowerGT5000: 3,
  POAP: 1,
  Facebook: 1,
  FacebookFriends: 1,
  FacebookProfilePicture: 1,
  Brightid: 5,
  Github: 1,
  TenOrMoreGithubFollowers: 1,
  FiftyOrMoreGithubFollowers: 3,
  ForkedGithubRepoProvider: 1,
  StarredGithubRepoProvider: 1,
  FiveOrMoreGithubRepos: 1,
  'GitcoinContributorStatistics#numGrantsContributeToGte#1': 1,
  'GitcoinContributorStatistics#numGrantsContributeToGte#10': 1,
  'GitcoinContributorStatistics#numGrantsContributeToGte#25': 1,
  'GitcoinContributorStatistics#numGrantsContributeToGte#100': 3,
  'GitcoinContributorStatistics#totalContributionAmountGte#10': 1,
  'GitcoinContributorStatistics#totalContributionAmountGte#100': 1,
  'GitcoinContributorStatistics#totalContributionAmountGte#1000': 3,
  'GitcoinContributorStatistics#numRoundsContributedToGte#1': 1,
  'GitcoinContributorStatistics#numGr14ContributionsGte#1': 1,
  'GitcoinGranteeStatistics#numOwnedGrants#1': 1,
  'GitcoinGranteeStatistics#numGrantContributors#10': 1,
  'GitcoinGranteeStatistics#numGrantContributors#25': 1,
  'GitcoinGranteeStatistics#numGrantContributors#100': 1,
  'GitcoinGranteeStatistics#totalContributionAmount#100': 1,
  'GitcoinGranteeStatistics#totalContributionAmount#1000': 1,
  'GitcoinGranteeStatistics#totalContributionAmount#10000': 3,
  'GitcoinGranteeStatistics#numGrantsInEcoAndCauseRound#1': 1,
  Linkedin: 2,
  Discord: 1,
  GitPOAP: 2,
  Snapshot: 1,
  SnapshotProposalsProvider: 2,
  SnapshotVotesProvider: 1,
  'ethPossessionsGte#1': 1,
  'ethPossessionsGte#10': 1,
  'ethPossessionsGte#32': 1,
  FirstEthTxnProvider: 1,
  EthGTEOneTxnProvider: 1,
  EthGasProvider: 1,
  'gtcPossessionsGte#10': 1,
  'gtcPossessionsGte#100': 1,
  SelfStakingBronze: 1,
  SelfStakingSilver: 1,
  SelfStakingGold: 1,
  CommunityStakingBronze: 1,
  CommunityStakingSilver: 1,
  CommunityStakingGold: 1,
  NFT: 1,
  ZkSync: 1,
  Lens: 2,
  GnosisSafe: 1
}
