import { Details } from '@/helpers/interfaces';
import { useUsername } from '@/hooks/useUsername';
import { AvatarUser } from './AvatarUser'

export const BaseUser = ({ details }: { details: Details }) => {
  const { username } = useUsername(details);

  return (
    <div className="flex gap-1 items-center">
      <AvatarUser details={details} size="24" />
      <div className="text-sm">{username}</div>
    </div>
  )
}
