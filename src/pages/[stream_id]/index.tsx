/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { Markdown } from '@/components/Markdown';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Comments } from '@/components/Comments';
import { ButtonReaction } from '@/components/ButtonReaction';
import { AvatarUser } from '@/components/AvatarUser';
import { ProjectLogo } from '@/components/ProjectLogo';
import { useGetProject } from '../../orbis/useGetProject';
import { useUsername } from '../../hooks/useUsername';

const Project = () => {
  const {
    query: { stream_id }
  } = useRouter();

  const {
    data: post,
    error,
    isLoading
  } = useGetProject({ id: stream_id as string });

  const { username } = useUsername(post?.data?.creator_details);

  if (error) {
    return <Error statusCode={404} />;
  }
  
  return (
    <GridLayout className="pt-16">
      {!post && isLoading
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
                {post?.data?.content?.data?.cover && (
                  <div className="relative aspect-[5/2] md:aspect-[3/1] overflow-hidden">
                    <Image src={post?.data?.content?.data?.cover} alt="cover" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                )}

                {/* header */}
                <div className="flex flex-col md:flex-row justify-between items-start px-4 md:px-6 -mt-16 md:mt-12">
                  <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6">
                    <div className="logo shrink-0 relative aspect-square w-24 rounded-md md:rounded-lg overflow-hidden">

                      <ProjectLogo className="w-full h-full" logo={post?.data?.content?.data?.logo} size="100" />
                    </div>
                    <div className="px-4 md:px-0">
                      <div className="text-center md:text-left text-black">
                        <div className="text-xs font-medium tracking-wider uppercase mb-2">Status</div>
                        <h1 className="text-2xl mb-2">{post?.data?.content?.title}</h1>
                        <div className="content space-y-6 text-sm break-words">
                          {post?.data?.content?.body}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 mx-auto mt-4 md:mx-0 md:ml-4">
                    <ButtonReaction creator={post?.data?.creator || ''} stream_id={post?.data?.stream_id || ''} count_downvotes={post?.data?.count_downvotes || 0} count_likes={post?.data?.count_haha || 0} />
                  </div>
                </div>

                {/* section label */}
                <div className="font-medium leading-6 text-black border-b border-gray-200 px-4 pb-2 md:px-6 mt-4 md:mt-12">Details</div>

                {/* tags */}
                <div className="tag-chips flex flex-wrap items-center gap-3 px-4 md:px-6 mt-6">
                  {post?.data?.content?.tags?.map(({ title, slug }) => (
                    <Link key={slug} href={`/list/${slug}`}>
                      <span className="bg-indigo-100 border border-indigo-300 hover:bg-indigo-200 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-indigo-800 dark:hover:bg-indigo-300">
                        {title}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* about */}
                <div className="about prose-sm max-w-none text-black px-4 md:px-6 mt-4">
                  <Markdown source={post?.data?.content?.data?.description_long} />
                </div>

                {/* section label */}
                <div className="font-medium leading-6 text-black border-b border-gray-200 px-4 pb-2 md:px-6 mt-12">Links</div>

                {/* links */}
                <div className="links flex flex-col md:flex-row md:gap-20 px-4 md:px-6 my-6">
                  <div className="official-sites md:w-1/3">
                    <Link href={post?.data?.content?.data?.website || '#'} className="group flex items-center gap-1 text-sm text-sky-600 hover:underline">
                      <span>Website</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={post?.data?.content?.data?.whitepaper || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Whitepaper / Litepaper</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={'https://github.com/'+post?.data?.content?.data?.github || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Github</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={'https://gitcoin.com/'+post?.data?.content?.data?.gitcoin || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Gitcoin</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                  </div>
                  <div className="socials md:w-1/3 mt-4 md:mt-0">
                    <Link href={'https://discord.com/'+post?.data?.content?.data?.discord || '#'} className="group flex items-center gap-1 text-sm text-sky-600 hover:underline">
                      <span>Discord</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={'https://twitter.com/'+post?.data?.content?.data?.twitter || '#'} className="group flex items-center gap-1 mt-4 text-sm text-sky-600 hover:underline">
                      <span>Twitter</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                  </div>
                </div>
              </Card>
              <Card className="mt-4">
                {/* comments */}
                {post && (
                <Comments
                  context={process.env.PROJECT_CONTEXT || ''}
                  post={post?.data}
                />
                )}
              </Card>
            </GridItemEight>
            <GridItemFour>
              <Card padded className="md:sticky top-[154px]">
                <div className="flex items-center justify-center gap-2">
                  <AvatarUser
                    details={post?.data?.creator_details}
                    size="32"
                  />
                  <div>{username}</div>
                </div>
              </Card>
            </GridItemFour>
          </>
          )}
    </GridLayout>
  );
};

export default Project;
