import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSchoolStats } from '../features/school/schoolSlice';
import { fetchStudents } from '../features/students/studentsSlice';
import { fetchTeachers } from '../features/teachers/teacherSlice';

export default function School() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const teachers = useSelector(state => state.teachers.teachers);
  const { status: studentsFetchStatus } = useSelector(state => state.students);
  const { fetchStatus: teachersFetchStatus } = useSelector(state => state.teachers);
  
  useEffect(() => {
    // Calculate stats when either students or teachers update
    if (students.length > 0 || teachers.length > 0) {
      // Student stats
      const totalStudents = students.length;
      const averageAttendance = (students.reduce((sum, student) => 
        sum + (student.attendance || 0), 0) / totalStudents).toFixed(2);
      const averageMarks = (students.reduce((sum, student) => 
        sum + (student.marks || 0), 0) / totalStudents).toFixed(2);
      const topStudent = students.reduce((top, student) => 
        (student.marks || 0) > (top?.marks || 0) ? student : top, null);

      // Teacher stats
      const totalTeachers = teachers.length;
      const mostExperiencedTeacher = teachers.reduce((most, teacher) => 
        (teacher.yearsOfExperience || 0) > (most?.yearsOfExperience || 0) 
          ? teacher 
          : most, null);

      dispatch(updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent,
        totalTeachers,
        mostExperiencedTeacher
      }));
    }
  }, [students, teachers, dispatch]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const schoolStats = useSelector(state => state.school);

  // Show loading while either students or teachers are loading
  if (studentsFetchStatus === "loading" || teachersFetchStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>School View</h1>
      <h2>Student Statistics</h2>
      <p>Total Students: {schoolStats.totalStudents || 0}</p>
      <p>Average Attendance: {schoolStats.averageAttendance || 0}%</p>
      <p>Average Marks: {schoolStats.averageMarks || 0}</p>
      <p>Top Student: {schoolStats.topStudent?.name || "-"}</p>
      
      <h2>Teacher Statistics</h2>
      <p>Total Teachers: {schoolStats.totalTeachers || 0}</p>
      <p>Most Experienced Teacher: {schoolStats.mostExperiencedTeacher?.name || "-"} 
         ({schoolStats.mostExperiencedTeacher?.yearsOfExperience || 0} years)</p>
    </div>
  );
}