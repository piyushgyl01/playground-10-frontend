import { useParams, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTeacherAsync,
  fetchTeachers,
} from "../features/teachers/teacherSlice";
import { useEffect } from "react";

export default function TeacherDetail() {
  //USE NAVIGATE
  const navigate = useNavigate();

  //USE PARAMS
  const { teacherID } = useParams();

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //GETTING TEACHER'S STATE WITH USE SELECTOR
  const { teachers, fetchStatus, error, deleteStatus } = useSelector(
    (state) => state.teachers
  );

  //DISPATCHING FETCH TEACHERS ACTION ON A EFFECT
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  //FINDING TEACHER STATE DATA AND ID
  const foundTeacher = teachers.find((teacher) => teacher._id === teacherID);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTeacherAsync(teacherID));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (deleteStatus === "success") {
      navigate("/teachers");
    }
  }, [deleteStatus, navigate]);

  return (
    <>
      <main className="container">
        <h1>Teacher Details</h1>
        {fetchStatus === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <p>Name: {foundTeacher?.name}</p>
        <p>Age: {foundTeacher?.age}</p>
        <p>Gender: {foundTeacher?.gender}</p>
        <p>Subject: {foundTeacher?.subject}</p>
        <p>Email: {foundTeacher?.email}</p>
        <p>Years of Experience: {foundTeacher?.yearsOfExperience}</p>
        <Link
          className="btn btn-warning me-3"
          to={`/teachers/${foundTeacher?.name}/${foundTeacher?._id}/edit-teacher`}
        >
          Edit Details
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          {deleteStatus === "loading" ? "Deleting" : "Delete"}
        </button>
      </main>
    </>
  );
}
