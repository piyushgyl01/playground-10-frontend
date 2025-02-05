import TeacherList from "../features/teachers/TeacherList.jsx";
import { Link } from "react-router";

export default function Teacher() {
  return (
    <>
      <main className="container">
        <h1>Teacher</h1>
        <Link className="btn btn-warning" to="/post-teacher">
          Add Teacher
        </Link>
        <TeacherList />
      </main>
    </>
  );
}
