import { sum } from './math';
import styles from './moreCode.module.scss';

const MoreCode = () => {
  console.log("Hello! I'm more code block");
  console.log(sum(11, 16));
  return <div className={styles.moreCode}>this code for checking code splitting and lazy load</div>;
};

export default MoreCode;
