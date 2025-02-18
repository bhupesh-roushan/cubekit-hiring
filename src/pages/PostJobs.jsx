import { getCompanies } from "../api/apiCompanies";
import { addNewJob } from "../api/apijobs";
import AddCompanyDrawer from "../components/AddCompanyDrawer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  description: z.string().min(1, { message: "Description is Required" }), // use lowercase "d"
  location: z.string().min(1, { message: "Location is Required" }),
  company_id: z.string().min(1, { message: "Select or Add a New Company" }),
  requirements: z.string().min(1, { message: "Requirements are Required" }),
});

const PostJobs = () => {
  const { isLoaded, user } = useUser();
  const Navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) Navigate("/jobs");
  }, [loadingCreateJob]);

  if (!isLoaded || loadingCompanies) {
    return (
      <BarLoader className="mt-4" width={"100%"} color="grey" height={"1px"} />
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="mb-5">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post Job
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input
          className="shadow-md shadow-blue-900 hover:shadow-blue-700 mb-2"
          placeholder="Job Title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <Textarea
          className="shadow-md shadow-blue-900 hover:shadow-blue-700 outline-none mb-2"
          placeholder="Job Description"
          {...register("description")} // matches schema
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center mt-2 mb-2">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm font-normal shadow-md shadow-blue-900 hover:shadow-blue-700 text-white">
                  <SelectValue placeholder="Filter By Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm font-normal shadow-md shadow-blue-900 hover:shadow-blue-700 text-white">
                  <SelectValue placeholder="Filter By Company">
                    {field.value
                      ? companies.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={name} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Company Drawer  */}

          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}

        <Controller
          name="requirements" // should match the schema
          control={control}
          render={({ field }) => (
            <MDEditor
              className="shadow-md shadow-blue-900 hover:shadow-blue-700"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}

        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}

        {loadingCreateJob && (
          <BarLoader
            className="mt-4"
            width={"100%"}
            color="grey"
            height={"1px"}
          />
        )}

        <Button
          variant="primary"
          className="mt-2 hover:text-green-500 shadow-md shadow-green-500 hover:transition-all ease-in delay-100 opacity-90 hover:opacity-100 hover:-translate-y-1 hover:scale-100 hover:shadow-lg hover:shadow-green-500"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJobs;
