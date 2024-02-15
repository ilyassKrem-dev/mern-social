import { RiHome2Line,RiSearchLine,RiHeartLine,RiUser3Line   } from "react-icons/ri";
import { IoCreateOutline,IoPeopleOutline  } from "react-icons/io5";

export const sidebarLinks = [
    {
      logo: <RiHome2Line />,
      route: "/",
      label: "Home",
    },
    {
      logo: <RiSearchLine/>,
      route: "/search",
      label: "Search",
    },
    {
      logo: <RiHeartLine/>,
      route: "/activity",
      label: "Activity",
    },
    {
      logo: <IoCreateOutline />,
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      logo: <IoPeopleOutline />,
      route: "/communities",
      label: "Communities",
    },
    {
      logo: <RiUser3Line/>,
      route: "/profile",
      label: "Profile",
    },
  ];