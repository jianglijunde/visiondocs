import React from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

export default function HomepageContent(): JSX.Element {
  return <div className={styles.wrapper}></div>;
}
