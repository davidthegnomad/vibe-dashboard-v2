import DashboardUI from "@/components/DashboardUI";
import { CATEGORIES } from "@/data/categories";

export async function generateStaticParams() {
    return CATEGORIES.map((cat) => ({ category: cat.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return <DashboardUI currentCategory={category} />;
}
