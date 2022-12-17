import { Details } from '@/helpers/interfaces';
import { useUsername } from '@/hooks/useUsername';
import { AvatarUser } from './AvatarUser'

export const BaseUser = ({ details }: { details: Details }) => {
  const { username } = useUsername(details);

  return (
    <div className="flex items-center">
      <AvatarUser details={details} size="28" />
      <span className="ml-2 text-skin-link">{username}</span>
    </div>
  )
}
