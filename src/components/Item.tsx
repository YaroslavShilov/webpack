import styles from './item.module.scss';

type Props = {
  title: string;
  text?: string;
};

export const Item = ({ title, text }: Props) => {
  return (
    <div className={styles.item}>
      <h1>{title}</h1>
      <p>{text ? text : 'hello text'}</p>
    </div>
  );
};
