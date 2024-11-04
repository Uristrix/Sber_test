'use client'
import styles from "./page.module.css";
import { DonutChart } from '@/components/DonutChart/DonutChart';
import { SankeyDiagram } from '@/components/SankeyDiagram/SankeyDiagram';


export default function Home() {
  return (
    <div className={styles.page}>
      <DonutChart />
      <SankeyDiagram />
    </div>
  );
}
