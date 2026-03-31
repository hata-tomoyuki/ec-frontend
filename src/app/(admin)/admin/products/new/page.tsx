import { mockCategories } from "@/data/mock";
import AdminProductForm from "@/components/admin/AdminProductForm";

export default function AdminProductNewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">商品を追加</h1>
      <AdminProductForm categories={mockCategories} />
    </div>
  );
}
