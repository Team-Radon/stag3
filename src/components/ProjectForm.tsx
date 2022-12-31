/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { validateStampsVerified } from '@/helpers/gitcoinPassportUtils';
import { Project } from '@/helpers/interfaces';
import { useAppStore } from '@/store/useAppStore';
import { ReactNode, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getAddressFromDid } from '@orbisclub/orbis-sdk/utils';
import Link from 'next/link';
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
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // get current login user info
  const user = useAppStore((state) => state.user);
  const { address } = getAddressFromDid(user?.details?.did);

  const readGitCredentials = async () => {
    const requiredVC = ['TwitterFollowerGT100', 'Github', 'Brightid']
    // validate if verified credentials
    setIsVerified(await validateStampsVerified(address, requiredVC));
  }
  useEffect(() => {
    if (address) {
      readGitCredentials();
    }
  }, [address, readGitCredentials]);

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
    form.reset();
  };

  const logo = form.watch('logo')
  const cover = form.watch('cover')
  const description_long = form.watch('description_long')
  const iconCheck = (
    <svg className={isVerified ? 'w-5 h-5 fill-emerald-600' : 'w-5 h-5'} strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-8">
        <div className="details">
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
                  initialSelected={initialValue.status}
                />
              </div>
              <div className="tags">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <MultiSelect
                  className="mt-2"
                  closeMenuOnSelect={false}
                  initialSelected={initialValue.tags}
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
          <p className="mt-1 text-sm text-gray-500">{'Add links to your project\'s social accounts to keep supporters updated'}</p>
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
      Only verified credentials owners can submit project.
      <div className="flex justify-start">
        <Link href="#" title="Twitter followers > 100" className="px-4 py-2 rounded-lg bg-gray-100">
          <div className="flex items-center gap-4">
            <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
              TwitterFollowerGT100
            </div>
            {iconCheck}
          </div>
        </Link>
        or
        <Link href="#" title="Has a GitHub account" className="px-4 py-2 rounded-lg bg-gray-100">
          <div className="flex items-center gap-4">
            <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
              Github
            </div>
            {iconCheck}
          </div>
        </Link>
        or
        <Link href="#" title="Is Human in proof of Humanity" className="px-4 py-2 rounded-lg bg-gray-100">
          <div className="flex items-center gap-4">
            <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
              ProofOfHumanity
            </div>
            {iconCheck}
          </div>
        </Link>
      </div>
      {!isVerified
        ? (
          <div className="flex justify-start">
            <a
              className="flex justify-center items-center mt-4 border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-3 py-2 text-sm space-x-2 rounded-lg"
              href="https://passport.gitcoin.co/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Connect Gitcoin Passport</span>
              <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
          )
        : (
          <a className="flex justify-center items-center mt-4 border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-3 py-2 text-sm space-x-2 rounded-lg" href="https://passport.gitcoin.co/" target="_blank" rel="noreferrer">
            <span>View Stamps</span>
            <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
          ) }

      <div className="flex justify-end">
        <Button
          loading={loading}
          primary
          type="submit"
          disabled={!isVerified || !form.formState.isDirty}
          className="disabled:opacity-70"
        >
          {loading ? 'Saving' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};
