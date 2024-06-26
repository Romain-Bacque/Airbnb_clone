"use client";

import { FC, useCallback } from "react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal: FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
  }); // Add default values for name, email, and password

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      toast.success("Account created successfully. Please log in.");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLoginModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

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
          type="email"
          errors={errors}
          register={register} // register first arg is the id of the input field
          required
        />
        <Input
          id="name"
          label="Name"
          errors={errors}
          register={register} // register first arg is the id of the input field
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          errors={errors}
          register={register} // register first arg is the id of the input field
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
        onClick={() => signIn("google")}
      />
      <Button
        disabled={isLoading}
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => signIn("github")}
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
            onClick={handleToggleLoginModal}
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
