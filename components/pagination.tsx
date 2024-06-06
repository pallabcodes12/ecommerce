type PaginationProps = {
  total: number;
  skip: number;
  limit: number;
  itemsPerPage: number;
};

export default function Pagination({ total, itemsPerPage = 10 }: PaginationProps) {
  return <div>pagination</div>;
}
