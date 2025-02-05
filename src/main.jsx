import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar.jsx";

import store from "./app/store.js";

import App from "./App.jsx";
import Classes from "./pages/Classes.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import PostStudent from "./pages/PostStudent.jsx";
import School from "./pages/School.jsx";
import Student from "./pages/Student.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import Teacher from "./pages/Teacher.jsx";
import TeacherDetail from "./pages/TeacherDetail.jsx";
import EditTeacher from "./pages/EditTeacher.jsx";
import PostTeacher from "./pages/PostTeacher.jsx";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    path: "/",
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/students",
        element: <Student />,
      },
      {
        path: "/students/:name/:studentID/edit-student",
        element: <EditStudent />,
      },
      {
        path: "/post-student",
        element: <PostStudent />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/school",
        element: <School />,
      },
      {
        path: "/students/:name/:studentID",
        element: <StudentDetail />,
      },
      {
        path: "/teachers",
        element: <Teacher />
      },
      {
        path: "/teachers/:teacherName/:teacherID",
        element: <TeacherDetail />
      },
      {
        path: "/teachers/:teacherName/:teacherID/edit-teacher",
        element: <EditTeacher />
      },
       {
        path: "/post-teacher",
        element: <PostTeacher />
       }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
