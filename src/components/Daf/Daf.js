import styles from "./Daf.module.css";

export default function Daf(props) {
  return (
    <>
      <div className={styles.siman}>
        <div className={styles.title}>
          <h3>Siman: {props.object.siman.title}</h3>
          <h4>Daf: {props.object.daf}</h4>
        </div>
        <p>{props.object.siman.paragraph}</p>
      </div>

      {props.object.data.map((dataPoint) => (
        <div className={styles.dataPoint}>
          <h3>{dataPoint.title}</h3>
          <p>{dataPoint.paragraph}</p>
        </div>
      ))}
      <hr />
    </>
  );
}
