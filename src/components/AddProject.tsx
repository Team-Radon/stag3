/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LOGO_PLACEHOLDER } from '@/constants';
import { Project } from '@/helpers/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useOrbis } from '../orbis/useOrbis';
import { ProjectForm } from './ProjectForm';

import Card from './UI/Card';
import { MultiTag } from './UI/MultiSelect';
import { SingleTag } from './UI/SingleSelect';

interface ProjectInput {
  body: string
  title: string
  tags: MultiTag
  status?: SingleTag
  logo: string | undefined
  cover: string | undefined
  description_long: string
  whitepaper: string
  website: string
  twitter: string
  github: string
  gitcoin: string
  discord: string
}

export const AddProject = () => {
  const orbis = useOrbis();
  const onSubmit: SubmitHandler<ProjectInput> = async (project) => {
    const res = await orbis.createPost({
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
      toast.success('saved');
    }
  }

  const initialValue = {
    body: '',
    title: '',
    tags: [{ title: 'Defi', slug: 'defi' }],
    logo: LOGO_PLACEHOLDER,
    cover: undefined,
    description_long: '',
    website: '',
    whitepaper: '',
    status: { title: 'Idea and Concept', slug: 'ideas' },
    twitter: '',
    github: '',
    gitcoin: '',
    discord: ''
  }

  return (
    <Card padded>
      <ProjectForm
        label="Add"
        initialValue={initialValue as ProjectInput}
        parent={{} as Project}
        handleSubmit={onSubmit}
      />
    </Card>
  );
}
