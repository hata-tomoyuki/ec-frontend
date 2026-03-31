import { mockCategories } from "@/data/mock";
import Button from "@/components/ui/Button";
import AdminCategoryTable from "@/components/admin/AdminCategoryTable";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">カテゴリ管理</h1>
        <Button href="/admin/categories/new">カテゴリを追加</Button>
      </div>
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
        <AdminCategoryTable categories={mockCategories} />
      </div>
    </div>
  );
}
