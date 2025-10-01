export interface FullWeekData {
  week: number;
  pack: {
    baby: BabyInfo;
    mom: MomInfo;
  };
  daysToDue: number;
}

export interface WeekBaby {
  week: number;
  baby: BabyInfo;
}

export interface WeekMom {
  week: number;
  mom: MomInfo;
}

export interface BabyInfo {
  _id: string;
  analogy: string;
  weekNumber: number;
  babySize: number; // в см
  babyWeight: number; // в кг
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}

export interface MomFeeling {
  states: string[];
  sensationDescr: string;
}

export interface MomComfortTip {
  category: string;
  tip: string;
}

export interface MomInfo {
  _id: string;
  weekNumber: number;
  feelings: MomFeeling;
  comfortTips: MomComfortTip[];
}
