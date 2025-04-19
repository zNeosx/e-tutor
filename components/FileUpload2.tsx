import { env } from '@/env';
import { toast } from '@/hooks/use-toast';
import { authenticator, cn } from '@/lib/utils';
import { UploadSimple } from '@phosphor-icons/react';
import { IKImage, IKUpload, ImageKitProvider } from 'imagekitio-next';
import {
  IKUploadResponse,
  UploadError,
} from 'imagekitio-next/dist/types/components/IKUpload/props';
import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';

interface Props {
  type: 'image' | 'video';
  accept: string;
  folder: string;
  onFileChange: (filePath: string) => void;
  value?: string;
  containerClassName?: string;
  filePreviewWidth?: number;
  filePreviewHeight?: number;
  fileDescription?: React.ReactNode;
}

const FileUpload2 = memo(
  ({
    type,
    accept,
    folder,
    onFileChange,
    value,
    containerClassName,
    filePreviewWidth = 228,
    filePreviewHeight = 160,
    fileDescription,
  }: Props) => {
    const ikUploadRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<{ filePath: string | undefined }>({
      filePath: value ?? undefined,
    });
    // const [progress, setProgress] = useState(0);

    // Mémoriser les fonctions de callback pour éviter les re-rendus inutiles
    const onError = useCallback(
      (error: UploadError) => {
        console.log('error', error);
        toast({
          title: `${type} upload failed`,
          description: `Your ${type} could not be uploaded. Please try again.`,
          variant: 'destructive',
        });
      },
      [type]
    );

    const onSuccess = useCallback(
      (res: IKUploadResponse) => {
        setFile(res);
        onFileChange(res.filePath);

        toast({
          title: `${type} uploaded successfully`,
          description: `${res.filePath} uploaded successfully!`,
        });
      },
      [onFileChange, type]
    );

    const onValidate = useCallback(
      (file: File) => {
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
      },
      [type]
    );

    // Mémoriser la fonction de clic pour éviter les re-rendus inutiles
    const handleUploadClick = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      if (ikUploadRef.current) {
        ikUploadRef.current?.click();
      }
    }, []);

    return (
      <ImageKitProvider
        publicKey={env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <div
          className={cn(
            'h-full w-max flex items-start gap-6',
            containerClassName
          )}
        >
          <IKUpload
            className="hidden"
            ref={ikUploadRef}
            onError={onError}
            onSuccess={onSuccess}
            validateFile={onValidate}
            // onUploadStart={() => setProgress(0)}
            // onUploadProgress={({ loaded, total }) => {
            //   const percent = Math.round((loaded / total) * 100);

            //   setProgress(percent);
            // }}
            folder={`${env.NEXT_PUBLIC_IMAGEKIT_APP_FOLDER}/${folder}`}
            accept={accept}
          />
          <div
            className={cn(
              'relative mx-auto flex items-center justify-center',
              file.filePath ? '' : 'bg-gray-100'
            )}
            style={{
              width: `${filePreviewWidth}px`,
              height: `${filePreviewHeight}px`,
            }}
          >
            {file.filePath ? (
              <IKImage
                alt={file.filePath ?? ''}
                path={file.filePath}
                width={filePreviewWidth}
                height={filePreviewHeight}
                className="object-cover"
              />
            ) : type === 'image' ? (
              <Image
                src="/images/image-preview.svg"
                alt="image"
                width={124}
                height={124}
              />
            ) : (
              // </div>
              <Image
                src="/images/video-preview.svg"
                alt="video"
                width={124}
                height={124}
              />
            )}
          </div>
          {/* {progress > 0 && progress !== 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div
              className="rounded-full bg-green-800 p-0.5 text-center text-[8px] font-bold leading-none text-primary-100"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )} */}
          <div className="relative flex flex-col gap-6">
            {fileDescription}
            <button
              type="button"
              className="flex w-fit items-center gap-3 bg-primary-100 px-6 py-3 font-semibold text-primary"
              onClick={handleUploadClick}
            >
              {type === 'image' ? 'Upload Photo' : 'Upload Video'}
              <UploadSimple size={24} />
            </button>
          </div>
        </div>
      </ImageKitProvider>
    );
  }
);

// Ajouter un displayName pour faciliter le débogage
FileUpload2.displayName = 'FileUpload2';

export default FileUpload2;
