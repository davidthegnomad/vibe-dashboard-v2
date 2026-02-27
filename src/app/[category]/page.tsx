import DashboardUI from "@/components/DashboardUI";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    return <DashboardUI currentCategory={category} />;
}
