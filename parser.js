function scheduleHtmlParser(html) {
  //string->json
  let arr = JSON.parse(html);
  let result = [];
  try {
    let timetable = arr.data.timetable;
    Object.keys(timetable).forEach((key) => {
      let item = timetable[key];
      if (item == null) {
        return;
      }
      item.forEach((element) => {
        console.log(element);
        //获取节次
        let sections = [];
        for (
          let i = element.startClassTimes;
          i < element.endClassTimes + 1;
          i++
        ) {
          sections.push(i);
        }
        //获取周次
        let pattern = /(\d+)-(\d+)/;
        const matches = element.timeDetail ? element.timeDetail.match(pattern) : null;
        if (matches == null) {
          return
        }
        console.log(matches);
        let weeks = [];
        // 处理没有时间详细信息的课程，默认设置为18周
        let startNumber = 1, endNumber = 18;
        if (matches && matches.length === 3) {
          startNumber = parseInt(matches[1]);
          endNumber = parseInt(matches[2]);
        }
        for (let i = startNumber; i <= endNumber; i++) {
          weeks.push(i);
        }
        let classItem = {
          name: element.courseName.replace(/\/+$/, ""),
          position: element.classPlace.replace(/\/+$/, ""),
          teacher: element.teachingStaffName.replace(/\/+$/, ""),
          weeks: weeks, //周次
          day: element.week, //星期几
          sections: sections, //节次
        };
        console.log(classItem);
        result.push(classItem);
      });
    });
  } catch (error) {
    console.error(error);
    return "do not continue";
  }
  return result;
}
