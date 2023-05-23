import { Layout } from "@/widgets/Layout/ui/layout-main/Layout";
import { RulesGame } from "@/widgets";
import { rulesGame } from "@/app/constants/rulesGame";

export default function Home() {
  return (
    <Layout title="Home" keywords="Home page">
      <RulesGame rules={rulesGame} />
    </Layout>
  );
}
