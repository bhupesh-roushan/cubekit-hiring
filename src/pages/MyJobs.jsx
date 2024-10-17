import CreatedApplications from "../components/CreatedApplications";
import CreatedJobs from "../components/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <BarLoader className="mt-4" width={"100%"} color="grey" height={"1px"} />
    );
  }
  return (
    <div className="mb-10 mt-5">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Posted Jobs"}
      </h1>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
