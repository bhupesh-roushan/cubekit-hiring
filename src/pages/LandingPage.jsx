// import { Button } from "../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "../components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import companies from "../data/companies.json";
// import faqs from "../data/faq.json";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "../components/ui/accordion";
// import { Link } from "react-router-dom";


// const LandingPage = () => {
//   return (
//     <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
//       <section className="text-center ">
//         <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
//           FFind Jobs Quicker
//           <span className="flex items-center gap-2 sm:gap-6">
//           Hire Smarter
//           </span>
//         </h1>
//         <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
//         Transform Your Approach to Hiring and Job Hunting!
//         </p>
//       </section>
//       <div className="flex flex-col gap-6 items-center sm:flex-row sm:gap-16 justify-center">
//         <Link to={"/jobs"}>
//           <Button variant="outline"
//                 size="lg"
//                 className="w-full sm:w-auto p-2 text-xs sm:p-8 sm:pl-16 sm:pr-16 sm:text-xl transition ease-in-out delay-120 bg-transparent hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black duration-300 shadow-lg hover:shadow-blue-600">
//             Find Jobs
//           </Button>
//         </Link>
//         <Link to={"/post-job"}>
//           <Button variant="blue"
//                 size="lg"
//                 className="w-full sm:w-auto p-2 text-xs sm:p-8 sm:pl-16 sm:pr-16 sm:text-xl transition ease-in-out delay-120 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black duration-300 shadow-lg hover:shadow-blue-600">
//             Post a Job
//           </Button>
//         </Link>
//       </div>
//       <Carousel
//         plugins={[
//           Autoplay({
//             delay: 2000,
//           }),
//         ]}
//         className="w-full py-10"
//       >
//         <CarouselContent className="flex gap-5 sm:gap-20 items-center">
//           {companies.map(({ name, id, path }) => (
//             <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
//               <img
//                 src={path}
//                 alt={name}
//                 className="h-9 sm:h-14 object-contain"
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>

//       <img src="/banner3.png" className="w-full  rounded-xl opacity-95 hover:opacity-100  transition-all delay-120 shadow-md shadow-blue-500 " />

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
//         <Card className=" transition-all delay-120 opacity-85 hover:opacity-100 shadow-md shadow-blue-600">
//           <CardHeader>
//             <CardTitle className="font-bold">For Job Seekers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             Search and apply for jobs, track applications, and more.
//           </CardContent>
//         </Card>
//         <Card className=" transition-all delay-120 opacity-85 hover:opacity-100 shadow-md shadow-blue-600">
//           <CardHeader>
//             <CardTitle className="font-bold">For Employers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             Post jobs, manage applications, and find the best candidates.
//           </CardContent>
//         </Card>
//       </section>

//       <Accordion type="multiple" className="w-full">
//         {faqs.map((faq, index) => (
//           <AccordionItem key={index} value={`item-${index + 1}`}>
//             <AccordionTrigger>{faq.question}</AccordionTrigger>
//             <AccordionContent>{faq.answer}</AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </main>
//   );
// };

// export default LandingPage;



import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // Import useUser to check user role

const LandingPage = () => {
  const { user, isSignedIn } = useUser(); // Get user data and signed-in status from Clerk
  const userRole = user?.unsafeMetadata?.role; // Access the user's role
  
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center ">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Jobs Quicker
          <span className="flex items-center gap-2 sm:gap-6">
            Hire Smarter
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Transform Your Approach to Hiring and Job Hunting!
        </p>
      </section>
      
      {/* Conditional Rendering based on user role */}
      <div className="flex flex-col gap-6 items-center sm:flex-row sm:gap-16 justify-center">
        <Link to={"/jobs"}>
          <Button variant="outline"
            size="lg"
            className="w-full sm:w-auto p-2 text-xs sm:p-8 sm:pl-16 sm:pr-16 sm:text-xl transition ease-in-out delay-120 bg-transparent hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black duration-300 shadow-lg hover:shadow-blue-600">
            Find Jobs
          </Button>
        </Link>
        {/* Show "Post a Job" if the user is a recruiter or not signed in */}
        {(!isSignedIn || userRole === 'recruiter') && (
          <Link to={"/post-job"}>
            <Button variant="blue"
              size="lg"
              className="w-full sm:w-auto p-2 text-xs sm:p-8 sm:pl-16 sm:pr-16 sm:text-xl transition ease-in-out delay-120 bg-blue-500   hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-black duration-300 shadow-lg hover:shadow-blue-600">
              Post a Job
            </Button>
          </Link>
        )}
      </div>

      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <img src="/banner3.png" className="w-full rounded-xl opacity-95 hover:opacity-100 transition-all delay-120 shadow-md shadow-blue-500" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <Card className="transition-all delay-120 opacity-85 hover:opacity-100 shadow-md shadow-blue-600">
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="transition-all delay-120 opacity-85 hover:opacity-100 shadow-md shadow-blue-600">
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
