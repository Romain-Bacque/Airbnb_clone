"use client";

import { FC, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

// declare global {
//   var cloudinary: any;
// }

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (file: any) => {
      onChange(file.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        uploadPreset="uyblpzx4"
        onSuccess={handleUpload}
        options={{ maxFiles: 1 }}
      >
        {/* The open prop is a function that opens the upload widget when called */}
        {/* it's look like something like this in the CldUploadWidget component:   const open = () => {
                                                                      console.log("Opening upload dialog...");
                                                                    };

                                                                    return <>{children({ open })}</>;
                                                                    }; */}
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-20
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                te6xt-neutral-600
            "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
              {value && (
                // inset-0 is used to position the element at the top, right, bottom, and left of the parent element (basically, it's like using top: 0; right: 0; bottom: 0; left: 0; in CSS)')
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={value}
                    fill // fill is used to make sure the image fills the container
                    objectFit="cover" // objectFit="cover" is used to make sure the image covers the container (the image doesn't get stretched)
                    alt="Uploaded image"
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
