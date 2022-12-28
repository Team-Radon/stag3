import { Project } from '@/helpers/interfaces'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProjectLogo } from './ProjectLogo';
import Card from './UI/Card';
import { ButtonReaction } from './ButtonReaction';
import { Button } from './UI/Button';
import { LOGO_PLACEHOLDER } from '@/constants';

export const ProjectsItem = ({ project }: { project: Project }) => {
  const { push } = useRouter();

  return (
    <Link href={project.stream_id} title={project.content?.title}>
      <Card padded className="group border-2 border-transparent hover:border-indigo-300 transition-all flex justify-between">
        <div>
          <div className="flex gap-4 mb-6">
            <ProjectLogo logo={project?.content?.data?.logo?.length?project?.content?.data?.logo:LOGO_PLACEHOLDER} size="56" />
            <div>
              <div className="text-xl font-medium mb-2">{project.content?.title}</div>
              {project.content?.tags?.length ? (
              <div className="tag-chips flex flex-wrap items-center gap-3">
                {project.content?.tags.map(({ title, slug }) => (
                  <Link key={slug} href={`/list/${slug}`}>
                    <span className="bg-indigo-100 border border-indigo-200 hover:bg-indigo-200 text-slate-500 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-indigo-800 dark:hover:bg-indigo-300">
                      {title}
                    </span>
                  </Link>
                ))}
              </div>
              ):false}
            </div>
          </div>
          <div className="content space-y-6 text-sm break-words mb-6">
            {project.content?.body}
          </div>
          <Button
            size="sm"
            className="flex items-center border-none hover:bg-indigo-100/50"
            onClick={(e) => {
              e.preventDefault();
              push(`/${project.stream_id}#discussions`)
            }}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            <div className="text-xs mt-0.5">{project.count_replies}</div>
          </Button>
        </div>
        <div className="flex flex-col justify-between shrink-0 ml-4">
          <ButtonReaction stream_id={project.stream_id} count_likes={project.count_likes} count_downvotes={project.count_downvotes} creator={project.creator} />
          <Button
            size="sm"
            className="flex items-center border-none hover:bg-indigo-100/50"
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://cerscan.com/mainnet/stream/${project.stream_id}`, '_blank');
            }}
          >
            <svg className="w-5 h-5 text-gray-600 hover:text-accent" viewBox="0 0 115 156" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M70.0244 1.7C68.0154 2.689 65.2384 5.592 63.1104 8.927C52.6804 25.272 50.4724 28.424 44.9964 34.786C37.6494 43.322 26.9764 52.002 14.0814 59.926C2.27841 67.179 -0.64459 71.178 0.11141 79.039C0.73141 85.495 2.87741 88.477 10.0474 92.847C33.8824 107.376 46.8604 120.115 60.5334 142.403C66.1174 151.505 68.9084 153.926 74.7184 154.705L78.8814 155.263V134.632V114H75.5914C70.1444 114 60.6964 111.09 55.6694 107.864C31.7254 92.499 33.4744 56.375 58.7834 43.549C61.5764 42.134 67.2404 40.451 71.3714 39.809L78.8814 38.641V19.321V0L76.1314 0.023C74.6184 0.035 71.8704 0.79 70.0244 1.7ZM69.8754 50.874C58.1484 54.722 50.3684 65.439 50.5484 77.5C50.6544 84.658 52.6384 89.619 57.5864 95.095C62.5814 100.624 68.0434 103.204 75.9614 103.772C81.2474 104.152 83.5034 103.818 87.4424 102.076L92.3434 99.908L99.6984 107.954C105.635 114.449 107.607 116 109.932 116C113.116 116 115.366 113.103 114.442 110.193C114.14 109.241 110.595 105.186 106.564 101.182L99.2354 93.902L101.808 88.703C108.269 75.648 102.728 59.559 89.4344 52.77C85.0354 50.524 74.1574 49.47 69.8754 50.874ZM87.7904 62.935C94.2684 67.548 96.4944 76.851 92.9764 84.599C90.0384 91.066 85.7754 93.5 77.3814 93.5C71.5154 93.5 69.8544 93.105 67.1284 91.06C63.2284 88.134 59.8814 81.64 59.8814 77C59.8814 71.666 63.5024 65.349 68.2184 62.457C73.7094 59.089 82.6974 59.309 87.7904 62.935Z" />
            </svg>
          </Button>
        </div>
      </Card>
    </Link>
  )
};
