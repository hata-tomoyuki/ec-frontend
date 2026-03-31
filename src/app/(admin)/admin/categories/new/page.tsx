import AdminCategoryForm from "@/components/admin/AdminCategoryForm";

export default function AdminCategoryNewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">カテゴリを追加</h1>
      <AdminCategoryForm />
    </div>
  );
}
