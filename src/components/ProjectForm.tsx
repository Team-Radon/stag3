/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Project } from '@/helpers/interfaces';
import { ReactNode, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputUploadCover } from './InputUploadCover';
import { InputUploadLogo } from './InputUploadLogo';
import { MarkdownEditor } from './MarkdownEditor';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Input } from './UI/Input';
import { MultiSelect, MultiTag } from './UI/MultiSelect';
import { SingleSelect, SingleTag } from './UI/SingleSelect';

export interface ProjectInput {
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

export const ProjectForm = ({
  label,
  initialValue,
  parent,
  focus = true,
  handleSubmit,
  handleCancel,
  loading
}: {
  label: string | ReactNode
  initialValue: ProjectInput
  parent: Project
  focus?: boolean
  handleSubmit: (project: ProjectInput) => void
  handleCancel?: () => void
  loading: boolean
}) => {
  const form = useForm<ProjectInput>({
    defaultValues: {
      body: initialValue.body,
      title: initialValue.title,
      tags: initialValue.tags,
      logo: initialValue.logo,
      cover: initialValue.cover,
      description_long: initialValue.description_long,
      website: initialValue.website,
      whitepaper: initialValue.whitepaper,
      status: initialValue.status,
      twitter: initialValue.twitter,
      github: initialValue.github,
      gitcoin: initialValue.gitcoin,
      discord: initialValue.discord
    }
  });

  useEffect(() => {
    if (focus) {
      form.setFocus('title');
    }
  }, [form, focus])

  const onSubmit: SubmitHandler<ProjectInput> = async (data) => {
    handleSubmit(data);
  };

  const logo = form.watch('logo')
  const cover = form.watch('cover')
  const description_long = form.watch('description_long')

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-8">
        <div className="details">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {label}
            {' '}
            Project Info
          </h3>
          <p className="mt-1 text-sm text-gray-500">Amet commodo proident ex reprehenderit deserunt do</p>
          <div className="inputs flex flex-col gap-4 my-6">
            <div className="logo">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-2">
                <InputUploadLogo logo={logo} {...form.register('logo')} imageUploaded={(url) => form.setValue('logo', url)} />
              </div>
            </div>
            <InputUploadCover cover={cover} {...form.register('cover')} imageUploaded={(url) => form.setValue('cover', url)} />
            <Input label="Project name" {...form.register('title', { required: true })} placeholder="Best Project Ever" />
            <Input label="Summary" {...form.register('body', { required: true })} placeholder="What is your project about?" />
            <MarkdownEditor
              label="Description"
              {...form.register('description_long', { required: true })}
              imageUploaded={(body) => form.setValue('description_long', body)}
              count={description_long?.length || 0}
              placeholder="Describe your project in detail"
            />

            <div className="flex flex-col gap-4 md:w-3/5">
              <Input label="Website" {...form.register('website')} placeholder="https://example.com/" />
              <Input label="Whitepaper / Litepaper" {...form.register('whitepaper')} placeholder="https://example.com/whitepaper" />
              <Input label="Team Members" />
              <div className="status">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <SingleSelect
                  className="mt-2"
                  closeMenuOnSelect
                  setSelect={(selectedStatus) => {
                    form.setValue('status', selectedStatus);
                  }}
                />
              </div>
              <div className="tags">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <MultiSelect
                  className="mt-2"
                  closeMenuOnSelect={false}
                  setSelect={(selectedTag) => {
                    form.setValue('tags', selectedTag);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="socials pt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Social Links</h3>
          <p className="mt-1 text-sm text-gray-500">Amet commodo proident ex reprehenderit deserunt do</p>
          <div className="flex flex-col gap-4 my-6 md:w-3/5">
            <Input label="Twitter" {...form.register('twitter')} placeholder="stag3_orbis" />
            <Input
              label="Github"
              {...form.register('github')}
              placeholder="stag3_orbis"
            />
            <Input label="Gitcoin" {...form.register('gitcoin')} placeholder="stag3_orbis" />
            <Input label="Discord" {...form.register('discord')} placeholder="stag3#1234" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          loading={loading}
          primary
          type="submit"
          disabled={!form.formState.isDirty}
          className="disabled:opacity-70"
        >
          {loading ? 'Saving' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};
