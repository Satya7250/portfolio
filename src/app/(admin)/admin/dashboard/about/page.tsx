import { getAbout } from "@/data/about";
import { AboutManager } from "@/components/admin/about/about";

export default async function AboutDashboardPage() {
  const about = await getAbout();

  return (
    <div className="p-6">
      <AboutManager about={about ?? null} />
    </div>
  );
}