import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../fireBase/fireBase";
import { collection, getDocs, query, where } from "firebase/firestore";

function JobList() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const queryResult = query(
      collection(db, "jobs"),
      where("userId", "==", user.uid),
    );
    getDocs(queryResult)
      .then((snapShot) => {
        const list = snapShot.docs.map((d) => ({ id: d.id, ...d.data() }));
        console.log(list);
        setJobs(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  const jobItems = jobs.map((job) => (
    <div key={job.id}>
      <h3>{job.company}</h3>
      <p>{job.position}</p>
      <p>{job.status}</p>
      <p>{job.date}</p>
      <p>{job.notes}</p>
    </div>
  ));

  return (
    <div>
      <h1>JobList</h1>
      {jobItems}
    </div>
  );
}

export default JobList;
