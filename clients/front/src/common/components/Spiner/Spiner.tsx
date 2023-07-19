import styles from './Spiner.module.scss';

export const Spiner = (): JSX.Element => (
  <div className={styles.loader}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);
