import Form from "../components/Form.jsx";
import { useState, useEffect } from "react";
import { addStudentAsync } from "../features/students/studentsSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function PostStudent() {
  const dispatch = useDispatch();
  const addStatus = useSelector((state) => state.students.addStatus);

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    grade: "",
  });

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await dispatch(addStudentAsync(formData));
      setFormData({
        name: "",
        age: 0,
        gender: "",
        grade: "",
      });
    } catch (error) {
      setSubmitError(error.message || "Failed to add student");
    }
  };

  useEffect(() => {
    if (addStatus === "error") {
      setSubmitError("Failed to add student");
    }
  }, [addStatus]);

  return (
    <>
      <main className="container">
        <h1>Post Student</h1>
        <Form
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitButtonText={addStatus === "loading" ? "Adding..." : "Add"}
          isLoading={addStatus === "loading"}
          error={submitError}
        />
      </main>
    </>
  );
}
