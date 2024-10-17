import React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/useFetch";
import { applyToJob } from "../api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be Atleast 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),

  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word Documents are allowed" }
    ),
});

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className=" mt-5 shadow-md shadow-blue-500 hover:transition-all ease-in delay-120 opacity-90 hover:opacity-100 hover:-translate-y-1 hover:scale-100 hover:shadow-lg hover:shadow-blue-500"
          variant={job?.isOpen && !applied ? "primary" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col justify-evenly items-center w-[100%] min-w-full gap-5">
          <DrawerTitle className="flex flex-col justify-center items-center gap-5">
            Apply for {job?.title} at {job?.company?.name}{" "}
            <span>
              {" "}
              <img src={job?.company?.logo_url} alt="" width={"50px"} />
            </span>
          </DrawerTitle>
          <DrawerDescription>Please Fill the Form Below</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 pb-0 p-4"
        >
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1 "
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-600">{errors.experience.message}</p>
          )}
          <Input
            type="text"
            placeholder="Skills (add comma)"
            className="flex-1 "
            {...register("skills", {})}
          />
          {errors.skills && (
            <p className="text-red-600">{errors.skills.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="Intermediate" />
                  <Label htmlFor="option-one">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="Graduate" />
                  <Label htmlFor="option-two">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post-Graduate" id="Post-Graduate" />
                  <Label htmlFor="option-two">Post-Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-600">{errors.education.message}</p>
          )}
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="flex-1 file:text-green-500 "
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-600">{errors.resume.message}</p>
          )}

          {errorApply?.message && (
            <p className="text-red-600">{errorApply?.message}</p>
          )}
          {loadingApply && (
            <BarLoader
              className="mt-4"
              width={"100%"}
              color="grey"
              height={"1px"}
            />
          )}
          <Button
            variant="primary"
            className="mt-5 text-white hover:text-green-500 shadow-md shadow-blue-500 hover:transition-all ease-in delay-120 opacity-90 hover:opacity-100 hover:-translate-y-1 hover:scale-100 hover:shadow-lg hover:shadow-green-500"
          >
            Submit
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="primary"
              className="mt-5 hover:text-red-500 shadow-md shadow-red-500 hover:transition-all ease-in delay-120 opacity-90 hover:opacity-100 hover:-translate-y-1 hover:scale-100 hover:shadow-lg hover:shadow-red-500"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
