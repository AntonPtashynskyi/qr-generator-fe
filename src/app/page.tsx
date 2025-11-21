import { BlockSwitcher } from '../components/BlockSwitcher';
import { LoginForm } from '../components/LoginForm';


export default async function Home() {
  return (
    <BlockSwitcher>
      <LoginForm title='Login'/>
      <LoginForm title='Registration'/>
    </BlockSwitcher>
  );
}

