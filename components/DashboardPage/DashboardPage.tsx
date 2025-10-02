'use client';

import styles from './DashboardPage.module.css';

import StatusBlock from '@/components/DashboardPage/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/DashboardPage/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/DashboardPage/MomTipCard/MomTipCard';
import FeelingCheckCard from '@/components/DashboardPage/FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import { useJourneyStore } from '@/lib/store/weeksDataStore';
import Loader from '../ui/Loader/Loader';
// import { useAuthStore } from '@/lib/store/authStore';

export default function DashboardPage() {
  // const { user, isAuthenticated } = useAuthStore();
  const currentWeek = useJourneyStore(s => s.currentWeek);
  const daysToDue = useJourneyStore(s => s.daysToDue);
  const mom = useJourneyStore(s => s.mom);
  const baby = useJourneyStore(s => s.baby);
  const isLoaded = useJourneyStore(s => s.isLoaded);

  if (!isLoaded) return <Loader />;

  return (
    <div className={styles.dashboardContainer}>
      <StatusBlock weeks={currentWeek} days={daysToDue} />
      <BabyTodayCard
        img={baby?.image}
        height={baby?.babySize}
        weight={baby?.babyWeight}
        activity={baby?.babyActivity}
        info={baby?.babyDevelopment}
        analogy={baby?.analogy}
      />
      <MomTipCard adviceForMom={mom?.comfortTips.map(s => s.tip)?.join('')} />
      <TasksReminderCard />
      <FeelingCheckCard />
    </div>
  );
}
