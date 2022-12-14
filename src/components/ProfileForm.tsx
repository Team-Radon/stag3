import { User } from '@/helpers/interfaces';
import { useOrbis } from '@/orbis/useOrbis';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { InputUploadAvatar } from './InputUploadAvatar';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Input } from './UI/Input';
import { Textarea } from './UI/Textarea';

interface ProfileInput {
  username: string
  description: string
  pfp: string
}

export const ProfileForm = ({ profile }: { profile: User }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const orbis = useOrbis();
  const form = useForm<ProfileInput>({
    defaultValues: {
      username: profile?.username || '',
      description: profile?.details.profile?.description || '',
      pfp: profile?.details.profile?.pfp || ''
    }
  });

  const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
    setLoading(true);

    const res = await orbis.updateProfile({
      username: data.username,
      description: data.description,
      pfp: data.pfp
    });

    setLoading(false);

    if (res.status === 300) {
      toast.error('Error creating post');
      return;
    }

    if (res.status === 200) {
      toast.success('Saved');
    }
  };

  const pfp = form.watch('pfp');

  return (
    <Form className="!space-y-0" form={form} onSubmit={onSubmit}>
      <div className="space-y-2 p-4">
        <div className="flex justify-center">
          <InputUploadAvatar
            details={{ ...profile?.details, pfp }}
            imageUploaded={(url) => {
              form.setValue('pfp', url);
            }}
            {...form.register('pfp')}
          />
        </div>
        <Input
          label="Display name"
          type="text"
          placeholder="Enter name"
          {...form.register('username')}
        />
        <div>
          <Textarea
            label="Bio"
            placeholder="Tell your story"
            className="s-input !rounded-3xl"
            {...form.register('description')}
          />
        </div>
      </div>
      <div className="p-4">
        <Button loading={loading} className="w-full" primary>
          Save
        </Button>
      </div>
    </Form>
  );
};
