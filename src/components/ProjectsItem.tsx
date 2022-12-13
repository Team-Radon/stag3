import { Project } from '@/helpers/interfaces'
import { ProjectLogo } from './ProjectLogo';
import Card from './UI/Card';

export const ProjectsItem = ({ project }: { project: Project }) => (
  <Card>
    <div className="flex gap-3">
      <ProjectLogo logo={project.content.data.logo} size="56" />
      <div>
        <div className="text-xl font-medium mb-2">{project.content.title}</div>
        <div className="text-sm">{project.content.body}</div>
      </div>
    </div>
    <div className="content mt-6 space-y-6 text-sm">
      {project.content.data.description_long}
    </div>
    <div className="category-chips flex items-center gap-4 mt-4">
      <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">DeFi</div>
      <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">Gaming</div>
    </div>
  </Card>
);
