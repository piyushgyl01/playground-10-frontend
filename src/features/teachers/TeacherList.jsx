import { Link } from "react-router";
import {
  fetchTeachers,
  selectFilteredAndSortedTeachers,
  setFilter,
  setSortBy,
} from "./teacherSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Select from "../../components/Select.jsx";

export default function TeacherList() {
  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //GETTING TEACHER'S STATE WITH USE SELECTOR
  const { fetchStatus, error } = useSelector((state) => state.teachers);

  const teachers = useSelector(selectFilteredAndSortedTeachers);

  //DISPATCHING FETCH TEACHERS ACTION ON A EFFECT
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const filterOptions = [
    { value: "All", label: "All" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const sortOptions = [
    { value: "Name", label: "Name" },
    { value: "Subject", label: "Subject" },
    { value: "yoe", label: "Years Of Experience" },
  ];

  return (
    <>
      <h1>Teacher List</h1>
      {fetchStatus === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Select
        label="Filter by Gender: "
        id="genderFilterSelect"
        options={filterOptions}
        onChange={handleFilterChange}
        defaultValue="All"
      />
      <Select
        label="Sort by: "
        id="sortBySelect"
        options={sortOptions}
        onChange={handleSortChange}
        defaultValue="Name"
      />
      <ul>
        {teachers.map((teacher) => (
          <Link
            key={teacher._id}
            to={`/teachers/${teacher.name}/${teacher._id}`}
          >
            <li>
              {teacher.name} - Age: ({teacher.age}) - Gender: {teacher.gender} -
              Age: {teacher.subject} - Years Of Experience: (
              {teacher.yearsOfExperience})
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
