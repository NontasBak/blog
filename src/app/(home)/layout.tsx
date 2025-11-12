import { HomeLayout } from "@/components/layout/home";
import { baseOptions } from "@/lib/layout.shared";
import { Album, LayoutTemplate, User } from "lucide-react";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          icon: <Album />,
          text: "Blog",
          url: "/blog",
          // secondary items will be displayed differently on navbar
          secondary: false,
        },
        // {
        //   icon: <LayoutTemplate />,
        //   text: "Projects",
        //   url: "/projects",
        //   secondary: false,
        // },
        {
          icon: <User />,
          text: "About",
          url: "/about",
          secondary: false,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
