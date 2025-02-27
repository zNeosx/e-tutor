import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const BecomeAnInstructorHero = () => {
  return (
    <section className="flex items-center justify-center overflow-hidden px-3 pt-10 sm:px-8">
      <div className="grid grid-rows-2 items-center justify-center gap-6 lg:grid-cols-bai-hero lg:grid-rows-bai-hero">
        <div>
          <h3 className="dsp3 mb-8 text-gray-900">Become an Instuctor</h3>
          <p className="mb-10 text-2xl text-gray-700">
            Become an instructor & start teaching with 26k certified
            instructors. Create a success story with 67.1k Students — Grow
            yourself with 71 countries.
          </p>
          <Link
            href={{
              pathname: '/auth/sign-up',
              query: { role: 'instructor' },
            }}
            className={cn(
              buttonVariants({
                size: 'lg',
              })
            )}
          >
            Get Started
          </Link>
        </div>
        <div className="relative mx-auto size-full md:size-96 lg:size-full">
          <Image
            src={'/images/become-an-instructor-girl.png'}
            alt="Illustration of an instructor girl"
            width={648}
            height={648}
            className="object-cover lg:absolute lg:-bottom-14 lg:left-0"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeAnInstructorHero;
