async function scheduleTimer({ providerRes, parserRes } = {}) {
  //遍历parserRes的每个weeks的最后一个元素，来获取总周数
  let totalWeek = 0;
  for (let i = 0; i < parserRes.length; i++) {
    let weeks = parserRes[i].weeks;
    let maxWeek = Math.max(...weeks);
    if (maxWeek > totalWeek) {
      totalWeek = maxWeek;
    }
  }
  //获取开学时间
  const response = await fetch(
    "https://jwxt.sysu.edu.cn/jwxt/base-info/acadyearterm/showNewAcadlist?_t=" +
      new Date().getTime(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 在这里可以加入其他需要的头部信息
      },
    }
  );
  const data = await response.json();
  const acadStartdate = data.data.acadStartdate.toString();
  return {
    totalWeek: totalWeek, // 总周数：[1, 30]之间的整数
    startSemester: acadStartdate, // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: false, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 3, // 晚间课程节数：[0, 10]之间的整数
    sections: [
      {
        section: 1,
        startTime: "08:00",
        endTime: "08:45",
      },
      {
        section: 2,
        startTime: "08:55",
        endTime: "09:40",
      },
      {
        section: 3,
        startTime: "10:10",
        endTime: "10:55",
      },
      {
        section: 4,
        startTime: "11:05",
        endTime: "11:50",
      },
      {
        section: 5,
        startTime: "14:20",
        endTime: "15:05",
      },
      {
        section: 6,
        startTime: "15:15",
        endTime: "16:00",
      },
      {
        section: 7,
        startTime: "16:30",
        endTime: "17:15",
      },
      {
        section: 8,
        startTime: "17:25",
        endTime: "18:10",
      },
      {
        section: 9,
        startTime: "19:00",
        endTime: "19:45",
      },
      {
        section: 10,
        startTime: "19:55",
        endTime: "20:40",
      },
      {
        section: 11,
        startTime: "20:50",
        endTime: "21:35",
      },
    ],
  };
}
