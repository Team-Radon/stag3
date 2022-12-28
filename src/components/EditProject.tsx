/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
import { LOGO_PLACEHOLDER } from '@/constants';
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
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ProjectInput> = async (project) => {
    setLoading(true);
    const res = await orbis.editPost(post.stream_id, {
      title: project.title,
      body: project.body,
      context: process.env.PROJECT_CONTEXT,
      tags: project.tags,
      data: {
        logo: project.logo || LOGO_PLACEHOLDER,
        cover: project.cover || LOGO_PLACEHOLDER,
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
      setLoading(false);
      toast.error(JSON.stringify(res));
    }

    if (res.status === 200) {
      setLoading(false);
      toast.success('Updated');
    }
  }
  const [initialValue, setInitialValue] = useState<ProjectInput>();

  useEffect(() => {
    if (post?.stream_id?.length) {
      const projectData = post?.content?.data;
      const editValue = {
        body: post?.content?.body || '',
        title: post?.content?.title || '',
        tags: post?.content?.tags || [{ title: 'Defi', slug: 'defi' }],
        logo: projectData?.logo?.length ? projectData?.logo : undefined,
        cover: projectData?.cover || undefined,
        description_long: projectData?.description_long || '',
        website: projectData?.website || '',
        whitepaper: projectData?.whitepaper || '',
        status: projectData?.status || { title: 'Idea and Concept', slug: 'ideas' },
        twitter: projectData?.twitter || '',
        github: projectData?.github || '',
        gitcoin: projectData?.gitcoin || '',
        discord: projectData?.discord || ''
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
        loading={loading}
      />
      )}
    </Card>
  );
}
