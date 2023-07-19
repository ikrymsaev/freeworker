import styles from './Loader.module.scss';
import cn from 'classnames';
import { Spiner } from '../Spiner/Spiner';

interface IProps {
  withOverlay?: boolean;
}
export const Loader = (props: IProps): JSX.Element => {
  const { withOverlay } = props;

  return (
    <div className={cn(styles.container, { [styles.overlay]: withOverlay })}>
      <Spiner />
    </div>
  );
};
