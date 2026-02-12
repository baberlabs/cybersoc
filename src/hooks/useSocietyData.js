import { useEffect, useState } from "react";

export const useSocietyData = () => {
  const [data, setData] = useState({
    members: [],
    roles: [],
    assignments: [],
    projects: [],
    departments: [],
  });

  useEffect(() => {
    Promise.all([
      fetch("/data/members.json").then((r) => r.json()),
      fetch("/data/committee_roles.json").then((r) => r.json()),
      fetch("/data/committee_assignments.json").then((r) => r.json()),
      fetch("/data/projects.json").then((r) => r.json()),
      fetch("/data/departments.json").then((r) => r.json()),
    ]).then(([members, roles, assignments, projects, departments]) => {
      setData({
        members,
        roles,
        assignments,
        projects,
        departments,
      });
    });
  }, []);

  return data;
};
