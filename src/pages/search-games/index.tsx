import { CreateGame } from '@/features';
import { Layout, SelectionGame } from '@/widgets';


const SearchGame = () => {

  
  return (
    <Layout title='Home' keywords='Home page'>
      <SelectionGame />
  
      {/* <CreateGame /> */}
    </Layout>
  );
};

export default SearchGame;