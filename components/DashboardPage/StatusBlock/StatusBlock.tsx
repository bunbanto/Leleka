import css from './StatusBlock.module.css';

export type PregnancyStatus = { weeks: number | null; days: number | null };

export default function StatusBlock({ weeks, days }: PregnancyStatus) {
  return (
    <div className={css.statusBlockContainer}>
      <div className={css.statusBlockWrapper}>
        <h4 className={css.statusBlockText}>Тиждень</h4>
        <p className={css.statusBlockValue}>{weeks}</p>
      </div>
      <div className={css.statusBlockWrapper}>
        <h4 className={css.statusBlockText}>Днів до зустрічі</h4>
        <p className={css.statusBlockValue}>~{days}</p>
      </div>
    </div>
  );
}
