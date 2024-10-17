import { getCompanies } from "../api/apiCompanies";
import { getJobs } from "../api/apijobs";
import JobCard from "../components/JobCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader, PuffLoader } from "react-spinners";

const JobsListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [jobList, setJobList] = useState([]); // State to store jobs
  const { user, isLoaded } = useUser(); // Get user object and isLoaded state

  const {
    fn: fnJobs,
    data: jobsData,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && jobsData) {
      setJobList(jobsData); // Set the job list when jobsData is loaded
    }
  }, [isLoaded, jobsData]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("Search-query");
    if (query) setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
  };

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleJobDeleted = (jobId) => {
    // Filter out the deleted job from the state
    setJobList((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  if (!isLoaded) {
    return (
      <div
        width={"100%"}
        height={"100%"}
        className=" w-full h-full flex items-center justify-center mt-2"
      >
        <PuffLoader size={40} speedMultiplier={3} color="grey" />
      </div>
    );
  }

  return (
    <div className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
      <h1 className="mb-5">Latest Jobs</h1>

      {/* add filters here */}
      <form onSubmit={handleSearch} className="h-14 flex w-full gap-4">
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="Search-query"
          className="h-full flex-1 px-4 text-sm font-normal shadow-md shadow-blue-900 hover:shadow-blue-700 text-white"
        />
        <Button
          type="submit"
          className="h-full sm:w-28 sm:h-14 transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-100 hover:bg-white hover:text-black duration-300 opacity-95 hover:opacity-100 hover:shadow-md hover:shadow-green-500"
        >
          Search
        </Button>
      </form>

      <div className="mt-4 text-white flex flex-col sm:flex-row gap-5">
        {/* Location filter */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
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

        {/* Company filter */}
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="text-sm font-normal shadow-md shadow-blue-900 hover:shadow-blue-700 text-white">
            <SelectValue placeholder="Filter By Company" />
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

        <Button
          onClick={handleClearFilters}
          variant="destructive"
          className="sm:w-1/2 transition ease-in-out delay-120 bg-red-700 hover:-translate-y-1 hover:scale-100 hover:bg-red-600 shadow-md hover:shadow-blue-500 duration-200"
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader
          className="mt-4"
          width={"100%"}
          color="grey"
          height={"1px"}
        />
      )}

      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobList?.length ? (
            jobList.map((job) => {
              const isMyJob = job.recruiter_id === user?.id; // Check if this job is created by the user
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                  isMyJob={isMyJob} // Pass isMyJob prop to show delete icon
                  onJobDeleted={handleJobDeleted} // Handle job deletion
                />
              );
            })
          ) : (
            <div className="text-4xl flex flex-row w-full  justify-center items-center">
              No Jobs Found{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsListing;
