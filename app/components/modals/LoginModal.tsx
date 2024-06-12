"use client";

import { FC, use, useCallback } from "react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal: FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  }); // Add default values for name, email, and password

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in successfully!");
        router.refresh(); // Refresh the page to update the user session and display the authenticated user's data in the UI (e.g., the user's name and profile picture)
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch {}
  };

  const handleToggleRegisterModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = // Add body content
    (
      <div className="flex flex-col gap-4">
        <Heading center title="Wecome back" subtitle="Login to your account!" />
        <Input
          id="email"
          label="Email"
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
        onClick={() => signIn("google")} // Add onClick event handler
      />
      <Button
        disabled={isLoading}
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => signIn("github")} // Add onClick event handler
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
          <div>First time using Airbnb?</div>
          <button
            onClick={handleToggleRegisterModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
