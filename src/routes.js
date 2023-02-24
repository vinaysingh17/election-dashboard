/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import UploadFiles from "components/Upload/UploadFiles";
import { getVoterList } from "Utils/Api";
import VotorList from "components/VotorList/VotorList";
import BoothList from "components/Booth/BoothList";
import CandidateList from "components/CandidateResult/CandidateResultList";
import BoothResult from "components/BoothResult/BoothResultList";
import AssemblyBoothData from "components/CandidateWiseBooth/AssemblyBoothData";
import Dashboard2 from "views/Dashboard2";
import BoothDashboard from "views/BoothDashboard";
// import { AssemblyBoothData } from "Utils/Api";

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
  {
    path: "/admin-dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard2,
    layout: "/admin",
  },

  {
    path: "/admin-assembly-booth-data",
    name: "Assembly Data",
    icon: "nc-icon nc-bank",
    component: AssemblyBoothData,
    layout: "/admin",
  },
  {
    path: "/upload-files",
    name: "Upload",
    icon: "nc-icon nc-bank",
    component: UploadFiles,
    layout: "/admin",
  },
  {
    path: "/votor-list",
    name: "Votor List",
    icon: "nc-icon nc-bank",
    component: VotorList,
    layout: "/admin",
  },
  {
    path: "/booth-list",
    name: "Booth List",
    icon: "nc-icon nc-bank",
    component: BoothList,
    layout: "/admin",
  },
  {
    path: "/candidate-list",
    name: "Candidates",
    icon: "nc-icon nc-bank",
    component: CandidateList,
    layout: "/admin",
  },
  {
    path: "/booth-result",
    name: "Booth Result",
    icon: "nc-icon nc-bank",
    component: BoothResult,
    layout: "/admin",
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
];
export default routes;
