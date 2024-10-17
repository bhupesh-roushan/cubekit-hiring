import { getMyJobs } from "../api/apijobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";

const CreatedJobs = () => {
  const { user } = useUser();
  const [jobList, setJobList] = useState([]); // Store job list in local state

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, []);

  useEffect(() => {
    if (createdJobs !== undefined) {
      setJobList(createdJobs); // Update local jobList state when new jobs are fetched
    }
  }, [createdJobs]);

  const handleJobDeleted = (deletedJobId) => {
    // Filter out the deleted job from the job list
    setJobList((prevJobs) => prevJobs.filter((job) => job.id !== deletedJobId));
    // you can refetch the list from the server if needed:
    fnCreatedJobs();
  };

  if (loadingCreatedJobs) {
    return (
      <BarLoader className="mt-4" width={"100%"} color="grey" height={"1px"} />
    );
  }

  return (
    <div>
      {loadingCreatedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-90">
          {jobList?.length ? (
            jobList.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobSaved={fnCreatedJobs}
                  onJobDeleted={handleJobDeleted} // Pass handleJobDeleted to JobCard
                  isMyJob
                />
              );
            })
          ) : (
            <div className="text-md">No Jobs Found 💔</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
