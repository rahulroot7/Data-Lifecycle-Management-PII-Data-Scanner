import {
  Link,
  useLocation,
} from "react-router-dom";

import {

  FaDatabase,

  FaSearch,

  FaChartBar,

} from "react-icons/fa";

const Sidebar = () => {

  const location =
    useLocation();

  const menus = [

    {
      name:
        "Dashboard",

      path:
        "/dashboard",

      icon:
        <FaChartBar />,
    },

    {
      name:
        "Datasources",

      path:
        "/datasources",

      icon:
        <FaDatabase />,
    },

    {
      name:
        "Findings",

      path:
        "/findings",

      icon:
        <FaSearch />,
    },
  ];

  return (

    <div
      className="w-64 bg-black text-white min-h-screen p-5"
    >

      <h1
        className="text-2xl font-bold mb-10"
      >

        DLP Platform

      </h1>

      <div
        className="space-y-3"
      >

        {
          menus.map(
            (menu) => (

              <Link
                key={menu.path}
                to={menu.path}
                className={`

                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-lg

                  ${
                    location.pathname ===
                    menu.path

                      ? "bg-white text-black"

                      : "hover:bg-gray-800"
                  }
                `}
              >

                {menu.icon}

                {menu.name}

              </Link>
            )
          )
        }

      </div>

    </div>
  );
};

export default Sidebar;