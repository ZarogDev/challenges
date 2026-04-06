import type { Dispatch, SetStateAction } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>

      {/* Première page */}
      <button
        className={styles.pageBtn}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="Première page"
      >
        {"«"}
      </button>

      {/* Précédent */}
      <button
        className={styles.pageBtn}
        onClick={() => onPageChange((p) => p - 1)}
        disabled={currentPage === 1}
        title="Page précédente"
      >
        {"‹"}
      </button>

      {/* Page actuelle */}
      <span className={styles.pageInfo}>
        Page <strong>{currentPage}</strong> / {totalPages}
      </span>

      {/* Suivant */}
      <button
        className={styles.pageBtn}
        onClick={() => onPageChange((p) => p + 1)}
        disabled={currentPage === totalPages}
        title="Page suivante"
      >
        {"›"}
      </button>

      {/* Dernière page */}
      <button
        className={styles.pageBtn}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Dernière page"
      >
        {"»"}
      </button>

    </div>
  );
}