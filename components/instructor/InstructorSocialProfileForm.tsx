'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import {
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  WhatsappLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { SocialLinks, User } from '@prisma/client';
import InputWithIcon from '../ui/input-with-icon';
import { updateUserSocialLinks } from '@/lib/actions/user.action';

const socialProfileSchema = z.object({
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  whatsapp: z.string().optional(),
  youtube: z.string().optional(),
});

const InstructorSocialProfileForm = ({
  user,
}: {
  user: User & { socialLinks: SocialLinks | null };
}) => {
  const form = useForm<z.infer<typeof socialProfileSchema>>({
    resolver: zodResolver(socialProfileSchema),
    defaultValues: {
      website: user.socialLinks?.website ?? '',
      facebook: user.socialLinks?.facebook ?? '',
      instagram: user.socialLinks?.instagram ?? '',
      linkedin: user.socialLinks?.linkedin ?? '',
      twitter: user.socialLinks?.twitter ?? '',
      whatsapp: user.socialLinks?.whatsapp ?? '',
      youtube: user.socialLinks?.youtube ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof socialProfileSchema>) {
    try {
      await updateUserSocialLinks({
        id: user.id,
        data: values,
      });

      toast({
        title: 'Success',
        description: 'Social profiles updated successfully',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update social profiles',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="form-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h4 className="mb-6">Social Profiles</h4>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="body-m-400">Personal Website</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      icon={<Globe className="size-5 text-primary" />}
                      placeholder="Personal website or portfolio url..."
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">Facebook</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={<FacebookLogo className="size-5 text-primary" />}
                        placeholder="Facebook profile url..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">Instagram</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={<InstagramLogo className="size-5 text-primary" />}
                        placeholder="Instagram profile url..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">LinkedIn</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={<LinkedinLogo className="size-5 text-primary" />}
                        placeholder="LinkedIn profile url..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">Twitter</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={<TwitterLogo className="size-5 text-primary" />}
                        placeholder="Twitter profile url..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">WhatsApp</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={<WhatsappLogo className="size-5 text-primary" />}
                        placeholder="WhatsApp url..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="body-m-400">YouTube</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        icon={<YoutubeLogo className="size-5 text-primary" />}
                        placeholder="YouTube channel url..."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InstructorSocialProfileForm;
