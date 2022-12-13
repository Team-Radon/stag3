/* eslint-disable no-mixed-operators */
import { Tag } from '@/helpers/interfaces';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOrbis } from '../orbis/useOrbis';
import { InputUploadLogo } from './InputUploadLogo';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Input } from './UI/Input';
import { MultiSelect } from './UI/MultiSelect';

interface ProjectInput {
  body: string
  title: string
  tags: Tag[]
  logo: string | undefined
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

  const form = useForm<ProjectInput>({
    defaultValues: {
      body: 'Perpetual Protocol is an on-chain perpetual futures DEX with deep liquidity and builder-ready composability.',
      title: 'Perf Protocol Test Data',
      tags: [{ title: 'Defi', slug: 'defi' }],
      logo: undefined,
      description_long: 'Hello world',
      whitepaper: '',
      website: 'https://perp.com/',
      twitter: 'perpprotocol',
      github: 'perpprotocol',
      gitcoin: 'perpprotocol',
      discord: 'Dq9mTmCaBb'
    }
  });
  // I had hard time fixing the type
  const [tags, setSelectedTag] = useState <any>();

  const onSubmit: SubmitHandler<ProjectInput> = async (project) => {
    //  {label,value} - default to display item in select
    // format {label,value} to {name,url} - tags format
    const formattedTags = tags?.length && tags.map(({ label, value }: { label: string, value: string }) => ({
      title: label,
      slug: value
    })) || [];

    const res = await orbis.createPost({
      title: project.title,
      body: project.body,
      context: process.env.PROJECT_CONTEXT,
      tags: formattedTags,
      data: {
        logo: project.logo,
        description_long: project.description_long,
        whitepaper: project.whitepaper,
        website: project.website,
        twitter: project.twitter,
        github: project.github,
        gitcoin: project.gitcoin,
        discord: project.discord
      }
    });

    if (res.status === 300) {
      console.log(res);
    }

    if (res.status === 200) {
      console.log(res);
    }
  }

  const logo = form.watch('logo')

  return (
    <div className="mb-5 px-4 md:px-0">
      <h1>Submit a Project</h1>

      <Form form={form} onSubmit={onSubmit}>
        <InputUploadLogo logo={logo} {...form.register('logo')} imageUploaded={(url) => form.setValue('logo', url)} />
        <Input label="Project name" {...form.register('title')} />
        <Input label="Description" {...form.register('body')} />
        <Input label="Summary" {...form.register('description_long')} />
        <Input label="Whitepaper" {...form.register('whitepaper')} />
        <Input label="Website" {...form.register('website')} />
        <Input label="Twitter" {...form.register('twitter')} />
        <Input label="Github" {...form.register('github')} />
        <Input label="Gitcoin" {...form.register('gitcoin')} />
        <Input label="Discord" {...form.register('discord')} />
        <MultiSelect closeMenuOnSelect={false} setSelect={setSelectedTag} />
        <Button
          className="mb-2 block w-full mtop-2"
          primary
          type="submit"
        >
          Publish
        </Button>
      </Form>
    </div>
  );
}
