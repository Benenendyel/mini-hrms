const dataFilter = (datas, departmentFilter, statusFilter) => {
  return datas.filter((data) => {
    const matchesDept =
      departmentFilter === "All Departments" ||
      data.department === departmentFilter;
    const matchesStatus =
      statusFilter === "All Status" ||
      data.employment_status === statusFilter ||
      data.status === statusFilter;

    return matchesDept && matchesStatus;
  });
};

export default dataFilter;
