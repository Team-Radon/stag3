/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useOrbis } from '../orbis/useOrbis';
import { MarkdownEditor } from './MarkdownEditor';
import { Button } from './UI/Button';
import Card from './UI/Card';
import { Form } from './UI/Form';
import { Input } from './UI/Input';
import { MultiSelect, MultiTag } from './UI/MultiSelect';

interface DiscussionInput {
  body: string
  title: string
  tags: MultiTag
}

export const AddDiscussion = () => {
  const orbis = useOrbis();

  const form = useForm<DiscussionInput>({
    defaultValues: {
      body: 'What is your project about?',
      title: 'Best Project Ever',
      tags: [{ title: 'Defi', slug: 'defi' }]
    }
  });

  const onSubmit: SubmitHandler<DiscussionInput> = async (project) => {
    const res = await orbis.createPost({
      title: project.title,
      body: project.body,
      context: process.env.DISCUSSION_CONTEXT,
      tags: project.tags
    });

    if (res.status === 300) {
      console.log(res);
    }

    if (res.status === 200) {
      console.log(res);
      toast.success('saved');
    }
  }

  const body = form.watch('body')

  return (
    <Card>
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-8">
          <div className="details">
            <h3 className="text-lg font-medium leading-6 text-gray-900">New discussion</h3>
            <p className="mt-1 text-sm text-gray-500">Amet commodo proident ex reprehenderit deserunt do</p>
            <div className="inputs flex flex-col gap-4 my-6">
              <Input label="Title" {...form.register('title')} />
              <MarkdownEditor
                label="Text"
                {...form.register('body')}
                imageUploaded={(injectedBody) => form.setValue('body', injectedBody)}
                count={body.length}
              />
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
                  initialSelected={[]} />
              </div>
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
