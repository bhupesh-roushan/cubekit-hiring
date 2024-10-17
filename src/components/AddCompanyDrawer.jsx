/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addNewCompany } from "../api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          type="button"
          size="sm"
          className="md:w-40 sm:w-30 transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-100 hover:bg-white hover:text-black duration-300 opacity-95 hover:opacity-100 hover:shadow-md hover:shadow-green-500"
        >
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>
        <form className="flex gap-2 p-4 pb-0">
          {/* Company Name */}
          <Input
            placeholder="Company name"
            {...register("name")}
            className="g"
          />

          {/* Company Logo */}
          <Input
            type="file"
            accept="image/*"
            className=" file:text-green-500"
            {...register("logo")}
          />

          {/* Add Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="md:w-40 sm:w-30 transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-100 hover:bg-white hover:text-black duration-300 opacity-95 hover:opacity-100 hover:shadow-md hover:shadow-green-500"
          >
            Add
          </Button>
        </form>
        <DrawerFooter>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany?.message}</p>
          )}
          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
          <DrawerClose asChild>
            <Button
              type="button"
              variant="secondary"
              className=" mt-5 hover:text-red-500 shadow-md shadow-red-500 hover:transition-all ease-in delay-100 opacity-90 hover:opacity-100 hover:-translate-y-1 hover:scale-100 hover:shadow-lg hover:shadow-red-500"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
