export function UsePercentageJob(list: any,userSklls: any) {
    return list?.map((job: any) => {
      let percentageMatch = 0;
      let matchSkills = job?.Skills?.filter(
        (item: any) => !userSklls?.includes(item.skill.name)
      );
      if (matchSkills && job?.Skills) {
        const x = job.Skills.length - matchSkills?.length;
        const skilssMatch = (x * 100) / job?.Skills?.length;
        percentageMatch = skilssMatch | 0;
      }

      return { job: job, percentageMatch: percentageMatch };
    });
  }
