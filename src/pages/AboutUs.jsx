import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";

function AboutUs() {
  return (
    <div className="min-h-screen  text-foreground mt-5">
      <div className="shadow-md shadow-blue-600 rounded-2xl">
        <section className="bg- transition-all ease-in delay-110 opacity-90 hover:opacity-100 py-16 text-center ">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold">About Cubekit</h1>
            <p className="mt-4 text-lg text-justify">
              Cubekit is a dynamic hiring platform designed to revolutionize the
              way recruiters and job seekers connect. Our mission is to bridge
              the gap between talent and opportunity, simplifying the hiring
              process while empowering professionals and businesses to grow and
              succeed. With a user-friendly interface and innovative features,
              Cubekit offers a seamless experience for both recruiters looking
              for top talent and candidates searching for their dream job.
              Whether you’re a company aiming to build a team of skilled
              professionals or a job seeker eager to land the perfect position,
              Cubekit provides the tools and resources needed to make the
              process efficient and straightforward. By integrating cutting-edge
              technology, such as smart job matching and intuitive profiles, we
              ensure that each interaction on our platform is purposeful and
              productive. Our platform stands out with a unique, sleek user
              interface that prioritizes both functionality and design, making
              it easier than ever to navigate job listings, applications, and
              candidate searches. At Cubekit, we believe in empowering
              individuals and businesses by connecting the right talent with the
              right opportunities. Join Cubekit today and take the next step
              toward landing your dream job or building your ideal team.
            </p>
          </div>
        </section>
        <hr />
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className=" mx-auto text-lg text-center">
              At Cubekit, we are committed to simplifying the hiring process.
              Our platform connects recruiters and job seekers, making it easier
              than ever to find the right talent or secure the perfect job. We
              aim to empower professionals and businesses alike to grow and
              succeed.
            </p>
          </div>
        </section>
        <hr />
        <section className="py-16 rounded-b-xl bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:scale-105 transition-transform duration-200 shadow-md">
                <CardHeader>
                  <CardTitle>Bhupesh Roushan</CardTitle>
                  <CardDescription>Founder & CEO</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Roushan leads Cubekit with a passion for bridging the gap
                    between talent and opportunity.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-200 shadow-md">
                <CardHeader>
                  <CardTitle>Jane Doe</CardTitle>
                  <CardDescription>Chief Technology Officer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Jane ensures Cubekit's technology is innovative,
                    user-friendly, and scalable.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:scale-105 transition-transform duration-200 shadow-md">
                <CardHeader>
                  <CardTitle>John Smith</CardTitle>
                  <CardDescription>Head of Operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    John manages daily operations and ensures Cubekit delivers a
                    seamless experience for users.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 mt-16 bg-background rounded-2xl opacity-85 hover:opacity-100 delay-75 ease-in-out transition-all shadow-md shadow-blue-600 ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Cubekit?</h2>
          <p className="max-w-2xl mx-auto text-lg">
            We focus on offering a platform that is both comprehensive and easy
            to use. Whether you're looking to get recruited, hire top talent, or
            explore new job opportunities, Cubekit makes it simple, efficient,
            and effective.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 text-center rounded-xl bg-background mt-10 mb-10 opacity-85 hover:opacity-100 delay-75 ease-in-out transition-all shadow-md shadow-green-600">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-8 text-lg">
            Have any questions? Want to know more about Cubekit? We’d love to
            hear from you!
          </p>
          <a
            href="mailto:roushan.bhupesh@gmail.com"
            className="px-3 py-3 bg-primary text-black shadow-md rounded-full hover:shadow-green-600 transition-all ease-in delay-130 translate-y-1 "
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
