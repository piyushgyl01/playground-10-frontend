import { useParams } from "react-router";
import { fetchStudents } from "../features/students/studentsSlice.js";
import { useFetch } from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateStudentAsync } from "../features/students/studentsSlice.js";
import { useNavigate } from "react-router";
import Form from "../components/Form.jsx";

export default function EditStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentID } = useParams();
  const [submitError, setSubmitError] = useState(null);
  const updateStatus = useSelector((state) => state.students.updateStatus);

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    grade: "",
    attendance: 0,
    marks: 0,
  });

  const {
    data: students,
    status,
    error,
  } = useFetch((state) => state.students.students, fetchStudents, "students");

  const foundStudent = students.find((student) => student._id === studentID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await dispatch(updateStudentAsync({ id: studentID, formData }));
      navigate(`/students/${foundStudent?.name}/${foundStudent?._id}`);
    } catch (error) {
      setSubmitError(error.message || "Failed to add student");
    }
  };
  useEffect(() => {
    if (foundStudent) {
      setFormData({
        name: foundStudent.name,
        age: foundStudent.age,
        gender: foundStudent.gender,
        grade: foundStudent.grade,
        attendance: foundStudent.attendance,
        marks: foundStudent.marks,
      });
    }
  }, [foundStudent]);

  useEffect(() => {
    if (updateStatus === "error") {
      setSubmitError("Failed to add student");
    }
  }, [updateStatus]);

  return (
    <>
      <main className="container">
        <Form
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitButtonText={updateStatus === "loading" ? "Updating..." : "Save"}
          isLoading={updateStatus === "loading"}
          error={submitError}
        />
      </main>
    </>
  );
}
