/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { Markdown } from '@/components/Markdown';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, PencilIcon } from '@heroicons/react/20/solid';
import { Comments } from '@/components/Comments';
import { ButtonReaction } from '@/components/ButtonReaction';
import { ProjectLogo } from '@/components/ProjectLogo';
import { useAppStore } from '@/store/useAppStore';
import { LOGO_PLACEHOLDER } from '@/constants';
import { ProfileHeader } from '@/components/ProfileHeader';
import { useGetProject } from '../../orbis/useGetProject';

const Project = () => {
  const {
    query: { stream_id }
  } = useRouter();

  const {
    data: project,
    error,
    isLoading
  } = useGetProject({ id: stream_id as string });

  // current login user
  const user = useAppStore((state) => state.user);

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout>
      {!project && isLoading
        ? (
          <GridItemEight>
            <div>Loading</div>
          </GridItemEight>
          )
        : (
          <>
            <GridItemEight>
              <Card>
                {/* cover image */}
                {project?.data?.content?.data?.cover && (
                  <div className="relative aspect-[5/2] md:aspect-[3/1] overflow-hidden">
                    <Image src={project?.data?.content?.data?.cover} alt="cover" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                )}

                {/* header */}
                <div className="relative flex flex-col md:flex-row justify-between items-start px-4 md:px-6 -mt-16 md:mt-0 md:pt-12">
                  <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6">
                    <div className="logo shrink-0 relative aspect-square w-24 rounded-md md:rounded-lg overflow-hidden">
                      <ProjectLogo className="w-full h-full" logo={project?.data?.content?.data?.logo?.length ? project.data?.content?.data?.logo : LOGO_PLACEHOLDER} size="100" />
                    </div>
                    <div className="px-4 md:px-0">
                      <div className="text-center md:text-left text-black">
                        <div className="text-xs font-medium tracking-wider uppercase mb-2">
                          {project?.data?.content?.data?.status?.title ?? '' }
                        </div>
                        <h1 className="text-2xl mb-2">{project?.data?.content?.title}</h1>
                        <div className="content space-y-6 text-sm break-words">
                          {project?.data?.content?.body}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 mx-auto mt-4 md:mx-0 md:ml-4">
                    <ButtonReaction creator={project?.data?.creator || ''} stream_id={project?.data?.stream_id || ''} count_downvotes={project?.data?.count_downvotes || 0} count_likes={project?.data?.count_haha || 0} />
                  </div>
                  { project?.data?.creator_details?.did === user?.did
                    ? (
                      <Link href={`${project?.data?.stream_id}/edit` || '#'} title={project?.data?.content?.title} className="top-20 md:top-4 right-4 absolute flex items-center border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-2 py-1 text-sm gap-2 rounded-md">
                        <PencilIcon className="w-3 h-3" />
                        Edit
                      </Link>
                      )
                    : null }
                </div>

                {/* section label */}
                <div className="font-medium leading-6 text-black border-b border-gray-200 px-4 pb-2 md:px-6 mt-4 md:mt-12">Details</div>

                {/* tags */}
                <div className="tag-chips flex flex-wrap items-center gap-3 px-4 md:px-6 mt-6">
                  {project?.data?.content?.tags?.map(({ title, slug }) => (
                    <Link key={slug} href={`/list/${slug}`}>
                      <span className="bg-indigo-100 border border-indigo-300 hover:bg-indigo-200 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-indigo-800 dark:hover:bg-indigo-300">
                        {title}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* about */}
                <div className="about prose-sm prose-p:last-of-type:!mb-0 max-w-none text-black px-4 md:px-6 mt-4">
                  <Markdown source={project?.data?.content?.data?.description_long} />
                </div>

                {/* section label */}
                <div className="font-medium leading-6 text-black border-b border-gray-200 px-4 pb-2 md:px-6 mt-12">Links</div>

                {/* links */}
                <div className="links flex flex-col md:flex-row md:gap-20 px-4 md:px-6 my-6">
                  <div className="official-sites md:w-1/3">
                    <Link href={project?.data?.content?.data?.website || '#'} className="group flex items-center gap-1 text-sm text-sky-600 hover:underline">
                      <span>Website</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={project?.data?.content?.data?.whitepaper || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Whitepaper / Litepaper</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={`https://github.com/${project?.data?.content?.data?.github}` || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Github</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={`https://gitcoin.com/${project?.data?.content?.data?.gitcoin}` || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Gitcoin</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                  </div>
                  <div className="socials md:w-1/3 mt-4 md:mt-0">
                    <Link href={`https://discord.com/${project?.data?.content?.data?.discord}` || '#'} className="group flex items-center gap-1 text-sm text-sky-600 hover:underline">
                      <span>Discord</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={`https://twitter.com/${project?.data?.content?.data?.twitter}` || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Twitter</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                  </div>
                </div>
              </Card>
              <Card className="mt-4">
                {/* comments */}
                {project && (
                <Comments
                  context={process.env.PROJECT_CONTEXT || ''}
                  post={project?.data}
                />
                )}
              </Card>
            </GridItemEight>
            <GridItemFour>
              <ProfileHeader profiledid={project?.data?.creator_details?.did} />
            </GridItemFour>
          </>
          )}
    </GridLayout>
  );
};

export default Project;
