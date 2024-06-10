"use client";

import { FC } from "react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const RegisterModal: FC = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  }); // Add default values for name, email, and password

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = // Add body content
    (
      <div className="flex flex-col gap-4">
        <Heading
          center
          title="Wecome to Airbnb"
          subtitle="Create an account!"
        />
        <Input
          id="email"
          label="Email"
          errors={errors}
          register={register}
          required
        />
        <Input
          id="name"
          label="Name"
          errors={errors}
          register={register}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          errors={errors}
          register={register}
          required
        />
      </div>
    );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr /> {/* Add horizontal line */}
      <Button
        disabled={isLoading}
        label="Continue with Google"
        icon={FcGoogle}
        outline
        onClick={() => {}}
      />
      <Button
        disabled={isLoading}
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => {}}
      />
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account?</div>
          <button
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
