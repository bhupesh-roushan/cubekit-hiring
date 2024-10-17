import { useUser } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div
        width={"100%"}
        height={"100%"}
        className=" w-full h-full flex items-center justify-center mt-2"
      >
        <PropagateLoader size={3} speedMultiplier={2} color="white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-tighter pr-2">
        Select Your Role
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-10 w-full md:px-40">
        <Button
          variant="outline"
          className="transition ease-in-out delay-120 bg-transparent hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black duration-300 
           h-24 sm:h-32 text-lg sm:text-2xl shadow-lg hover:shadow-blue-600 px-4 sm:px-6 py-3 sm:py-4"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="blue"
          className="transition ease-in-out delay-120 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black duration-300 
          h-24 sm:h-32 text-lg sm:text-2xl shadow-lg hover:shadow-blue-600 px-4 sm:px-6 py-3 sm:py-4"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
