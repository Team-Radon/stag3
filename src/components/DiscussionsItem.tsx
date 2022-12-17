import { Discussion } from '@/helpers/interfaces'
import Card from './UI/Card';

export const DiscussionsItem = ({ discussion }: { discussion: Discussion }) => (
  <Card>
    {JSON.stringify(discussion)}
  </Card>
);
