/* eslint-disable no-mixed-operators */
// https://orbis.club/documentation/api-documentation/createPost
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useOrbis } from '../orbis/useOrbis';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Input } from './UI/Input';
import { MultiSelect } from './UI/MultiSelect';

interface Tag {
  title: string
  slug: string
}
// todo final interface
interface ProjectInput {
  name: string // title
  description: string // content
  category: Tag[] // tag
  summary: string
  whitepaper: string
  team_members: string
  status: string // state of a project
  website: string
  twitter: string
  github: string
  gitcoin: string
  discord: string
  // add for images

}
export const AddProject = () => {
  // use this value in default
  /* const initial = {
    name: '',
    description: '',
    category: [],
    summary: '',
    whitepaper: '',
    team_members: '',
    status: '',
    website: '',
    twitter: '',
    github: '',
    gitcoin: '',
    discord: ''
  } */
  const orbis = useOrbis();
  const form = useForm<ProjectInput>({
    defaultValues: {
      name: 'Perf Protocol Test Data',
      description: 'Perpetual Protocol is an on-chain perpetual futures DEX with deep liquidity and builder-ready composability.',
      category: [{ title: 'Defi', slug: 'defi' }],
      summary: '<p>Hello <del>world</del><ins>World</ins></p',
      whitepaper: '',
      team_members: '',
      status: 'Development',
      website: 'https://perp.com/',
      twitter: 'https://twitter.com/perpprotocol',
      github: 'https://github.com/',
      gitcoin: 'https://gitcoin.co/',
      discord: 'https://discord.com/invite/Dq9mTmCaBb'
    }
  });
  const [tags, setSelectedTag] = useState <any>();

  // const summary = form.watch('summary');
  // const name = form.watch('name');

  const onSubmit: SubmitHandler<ProjectInput> = async (data) => {
    // setLoading(true);
    const { description, summary, whitepaper, team_members, status, website, twitter, gitcoin, github, discord } = data;
    const dataInfo = { description, summary, whitepaper, team_members, status, website, twitter, gitcoin, github, discord }

    //  {label,value} - default to display item in select
    // format {label,value} to {name,url} - tags format
    const formattedTags = tags?.length && tags.map(({ label, value }: { label: string, value: string }) => ({
      name: label,
      url: value
    })) || [];

    const res = await orbis.createPost({
      title: data.name,
      body: data.description,
      context: process.env.PROJECT_CONTEXT,
      tag: formattedTags,
      data: dataInfo
    });

    // setLoading(false);

    if (res.status === 300) {
      console.log(res);
    }

    if (res.status === 200) {
      console.log(res);
      // push(`/${user?.did}/${res.doc}`);
    }
  }

  const inputClass = 'items-center px-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-600 bg-white dark:bg-transparent border border-gray-400 dark:border-[#291f43] focus:border-brand-500 focus:ring-brand-400 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20 outline-none w-full rounded-xl'

  return (
    <div className="mb-5 px-4 md:px-0">

      <h1>Submit a Project</h1>
      <Form form={form} onSubmit={onSubmit}>
        <Input className={inputClass} label="Project name" {...form.register('name')} />
        <Input className={inputClass} label="Description" {...form.register('description')} />
        <Input className={inputClass} label="Summary" {...form.register('summary')} />
        <Input className={inputClass} label="Whitepaper" {...form.register('whitepaper')} />
        <Input className={inputClass} label="Team members" {...form.register('team_members')} />
        <Input className={inputClass} label="Status" {...form.register('status')} />
        <Input className={inputClass} label="Website" {...form.register('website')} />
        <Input className={inputClass} label="Twitter" {...form.register('twitter')} />
        <Input className={inputClass} label="Github" {...form.register('github')} />
        <Input className={inputClass} label="Gitcoin" {...form.register('gitcoin')} />
        <Input className={inputClass} label="Discord" {...form.register('discord')} />

        <MultiSelect className="py-4 rounded-xl" closeMenuOnSelect={false} setSelect={setSelectedTag} />
        {/* <MarkdownEditor
          label="Content"
          {...form.register('content')}
          count={source.length}
        /> */}
      </Form>
      <Button
        className="mb-2 block w-full"
        primary
        type="submit"
        onClick={form.handleSubmit(onSubmit)}
      >
        Publish
      </Button>
    </div>
  );
}
