/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
import { Project } from '@/helpers/interfaces';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useOrbis } from '../orbis/useOrbis';

import { ProjectForm, ProjectInput } from './ProjectForm';
import Card from './UI/Card';

interface Props {
  post: Project
}

export const EditProject = ({ post }: Props) => {
  const orbis = useOrbis();
  const onSubmit: SubmitHandler<ProjectInput> = async (project) => {
    const res = await orbis.editPost(post.stream_id, {
      title: project.title,
      body: project.body,
      context: process.env.PROJECT_CONTEXT,
      tags: project.tags,
      data: {
        logo: project.logo || '',
        cover: project.cover || '',
        description_long: project.description_long || '',
        status: project.status || '',
        whitepaper: project.whitepaper || '',
        website: project.website || '',
        twitter: project.twitter || '',
        github: project.github || '',
        gitcoin: project.gitcoin || '',
        discord: project.discord || ''
      }
    });

    if (res.status === 300) {
      toast.error(JSON.stringify(res));
    }

    if (res.status === 200) {
      toast.success('Updated');
    }
  }
  const [initialValue, setInitialValue] = useState<ProjectInput>();

  useEffect(() => {
    if (post?.stream_id.length) {
      const editValue = {
        body: post?.content?.body || '',
        title: post?.content?.title || '',
        tags: post?.content?.tags || [{ title: 'Defi', slug: 'defi' }],
        logo: post?.content?.data?.logo || '',
        cover: post?.content?.data?.cover || '',
        description_long: post?.content?.data?.description_long || '',
        website: post?.content?.data?.website || '',
        whitepaper: post?.content?.data?.whitepaper || '',
        status: post?.content?.data?.status || { title: 'Idea and Concept', slug: 'ideas' },
        twitter: post?.content?.data?.twitter || '',
        github: post?.content?.data?.github || '',
        gitcoin: post?.content?.data?.gitcoin || '',
        discord: post?.content?.data?.discord || ''
      }
      setInitialValue(editValue);
    }
  }, [post])

  return (
    <Card padded>
      {initialValue?.body.length && (
      <ProjectForm
        label="Edit"
        initialValue={initialValue}
        parent={post}
        handleSubmit={onSubmit}
      />
      )}
    </Card>
  );
}
