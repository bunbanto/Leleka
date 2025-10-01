import css from './JourneyDetails.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import { JourneyBaby, Tab, JourneyMom } from '@/types/journey';
import { Icon } from '../ui/Icon/Icon';
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';
import Loader from '../ui/Loader/Loader';

interface JourneyDetailsProps {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
  data: {
    mom?: JourneyMom;
    baby?: JourneyBaby;
  };
  isLoading?: boolean;
}

const JourneyDetails = ({
  activeTab,
  onChangeTab,
  data,
  isLoading,
}: JourneyDetailsProps) => {
  const iconMap: { [key: string]: string } = {
    Харчування: 'eat',
    Активність: 'activity',
    'Відпочинок та комфорт': 'rest',
  };

  const baby = data?.baby ? data?.baby : null;
  const mom = data?.mom ? data?.mom : null;

  return (
    <div className={css.container}>
      <div className={css.tabContainer}>
        <button
          className={clsx(css.tab, {
            [css.active]: activeTab === 'baby',
          })}
          type="button"
          onClick={() => onChangeTab('baby')}
        >
          Розвиток малюка
        </button>
        <button
          className={clsx(css.tab, {
            [css.active]: activeTab === 'mom',
          })}
          type="button"
          onClick={() => onChangeTab('mom')}
        >
          Тіло мами
        </button>
      </div>

      {isLoading && !data ? (
        <Loader />
      ) : activeTab === 'baby' && baby ? (
        <div className={css.babyContainer}>
          <div className={css.babySize}>
            <div className={css.imageContainer}>
              <Image
                className={css.image}
                src={baby.image}
                alt="Baby size compared to fruits"
                fill
                style={{ objectFit: 'cover', borderRadius: '24px' }}
              />
            </div>
            <p className={css.block_title}>
              Ваш малюк зараз розміром з {baby.analogy}
            </p>
          </div>
          <ul>
            <li className={css.aboutBaby}>
              {baby.babyActivity}
              {baby.babyDevelopment}
            </li>
            <li className={css.fact}>
              <div className={css.titleContainer}>
                <Icon name={'star'} width={24} height={24} />
                <h2 className={css.title}>Цікавий факт тижня</h2>
              </div>
              <p className={css.text}>{baby.interestingFact}</p>
            </li>
          </ul>
        </div>
      ) : activeTab === 'mom' && mom ? (
        <div className={css.momTabsContainer}>
          <div className={css.momWrapper}>
            <div className={css.momContainer}>
              <h2 className={css.momTitle}>Як ви можете почуватись</h2>
              <ul className={css.feelings}>
                {mom.feelings.states.map(state => (
                  <li key={state} className={css.feeling}>
                    {state}
                  </li>
                ))}
              </ul>
              <p className={css.text}>{mom.feelings.sensationDescr}</p>
            </div>
            <div className={`${css.momContainer} ${css.tip}`}>
              <h2 className={css.momTitle}>Поради для вашого комфорту</h2>
              <ul className={css.text}>
                {mom.comfortTips.map(comfortTip => (
                  <li key={comfortTip.category} className={css.comfortTip}>
                    <Icon
                      name={iconMap[comfortTip.category]}
                      width={24}
                      height={24}
                    />
                    <div>
                      <h3 className={css.category}>{comfortTip.category}</h3>
                      <p>{comfortTip.tip}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <TasksReminderCard />
        </div>
      ) : null}
    </div>
  );
};

export default JourneyDetails;
