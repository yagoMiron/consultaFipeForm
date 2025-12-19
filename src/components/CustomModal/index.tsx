import Modal from "react-responsive-modal";
import styles from "./styles.module.css";
import close from "../../assets/close.svg";

type Props = {
  show: boolean;
  title: string;
  setShow: (value: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
  logo?: string;
};

const CustomModal = ({ show, title, setShow, children, logo }: Props) => {
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      center
      classNames={{
        modal: styles.customModal,
      }}
      closeIcon={<img className={styles.close} src={close} alt="fechar" />}
    >
      <div className={styles.container}>
        <img src={logo} className={styles.logo} />
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Modal>
  );
};
export default CustomModal;
