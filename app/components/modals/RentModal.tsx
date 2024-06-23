"use client";

import { FC, useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal: FC = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(Steps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      description: "",
      title: "",
      price: 1,
    },
  });

  // watch is used to watch the value of a field in the form and update the UI accordingly (re-render the component when the value changes)
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  // useMemo is used to memoize the value of a variable (store the value of a variable so that it is not re-calculated every time the component re-renders)
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }), // this line is used to import the Map component dynamically (only when it is needed) and disable server-side rendering because the Map component uses the window object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location] // the Map depends on the location variable (if the location changes, the Map component should be re-rendered)
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onNext = () => {
    setStep((prev) => prev + 1);
  };
  const onSubmit = (value: FieldValues) => {
    if (step !== Steps.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", value) // by default, headers are set to 'Content-Type': 'application/json'
      .then(() => {
        toast.success("Listing created successfully!");
        rentModal.onClose();
        reset(); // reset the form after the listing is created successfully to clear the form fields
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === Steps.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.CATEGORY) {
      return "Close";
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          // col-span-1 is used to specify the number of columns the element should span (1 column in this case)
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === Steps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tell us more about your place"
          subtitle="What amenities do you have?"
        />
        <hr />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow"
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have"
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have"
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
        />
      </div>
    );
  }

  if (step === Steps.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === Steps.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === Steps.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
