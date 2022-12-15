/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useOrbis } from '../orbis/useOrbis';
import { InputUploadLogo } from './InputUploadLogo';
import { MarkdownEditor } from './MarkdownEditor';
import { Button } from './UI/Button';
import Card from './UI/Card';
import { Form } from './UI/Form';
import { Input } from './UI/Input';
import { MultiSelect, MultiTag } from './UI/MultiSelect';
import { SingleSelect, SingleTag } from './UI/SingleSelect';

interface ProjectInput {
  body: string
  title: string
  tags: MultiTag
  status?: SingleTag
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
      body: 'What is your project about?',
      title: 'Best Project Ever',
      tags: [{ title: 'Defi', slug: 'defi' }],
      logo: undefined,
      description_long: 'What is your project about?',
      website: 'https://example.com/',
      whitepaper: 'https://example.com/whitepaper',
      status: undefined,
      twitter: '@stag3_orbis',
      github: 'stag3_orbis',
      gitcoin: 'stag3_orbis',
      discord: 'stag3#1234'
    }
  });

  const onSubmit: SubmitHandler<ProjectInput> = async (project) => {
    const res = await orbis.createPost({
      title: project.title,
      body: project.body,
      context: process.env.PROJECT_CONTEXT,
      tags: project.tags,
      data: {
        logo: project.logo,
        description_long: project.description_long,
        status: project.status,
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
      toast.success('saved');
    }
  }

  const logo = form.watch('logo')
  const description_long = form.watch('description_long')

  return (
    <Card>
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-8">
          <div className="details">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Project Info</h3>
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
              {/* needs input for cover upload */}
              <div className="cover">
                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <div className="mt-2 flex items-center justify-center aspect-[4/1] rounded-md border-2 border-dashed border-gray-300 p-4">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>
              </div>
              <Input label="Project name" {...form.register('title')} />
              <MarkdownEditor
                label="Description"
                {...form.register('description_long')}
                imageUploaded={(body) => form.setValue('description_long', body)}
                count={description_long.length}
              />

              <div className="flex flex-col gap-4 md:w-3/5">
                <Input label="Website" {...form.register('website')} />
                <Input label="Whitepaper / Litepaper" {...form.register('whitepaper')} />
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
              <Input label="Twitter" {...form.register('twitter')} />
              <Input label="Github" {...form.register('github')} />
              <Input label="Gitcoin" {...form.register('gitcoin')} />
              <Input label="Discord" {...form.register('discord')} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            primary
            type="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
}
