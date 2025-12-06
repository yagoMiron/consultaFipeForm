import Modal from "react-responsive-modal";
import styles from "./styles.module.css";

type Props = {
  show: boolean;
  title: string;
  setShow: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
};

const CustomModal = ({ show, title, setShow, children }: Props) => {
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      center
      classNames={{
        modal: styles.customModal,
      }}
    >
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Modal>
  );
};
export default CustomModal;
