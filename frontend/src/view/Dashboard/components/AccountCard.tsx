import { CategoryIcon } from "../../components/icons/categories/CategoryIcon";

export function AccountCard() {
  return (
    <div className="p-4 bg-white rounded-2xl">
      <div>
        <CategoryIcon type="income" />
        <span className="text-gray-800">Nubank</span>
      </div>
    </div>
  );
}
