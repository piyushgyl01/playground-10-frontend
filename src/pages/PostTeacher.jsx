import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherAsync } from "../features/teachers/teacherSlice";

export default function PostTeacher() {
  //INITIALISING USE DISPATCH
  const dispatch = useDispatch();

  //GETTING ADD STATUS FOR TEACHERS FROM STORE
  const { addStatus, error } = useSelector((state) => state.teachers);

  //INITAL FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    subject: "",
    email: "",
    yearsOfExperience: 0,
  });
  const [submitError, setSubmitError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();setSubmitError(null);
    setSuccessMsg(null);

    try {
      await dispatch(addTeacherAsync(formData));
      setFormData({
        name: "",
        age: 0,
        gender: "",
        subject: "",
        email: "",
        yearsOfExperience: 0,
      });
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  useEffect(() => {
    if (addStatus === "success") {
      setSuccessMsg("Added data");
      const timer = setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [addStatus]);

  return (
    <>
      <main className="container">
        <h1>Add Teacher</h1>
        {submitError && <p className="error">{submitError}</p>}
        {successMsg && <p className="success">{successMsg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name:"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <br /> <br />
          <input
            type="number"
            placeholder="Age:"
            required
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: parseFloat(e.target.value) })
            }
          />
          <br /> <br />
          <select
            placeholder="Gender"
            required
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <br />
          <input
            type="text"
            placeholder="Subject:"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          <br /> <br />
          <input
            type="text"
            placeholder="Email:"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <br /> <br />
          <input
            type="number"
            placeholder="Years Of Experience:"
            required
            value={formData.yearsOfExperience}
            onChange={(e) =>
              setFormData({
                ...formData,
                yearsOfExperience: parseFloat(e.target.value),
              })
            }
          />
          <br /> <br />
          <button type="submit" disabled={addStatus === "loading"}>
            {addStatus === "loading" ? "Adding" : "Add Teacher"}
          </button>
        </form>
      </main>
    </>
  );
}
