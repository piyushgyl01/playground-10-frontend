import { fetchStudents } from "./studentsSlice.js";
import { Link } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";

export default function StudentList() {
  const {
    data: students,
    status,
    error,
  } = useFetch((state) => state.students.students, fetchStudents, "students");

  return (
    <>
      <h1>Student List</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {students?.map((std) => (
          <Link key={std._id} to={`/students/${std.name}/${std._id}`}>
            <li>
              {std.name} ({`Age: ${std.age}`})
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
