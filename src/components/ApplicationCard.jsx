/* eslint-disable react/prop-types */
import {
  Boxes,
  Briefcase,
  BriefcaseBusiness,
  Download,
  School,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { updateApplicationStatus } from "../api/apiApplications";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card className="shadow-sm shadow-blue-500 mb-5 opacity-85 hover:opacity-100 hover:shadow-green-500 hover:shadow-md transition-all delay-130 ease-in ">
      {loadingHiringStatus && (
        <BarLoader
          className="mt-4"
          width={"100%"}
          color="grey"
          height={"1px"}
        />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold mb-5">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}

          <div
            className="flex transition ease-in-out delay-120 bg-slate-700 hover:-translate-y-1 hover:scale-100 
            hover:shadow-green-500 duration-200 hover:shadow-md  items-center space-x-2 cursor-pointer text-sm p-2 rounded-xl shadow-md shadow-blue-500"
            onClick={handleDownloadResume}
          >
            <span className="  font-semibold ">Download</span>
            <Download
              size={18}
              className="bg-gray-600 shadow-md shadow-blue-500 rounded-full h-8 w-8 p-1.5 hover:shadow-md hover:shadow-green-600"
            />
          </div>
        </CardTitle>
        <hr className="mb-5 mt-10" />
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex gap-2 flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness /> {application?.experience} Years of Experience
          </div>
          <div className="flex gap-2 items-center">
            <School /> {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes /> Skills : {application?.skills}
          </div>
        </div>
        <hr className="mt-3" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
