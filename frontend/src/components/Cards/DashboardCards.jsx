import { useContext } from "react";
import { AppContext } from "../../utils/context/store";

const DashboardCards = () => {
  const DATE = new Date().toString().slice(0, 15);
  const USER_FIELDS = ["projects", "educations", "skills", "experiences"];
  const {
    theme: [theme],
    userData:[userData]
  } = useContext(AppContext);

  return (
    <>
      {
        userData &&
        USER_FIELDS.map(
          (keys) =>
            keys in userData && (
              <div
                key={keys}
                className={`w-full h-[140px] flex flex-col items-between justify-between p-5 m-3 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-fuchsia-800"
                    : "bg-gradient-to-r from-green-400 to-teal-600"
                } rounded-md shadow-md max-lg:flex-auto max-lg:w-[400px] `}
              >
                <div
                  className={`w-full h-full mb-6 flex flex-col  justify-start max-lg:mb-3`}
                >
                  <h1
                    className={`text-white font-NotoSansJP font-semibold text-md tracking-tight`}
                  >
                    {`Total ${keys}`.toUpperCase()}
                  </h1>
                  <span
                    className={`text-white font-NotoSansJP font-bold text-xs px-1`}
                  >
                    {DATE}
                  </span>
                </div>
                <div className={` w-full h-full px-4 border-t`}>
                  <h1
                    className={`text-transparent bg-clip-text 
        ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-300 to-fuchsia-800"
            : "bg-gradient-to-r from-green-200 to-teal-300"
        } 
        font-NotoSansJP font-bold text-2xl max-lg:mt-2`}
                  >
                    {userData[keys].length}
                  </h1>
                </div>
              </div>
            ),
        )
}
    </>
  );
};

export default DashboardCards;
