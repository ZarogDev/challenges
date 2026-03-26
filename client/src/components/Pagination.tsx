import type { Dispatch, SetStateAction } from "react";

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
    <div>
      {/* Première page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>

      {/* Précédent */}
      <button
        onClick={() => onPageChange((p) => p - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Page actuelle */}
      <span style={{ fontWeight: "bold", minWidth: "80px", textAlign: "center" }}>
        Page {currentPage} / {totalPages}
      </span>

      {/* Suivant */}
      <button
        onClick={() => onPageChange((p) => p + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>

      {/* Dernière page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
};