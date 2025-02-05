import { fetchTeachers } from "../features/teachers/teacherSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacherAsync } from "../features/teachers/teacherSlice";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditTeacher() {
  const navigate = useNavigate();
  //INITIALISING USE DISPATCH
  const dispatch = useDispatch();

  //GETTING ADD STATUS FOR TEACHERS FROM STORE
  const { teachers, updateStatus, fetchStatus } = useSelector(
    (state) => state.teachers
  );
  const { teacherID } = useParams();

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
  const foundTeacher = teachers.find((teacher) => teacher._id === teacherID);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      await dispatch(updateTeacherAsync({ id: teacherID, formData }));
      navigate(`/teachers/${foundTeacher?.name}/${foundTeacher?._id}`);
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (foundTeacher) {
      setFormData({
        name: foundTeacher.name,
        age: foundTeacher.age,
        gender: foundTeacher.gender,
        subject: foundTeacher.subject,
        email: foundTeacher.email,
        yearsOfExperience: foundTeacher.yearsOfExperience,
      });
    }
  }, [foundTeacher]);
  return (
    <>
      <main className="container">
        <h1>Edit Details of</h1>
        {fetchStatus === "loading" && <p>Loading...</p>}
        {!foundTeacher && <p>Teacher not found</p>}

        {submitError && <p className="error">{submitError}</p>}

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
          <button type="submit" disabled={updateStatus === "loading"}>
            {updateStatus === "loading" ? "Saving" : "Save Changes"}
          </button>
        </form>
      </main>
    </>
  );
}
