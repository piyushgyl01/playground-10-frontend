import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredAndSortedStudents,
  setFilter,
  setSortBy,
  fetchStudents,
} from "../features/students/studentsSlice";
import Select from "../components/Select";

import { useEffect } from "react";
export default function Classes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
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
    { value: "Female", label: "Female" }
  ];
 
  const sortOptions = [
    { value: "Name", label: "Name" },
    { value: "Marks", label: "Marks" },
    { value: "Attendance", label: "Attendance" }
  ];
 

  const students = useSelector(selectFilteredAndSortedStudents);

  return (
    <>
      <main className="container">
        <h1>Class View</h1>
        <Select
          label="Filter by Gender: "
          id="genderFilterSelect"
          options={filterOptions}
          onChange={handleFilterChange}
          defaultValue="All"
        />
        <br />
        <br />
        <Select
          label="Sort by: "
          id="sortBySelect"
          options={sortOptions}
          onChange={handleSortChange}
          defaultValue="Name"
        />
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.gender} - Marks: {student.marks} -
              Attendance: {student.attendance}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
