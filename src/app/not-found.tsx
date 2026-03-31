import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-teal-700 mb-4">404</p>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          ページが見つかりません
        </h1>
        <p className="text-stone-500 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
