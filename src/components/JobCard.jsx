import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { deleteJob, saveJob } from "@/api/apijobs";
import { PuffLoader } from "react-spinners";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
  onJobDeleted = () => {},
}) {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });

    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) {
      return setSaved(savedJob?.length > 0);
    }
  }, [savedJob]);

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    try {
      await fnDeleteJob();
      onJobDeleted(job.id);
    } catch (error) {
      console.error("Failed to delete the job:", error);
    }
  };

  return (
    <Card className="flex flex-col mb-2 transition-all delay-120 opacity-85 hover:opacity-100 shadow-md hover:shadow-blue-600 hover:translate-y-1 delay-130 ease-in">
      {loadingDeleteJob && (
        <PuffLoader size={40} speedMultiplier={3} color="grey" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={20}
              className="text-white cursor-pointer hover:animate-shake"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
          {job.company && (
            <img src={job.company.logo_url} className="h-10 mb-1 md:mb-0" alt="Company Logo" />
          )}
          <div className="flex items-center gap-1 text-sm text-center md:text-left mt-5 md:mt-0">
            <MapPinIcon size={15} />
            <span>{job.location}</span>
          </div>
        </div>
        <hr />
        <div className="text-sm font-normal text-justify">
          {job.description.substring(0, job.description.indexOf("."))}.
        </div>
      </CardContent>

      <CardFooter>
        <Link
          to={`/job/${job.id}`}
          className="flex flex-row justify-evenly w-full"
        >
          <Button
            variant="blue"
            className="w-full transition ease-in-out delay-120 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-white hover:text-black duration-300 shadow-md hover:shadow-green-500"
          >
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="none"
            className="w-15 group"
            onClick={handleSaveJob}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart
                className="ml-10 transition-all"
                size={25}
                stroke="white"
                fill="red"
              />
            ) : (
              <Heart
                className="ml-10 group-hover:fill-red-500 transition-all"
                size={25}
                stroke="white"
                fill="transparent"
              />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;

