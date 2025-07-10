const FilterBar = () => (
  <section className="flex w-full items-center gap-4">
    {['모델', '필터', '태그'].map((label) => (
      <button
        key={label}
        className="flex items-center gap-1"
      >
        {label}
      </button>
    ))}
    <button className="flex items-center gap-1">
      무료만 보기
    </button>
  </section>
);

export default FilterBar;