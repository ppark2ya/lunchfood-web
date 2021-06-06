import React from 'react'
import { insertAccount } from 'api/account';

function App() {

  React.useEffect(() => {
    async function test() {
      const { data } = await insertAccount({
        id: 123123131
      });
      console.log(data);
    }
    //test();
  }, []);
  
  return (
    <div className="App">
      vite-app
    </div>
  )
}

export default App
