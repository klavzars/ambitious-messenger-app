// this is just for testing purposes, will be removed later

import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p>*Temporary Home*</p>
      <Link to="/protectedTest"> Go to Protected Test</Link>
    </div>
  );
}

export default Home;
