import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../fireBase/fireBase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "../componentCss/jobList.css";

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
    <div className="job-card" key={job.id}>
      <h3 className="job-card__company">{job.company}</h3>
      <p className="job-card__position">{job.position}</p>
      <p
        className={`job-card__status job-card__status--${job.status.toLowerCase()}`}
      >
        {job.status}
      </p>
      <p className="job-card__date">{job.date}</p>
      <p className="job-card__notes">{job.notes}</p>
    </div>
  ));

  return (
    <div className="job-list">
      <h1 className="job-list__title">JobList</h1>
      <div className="job-list__grid">{jobItems}</div>
    </div>
  );
}

export default JobList;
