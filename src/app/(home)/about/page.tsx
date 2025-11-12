import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] border-x-2 mx-3 md:mx-8 lg:mx-12">
      <div className="absolute inset-0 bg-fd-background">
        <div className="absolute inset-0 bg-[radial-gradient(hsl(0,0%,45.1%)_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      </div>
      <main className="relative z-10 grow px-4 py-8 container max-w-7xl flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col gap-6">
            <div className="md:mt-16">
              <h2 className="text-3xl font-lora font-bold mb-4 text-fd-foreground">Epameinondas Bakoulas</h2>
              <p className="text-lg text-fd-primary">MEng Electrical and Computer Engineering Student</p>
            </div>

            <div className="text-fd-muted-foreground leading-relaxed">
              <p className="mb-4">
                Hey there! I'm an ECE student who got into full-stack development a couple of years ago and
                haven't looked back since. I love working with React, TypeScript, and Node.js to build cool
                web stuff, but I also enjoy diving into the more technical side with C/C++, parallel
                programming, and some machine learning with Python.
              </p>
              <p>
                Currently I'm interested in Infosec and Cybersecurity, and planning to pursue a career in the
                field. I'm working on certifications, like HTB CWES and CPTS.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-3 text-fd-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Thessaloniki, Greece</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:nontasbak@gmail.com"
                  className="inline-flex items-center gap-2 text-fd-primary hover:text-fd-foreground transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>

                <a
                  href="https://github.com/NontasBak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-fd-primary hover:text-fd-foreground transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/epameinondas-bakoulas-4965b4357/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-fd-primary hover:text-fd-foreground transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About - Nontas Bak",
    description:
      "About Epameinondas Bakoulas - MEng Electrical and Computer Engineering student specializing in full-stack development",
  };
}
