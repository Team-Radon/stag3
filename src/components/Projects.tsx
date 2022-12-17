import { GetProjectsOptions, useGetProjects } from '@/orbis/useGetProjects';
import { ProjectsItem } from './ProjectsItem';
import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';

export const Projects = ({ options }: { options?: GetProjectsOptions }) => {
  const { data: projects, isLoading } = useGetProjects({ options });

  if (!projects && isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (projects?.data?.length === 0) {
    return <Card>Projects not found</Card>
  }

  return (
    <>
      {projects?.data?.map((project) => (
        <ProjectsItem project={project} key={project.stream_id} />
      ))}
    </>
  )
};
