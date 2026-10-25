import { categories } from "../data/siteData";

export default function Navigation({ category, onSelect }) {
  return (
    <div className="nav">
      {categories.map((c) => (
        <span
          key={c.id}
          className={"nav-item" + (category === c.id ? " active" : "")}
          onClick={() => onSelect(c.id)}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}
