async function scheduleHtmlProvider() {
  await loadTool("AIScheduleTools");
  //获取学年
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let academicYear;
  if (currentMonth >= 9) {
    academicYear = `${currentYear}-1`;
  } else if (currentMonth >= 2) {
    academicYear = `${currentYear - 1}-2`;
  } else {
    academicYear = `${currentYear - 1}-2`;
  }
  //post提交
  try {
    const response = await fetch(
      "https://jwxt.sysu.edu.cn/jwxt/schedule/agg/stuTimeTabPrint/studentQuery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          acadYear: academicYear,
          submitFlag: "1",
          nothroughCourseFlag: "1",
        }),
      }
    );

    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error("Error:", error);
    return JSON.stringify({ error: error.message });
  }
}
