import { getSavedJobs } from "../api/apijobs";
import JobCard from "../components/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return (
      <BarLoader className="mt-4" width={"100%"} color="grey" height={"1px"} />
    );
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 w-full">
          {savedJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedJobs?.map((saved) => (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-3xl flex justify-center items-center h-[50vh]  shadow-md shadow-blue-500 rounded-lg animate-shake">
             <span> No Saved Jobs</span>  <span className="ml-2 p-2 hover:animate-shake shadow-md shadow-blue-500 rounded-full hover:shadow-red-500">👀</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
