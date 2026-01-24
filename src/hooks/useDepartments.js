import { useSocietyData } from "./useSocietyData";

export const useDepartments = () => {
  const { departments, members } = useSocietyData();

  if (!departments || !members) {
    return { membersByDepartments: [] };
  }

  const memberById = Object.fromEntries(members.map((m) => [m.id, m]));

  const membersByDepartments = departments.map((department) => {
    const members = department.members.map((m) => {
      const member = memberById[m.id];
      return {
        id: member.id,
        name: member.name,
        role: m.role,
        linkedin: member.linkedin,
      };
    });
    return {
      id: department.id,
      name: department.name,
      description: department.description,
      members,
    };
  });

  return {
    membersByDepartments,
  };
};
