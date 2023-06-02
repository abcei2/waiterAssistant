import Table from "../components/Table";
import tw from 'twrnc';
import { useDeviceContext } from 'twrnc';

export default function App() {
  useDeviceContext(tw); 
  return <Table />;
}
