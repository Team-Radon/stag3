import { GetProjectsOptions, useGetProjects } from '@/orbis/useGetProjects';
import { ProjectsItem } from './ProjectsItem';
import Card from './UI/Card';
import SkeletonProject from './UI/SkeletonProject';

export const Projects = ({ options }: { options?: GetProjectsOptions }) => {
  const { data: projects, isLoading } = useGetProjects({ options });

  if (!projects && isLoading) {
    return (
      <div className="flex flex-col w-full gap-4 md:gap-6">
        <SkeletonProject />
        <SkeletonProject />
        <SkeletonProject />
      </div>
    );
  }

  if (projects?.data?.length === 0) {
    return <Card padded>Projects created and supported will appear here. Submit a Project or Go to Homepage to start voting.</Card>
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {projects?.data?.map((project) => (
        <ProjectsItem project={project} key={project.stream_id} />
      ))}
    </div>
  )
};
