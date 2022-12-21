import { Project } from '@/helpers/interfaces'
import Link from 'next/link';
import { ProjectLogo } from './ProjectLogo';
import Card from './UI/Card';
import { ButtonReaction } from './ButtonReaction';

export const ProjectsItem = ({ project }: { project: Project }) => (
  <Card>

    <div className="flex justify-between">
      {/* main info */}
      <Link href={project.stream_id} title={project.content?.title}>
        <div className="flex gap-3">
          <ProjectLogo logo={project.content?.data?.logo} size="56" />
          <div>
            <div className="text-xl font-medium mb-2">{project.content?.title}</div>
            <div className="text-sm">{project.content?.body}</div>
          </div>
        </div>
      </Link>
      <div className="shrink-0 ml-4">
        <ButtonReaction stream_id={project.stream_id} count_likes={project.count_likes} count_downvotes={project.count_downvotes} creator={project.creator} />
      </div>
    </div>

    {/* tags */}
    {project.content?.tags?.length && (
    <div className="tag-chips flex flex-wrap items-center gap-3 mt-4">
      {project.content?.tags.map(({ title, slug }) => (
        <Link key={slug} href={`/list/${slug}`}>
          <span className="bg-indigo-100 border border-indigo-300 hover:bg-indigo-200 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-indigo-800 dark:hover:bg-indigo-300">
            {title}
          </span>
        </Link>
      ))}
    </div>
    )}

    {/* short description */}
    <div className="content mt-6 space-y-6 text-sm break-words">
      {project.content?.data?.description_long}
    </div>

    {/* actions */}
    <div className="flex justify-center p-1.5 rounded-full font-medium cursor-pointer text-sm tracking-wider hover:bg-gray-300/50 dark:hover:bg-[#6b50af]/50 duration-100 ease-in-out">
      Comments
      {' '}
      {project.count_replies}
    </div>
  </Card>
);
