import { Outlet } from "react-router-dom";
import signInImage from "../assets/sign-in-image.png";

const PublicRoutes = () => {
  return (
    <div className="flex w-full justify-center mt-5 md:mt-10">
      <div className="flex md:w-2/3 mx-4 md:mx-0 flex-col justify-center p-5  shadow rounded-md bg-primary">
        <div className="flex justify-center items-center mb-5"></div>
        <div className="w-full">
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <Outlet />
            </div>
            <img src={signInImage} className="w-1/2 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRoutes;
