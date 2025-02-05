import { Link } from "react-router";

export default function App() {
  return (
    <>
      <main className="container text-center my-4">
        <h1 className="mt-5">Manage Students</h1>
        <Link to={"/students"} className="btn btn-primary">View Students</Link>
         <h1 className="mt-5">Manage Teachers</h1>
        <Link to={"/students"} className="btn btn-primary">View Teachers</Link>
         <h1 className="mt-5">Manage School</h1>
        <Link to={"/school"} className="btn btn-primary">View School</Link>
      </main>
    </>
  );
}
