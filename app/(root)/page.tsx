import CategorySection from '@/components/sections/home/CategorySection';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#F0F2F5] to-[#F0F2F5] max-lg:p-3">
        <div className="container-md flex max-w-2xl flex-col gap-8 py-12 lg:py-24">
          <h1 className="dsp2">Learn with expert anytime anywhere</h1>
          <p className="text-2xl text-gray-700">
            Our mision is to help people to find the best course online and
            learn with expert anytime, anywhere.
          </p>
          <Link
            href={'/auth/sign-up'}
            className={cn(buttonVariants(), 'w-fit')}
          >
            Create Account
          </Link>
        </div>
      </div>

      <CategorySection />
    </>
  );
}
