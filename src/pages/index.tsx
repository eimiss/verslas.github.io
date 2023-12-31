import React from "react";
import {
  Route,
  RouteProps,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import { Layout } from "../components/layout";
import { ROUTES } from "../routes";
import PageHome from "./Home";
import EndingPage from "./ending_page";
import PageQuestion from "./question/[seed]/[page]";
import PageRules from "./rules";
import Page404 from "./404";
import QuestionsScreen from "./questions/QuestionsScreen";

const PAGES: RouteProps[] = [
  {
    path: ROUTES.home,
    element: <Layout>
      <PageHome />
    </Layout>
  },
  {
    path: ROUTES.questions,
    element: <Layout>
      <QuestionsScreen />
    </Layout>
  },
  {
    path: ROUTES.ending,
    element: <Layout>
      <EndingPage />
    </Layout>
  },
  {
    path: ROUTES.question,
    element: <Layout>
      <PageQuestion />
    </Layout>
  },
  {
    path: ROUTES.rules,
    element: <Layout>
      <PageRules />
    </Layout>
  }
];

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ isProper, setIsProper ] = React.useState(false);

  React.useEffect(() => {
    if(location.search.startsWith("?/")) {
      navigate(location.search.slice(1));
    }
    setIsProper(true);
  }, []);

  if(!isProper) return null;

  return <Routes>
    {PAGES.map((page, index) => <Route key={index} {...page} path={`${page.path}`} />)}
    <Route path="/*" element={<Layout><Page404 /></Layout>}></Route>
  </Routes>;
};

export default Index;