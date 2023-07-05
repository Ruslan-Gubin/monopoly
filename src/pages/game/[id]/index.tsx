import { useRouterNavigation } from '@/shared';
import { Layout } from '@/widgets';

const Game = () => {
  const { query } = useRouterNavigation()

  console.log(query)
  
  return (
  <Layout title="Игра" keywords="Game">
    Game
  </Layout>
  );
};

export default Game;