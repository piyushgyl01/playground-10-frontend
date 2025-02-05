import { fetchStudents } from "../features/students/studentsSlice.js";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteStudentAsync } from "../features/students/studentsSlice.js";
import { Link } from "react-router";

export default function StudentDetail() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { studentID } = useParams();

  const {
    data: students,
    status,
    error,
  } = useFetch((state) => state.students.students, fetchStudents, "students");

  const foundStudent = students.find((student) => student._id === studentID);

  const handleDelete = async () => {
    try {
      await dispatch(deleteStudentAsync(studentID));
      navigate("/students");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <main className="container">
        <h1>StudentDetail</h1>
        {status === "loading" && <p>Deleting...</p>}
        {error && <p>{error}</p>}
        <p>Name: {foundStudent?.name}</p>
        <p>Age: {foundStudent?.age}</p>
        <p>Grade: {foundStudent?.grade}</p>
        <p>Attendeance: {foundStudent?.attendance}</p>
        <p>Marks: {foundStudent?.marks}</p>
        <Link
          className="btn btn-warning me-3"
          to={`/students/${foundStudent?.name}/${foundStudent?._id}/edit-student`}
        >
          Edit Details
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </main>
    </>
  );
}
