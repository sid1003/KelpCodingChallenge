import { ApiError } from "./ApiError.js";
import { query } from "../db/index.js";

const calculateAgeDistribution = async () => {
    try {
      const results = await query("SELECT age FROM public.users");
  
      const ages = results.map((row) => row.age);
  
      const ageGroups = {
        "< 20": 0,
        "20 to 40": 0,
        "40 to 60": 0,
        "> 60": 0,
      };
  
      ages.forEach((age) => {
        if (age < 20) ageGroups["< 20"]++;
        else if (age >= 20 && age < 40) ageGroups["20 to 40"]++;
        else if (age >= 40 && age < 60) ageGroups["40 to 60"]++;
        else ageGroups["> 60"]++;
      });
  
      const totalUsers = ages.length || 1;
      const ageDistribution = [];
      for (const [group, count] of Object.entries(ageGroups)) {
        ageDistribution.push({
          "Age Group": group,
          "% Distribution": ((count / totalUsers) * 100).toFixed(2), 
        });
      }
  
      return ageDistribution;
    } catch (e) {
      let msg = "Error while calculating age distribution: " + e.message;
      console.log(msg);
      throw new ApiError(500, msg);
    }
  };

  export { calculateAgeDistribution }