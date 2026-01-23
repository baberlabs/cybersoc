import { useSocietyData } from "./useSocietyData.js";

export const useCommittee = () => {
  const { members, roles, assignments } = useSocietyData();

  if (!members.length || !roles.length || !assignments.length) {
    return {
      committeeMembers: [],
      vacantRoles: [],
    };
  }

  const memberById = Object.fromEntries(members.map((m) => [m.id, m]));
  const roleById = Object.fromEntries(roles.map((r) => [r.id, r]));

  const memberRoleMap = {};

  assignments.forEach((a) => {
    const member = memberById[a.member_id];
    const role = roleById[a.role_id];

    if (!member || !role) return;

    if (!memberRoleMap[member.id]) {
      memberRoleMap[member.id] = { member, roles: [] };
    }

    memberRoleMap[member.id].roles.push(role);
  });

  const committeeMembers = Object.values(memberRoleMap).map((entry) => ({
    ...entry.member,
    roles: entry.roles,
  }));

  const assignedRoleIds = new Set(assignments.map((a) => a.role_id));
  const vacantRoles = roles.filter((r) => !assignedRoleIds.has(r.id));

  return {
    committeeMembers,
    vacantRoles,
  };
};
