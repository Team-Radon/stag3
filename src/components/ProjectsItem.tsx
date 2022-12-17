import { Project } from '@/helpers/interfaces'
import Link from 'next/link';
import { ProjectLogo } from './ProjectLogo';
import { Reaction } from './Reaction';
import Card from './UI/Card';

export const ProjectsItem = ({ project }: { project: Project }) => (
  <Card>
    <Link href={project.stream_id} title={project.content?.title}>
      <div className="flex gap-3">
        <ProjectLogo logo={project.content?.data?.logo} size="56" />
        <div>
          <div className="text-xl font-medium mb-2">{project.content?.title}</div>
          <div className="text-sm">{project.content?.body}</div>
        </div>
      </div>
    </Link>
    <div className="content mt-6 space-y-6 text-sm">
      {project.content?.data?.description_long}
    </div>
    {project.content?.tags?.length && (
    <div className="category-chips flex items-center gap-4 mt-4">
      {project.content?.tags.map(({ title, slug }) => (<Link key={slug} href={`/list/${slug}`}><div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">{title}</div></Link>))}
    </div>
    )}
    <Reaction stream_id={project.stream_id} count={project.count_likes ? project.count_likes : 0} type="like" />
  </Card>
);
