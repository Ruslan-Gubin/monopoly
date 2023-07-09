import { ViewerApi } from '@/entities/viewer/api';
import { useRouterNavigation } from '@/shared';
import { Layout } from '@/widgets';
import { useEffect } from 'react';

const Game = () => {
  const { query } = useRouterNavigation()

  console.log(query)

  const getMyData = async() => {
  const response = await ViewerApi.getMy('645934439ffbf9592527d345')
  console.log(response)
  }

  useEffect(() => {
    getMyData()
  }, [])
  
  return (
  <Layout title="Игра" keywords="Game">
    Game
  </Layout>
  );
};

export default Game;