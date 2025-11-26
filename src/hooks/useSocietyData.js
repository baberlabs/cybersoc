import { useEffect, useState } from "react";

export const useSocietyData = () => {
  const [data, setData] = useState({
    people: [],
    roles: [],
    committee: [],
    projects: [],
  });

  useEffect(() => {
    Promise.all([
      fetch("/data/members.json").then((r) => r.json()),
      fetch("/data/committee_roles.json").then((r) => r.json()),
      fetch("/data/committee_assignments.json").then((r) => r.json()),
      fetch("/data/projects.json").then((r) => r.json()),
    ]).then(([people, roles, committee, projects]) => {
      setData({ people, roles, committee, projects });
    });
  }, []);

  return data;
};
