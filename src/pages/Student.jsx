import StudentList from "../features/students/StudentList";
import { Link } from "react-router";

export default function Student() {
  return (
    <>
      <main className="container">
        <h1>Student View</h1>
        <Link className="btn btn-warning" to="/post-student">
          Add Student
        </Link>
        <StudentList />
      </main>
    </>
  );
}
