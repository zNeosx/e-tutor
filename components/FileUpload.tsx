import { env } from '@/env';
import { toast } from '@/hooks/use-toast';
import { authenticator, cn } from '@/lib/utils';
import { UploadSimple } from '@phosphor-icons/react';
import { IKImage, IKUpload, ImageKitProvider } from 'imagekitio-next';
import {
  IKUploadResponse,
  UploadError,
} from 'imagekitio-next/dist/types/components/IKUpload/props';
import { useRef, useState } from 'react';

interface Props {
  type: 'image' | 'video';
  accept: string;
  folder: string;
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({ type, accept, folder, onFileChange, value }: Props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string | undefined }>({
    filePath: value ?? undefined,
  });
  const [progress, setProgress] = useState(0);

  const onError = (error: UploadError) => {
    console.log('error', error);
    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: 'destructive',
    });
  };

  const onSuccess = (res: IKUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 1 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file less than 1MB.',
          variant: 'destructive',
        });

        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file less than 50MB.',
          variant: 'destructive',
        });

        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <div className="h-full w-max border border-gray-100 p-3 md:p-6 xl:p-11">
        <IKUpload
          className="hidden"
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          validateFile={onValidate}
          onUploadStart={() => setProgress(0)}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);

            setProgress(percent);
          }}
          folder={`${env.NEXT_PUBLIC_IMAGEKIT_APP_FOLDER}/${folder}`}
          accept={accept}
        />
        <div
          className={cn(
            'relative size-[280px] mx-auto',
            file.filePath ? '' : 'bg-gray-200'
          )}
        >
          {file ? (
            <IKImage
              alt={file.filePath ?? ''}
              path={file.filePath}
              width={280}
              height={280}
              className="object-cover"
            />
          ) : null}
          <button
            type="button"
            className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-black/50 py-4 text-white"
            onClick={(e) => {
              e.preventDefault();

              if (ikUploadRef.current) {
                ikUploadRef.current?.click();
              }
            }}
          >
            <UploadSimple size={24} />
            Upload Photo
          </button>
        </div>
        {progress > 0 && progress !== 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div
              className="rounded-full bg-green-800 p-0.5 text-center text-[8px] font-bold leading-none text-primary-100"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
        {type === 'image' ? (
          <p className="mt-6 max-w-[280px] text-center text-sm text-gray-500">
            Image size should be under 1MB and image ration needs to be 1:1
          </p>
        ) : null}
      </div>
    </ImageKitProvider>
  );
};

export default FileUpload;
